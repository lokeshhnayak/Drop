define([
	'auth/module'
], function (module) {

	'use strict';

    return module.registerFactory('User', [
		'$http',
		'$q',
		function ($http, $q) {
			var dfd = $q.defer();

			var UserModel = {
				initialized: dfd.promise,
				username: undefined,
				picture: undefined,
				getShortcuts: function(role) {
					var that = this;
					$http.get('api/userShortcuts.json').then(function(shortcuts) {
						that.shortcuts = shortcuts.data[role];
					});
				}
			};
			
			$http.get('api/user.json').then(function(response){
				UserModel.username = response.data.username;
				UserModel.picture= response.data.picture;
				UserModel.role = response.data.role;
				$http.get('api/userShortcuts.json').then(function(shortcuts) {
					UserModel.shortcuts = shortcuts.data[response.data.role];
					dfd.resolve(UserModel);
				});
			});

			return UserModel;
		}
	]);

});
