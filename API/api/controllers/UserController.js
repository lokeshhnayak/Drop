/**
 * UserController.js
 *
 * @module      :: Controller
 * @description :: Provides the base user
 *                 actions used to make waterlock work.
 *
 * @docs        :: http://waterlock.ninja/documentation
 */

module.exports = require('waterlock').actions.user({
	/* e.g.
		action: function(req, res){
		}
	*/
	// route to create user, user auth and associate them
	create: function(req, res) {
		//console.log("customsied!!!!!!");
		var params = req.params.all(),
			auth = {
				username: params.username,
				password: params.password
			},
			userObj = {
				username:params.username,
				firstName:params.firstName,
				lastName:params.lastName,
				email:params.email,
				entityType:params.entityType
			};

		Role.findOneByName(params.role, function(err, role) {
			if (err) {
				waterlock.logger.debug(err);
				return res.send({success:false, message:err});
			}
			if (!role) {
				var errMsg = "Role not found";
				waterlock.logger.debug(errMsg);
				return res.send({success:false, message:errMsg});
			}

			User.create(userObj)
				.exec(function (err, user){
					if (err) {
						waterlock.logger.debug(err);
						req.session.flash = {
							err: err
						};

						return res.send({success:false, message:err});
					}
					req.session.user = user;
					req.session.authenticated = true;
					waterlock.engine.attachAuthToUser(auth, user, function (err) {
						if (err) {
							user.destroy();
							waterlock.logger.debug(err);
							return res.send({success:false, message:err});
						}

						//user.online = true;
						user.roles.add(role.id);
						user.save(function (err, user) {
							if (err) {
								auth.destroy();
								user.destroy();
								waterlock.logger.debug(err);
								return res.send({success:false, message:err});
							}

							user.action = "signed-up and logged-in.";
							User.publishCreate(user);

							waterlock.logger.debug('user login success');
							return res.send({success:true});
						});
					});
				}
			);
		});
	},
	 // route to [post] user id to delete user record from user/auth collections
	destroy: function(req, res, next) {
		var params = req.params.all();
		User.unsubscribe(req.socket, params.id);
		User.findOneById(params.id).exec(function(err, usr) {
			if(err) {
				waterlock.logger.debug(err);
				return res.send({success:false, message:err});
			}
			if(!usr) {
				waterlock.logger.debug('User doesn\'t exist.');
				return res.send({success:false, message:'User doesn\'t exist.'});
			}

			User.destroy({id: usr.id}).exec(function(err, record) {
				if(err) {
					waterlock.logger.debug(err);
					return res.redirect('/user');
				}
				var auth = record.map(function(rId){ return rId.id;});
				Auth.destroy({user: auth}).exec(function(err){
					if(err) {
						waterlock.logger.debug(err);
						return res.send({success:false, message:err});
					}

					User.publishUpdate(usr.id, {
						id: usr.id,
						name: usr.name,
						action: ' has been destroyed.'
					});

					User.publishDestroy(usr.id);
					res.send({success: true});
				});
			});
		});
	}
});