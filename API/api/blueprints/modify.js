/**
 * Module dependencies
 */
var util = require('util');
var actionUtil = require('../../node_modules/sails/lib/hooks/blueprints/actionUtil');
var _ = require('lodash');
var async = require('async');
var Promise = require('bluebird');


/**
 * Update Record In Collection
 *
 * put  /:modelIdentity/:id/:collectionAttr/:childid
 *  *    /:modelIdentity/:id/:collectionAttr/update/:childid
 *
 *
 * @param {Integer|String} parentid  - the unique id of the parent record
 *
 * @option {String} model  - the identity of the model
 * @option {String} alias  - the name of the association attribute (aka "alias")
 */

module.exports = function updateChildInCollection (req, res) {

	// Ensure a model and alias can be deduced from the request.
	var Model = actionUtil.parseModel(req);

	var relation = req.options.alias;
	if (!relation) {
		return res.serverError(new Error('Missing required route option, `req.options.alias`.'));
	}

	// The primary key of the parent record
	var parentPk = req.param('parentid');
	var pk = req.param('id');
	// Get the model class of the child in order to figure out the name of
	// the primary key attribute.
	var associationAttr = _.findWhere(Model.associations, { alias: relation });
	var ChildModel = sails.models[associationAttr.collection];
	var childPkAttr = ChildModel.primaryKey;

	// Retrieve Child Values
	var child = actionUtil.parseValues(req);

	if (!child) {
		res.badRequest('You must specify the record to add (either the primary key of an existing record to link, or a new object without a primary key which will be used to create a record then link it.)');
	}

	// Omit the path parameter 'id' from child
	delete child.id;

	async.auto({
		parentRecord: function (cb) {
			Model.findOne(parentPk).exec(function foundParent(err, parentRecord) {
				if (err) return cb(err);
				if (!parentRecord) return cb({status: 404});
				if (!parentRecord[relation]) return cb({status: 404});
				cb(null, parentRecord);
			});
		},
		matchingRecord: function (cb) {
			ChildModel.findOne(pk).populateAll().exec(function foundMathingRecord(err, matchingRecord) {
				if (err) return cb(err);
				if (!matchingRecord) return cb({status: 404});
				cb(null, matchingRecord);
			});
		},
	},
	function readyToSave(err, async_data) {
		var parentRecord = async_data.parentRecord;
		var matchingRecord = async_data.matchingRecord;

		ChildModel.update(pk, child).exec(function updated(err, records) {

			// Differentiate between waterline-originated validation errors
			// and serious underlying issues. Respond with badRequest if a
			// validation error is encountered, w/ validation info.
			if (err) return res.negotiate(err);


			// Because this should only update a single record and update
			// returns an array, just use the first item.  If more than one
			// record was returned, something is amiss.
			if (!records || !records.length || records.length > 1) {
				req._sails.log.warn(
				util.format('Unexpected output from `%s.update`.', ChildModel.globalId)
				);
			}

			var updatedRecord = records[0];

			// If we have the pubsub hook, use the ChildModel's publish method
			// to notify all subscribers about the update.
			if (req._sails.hooks.pubsub) {
				if (req.isSocket) { ChildModel.subscribe(req, records); }
				ChildModel.publishUpdate(pk, _.cloneDeep(child), !req.options.mirror && req, {
					previous: matchingRecord.toJSON()
				});
			}

			// Do a final query to populate the associations of the record.
			//
			// (Note: again, this extra query could be eliminated, but it is
			//  included by default to provide a better interface for integrating
			//  front-end developers.)
			var Q = ChildModel.findOne(updatedRecord[ChildModel.primaryKey]);
			Q = actionUtil.populateEach(Q, req);
			Q.exec(function foundAgain(err, populatedRecord) {
				if (err) return res.serverError(err);
				if (!populatedRecord) return res.serverError('Could not find record after updating!');
				res.ok(populatedRecord);
			}); // </foundAgain>
		});// </updated>
	});
};
