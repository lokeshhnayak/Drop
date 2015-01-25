/**
* ConfigLookup.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	schema: true,

	autoCreatedAt: false,
	autoUpdatedAt: false,

	seedData: require('./seed/configlookup.json'),

	attributes: {
		name: {
			type: 'string',
			required: true
		},
		value: {
			type: 'string',
			required: true
		},
		lookupType: {
			type: 'string',
			defaultsTo: 'Dropdown'
		},
		valueType: {
			type: 'string',
			required: true
		}
	}
};

