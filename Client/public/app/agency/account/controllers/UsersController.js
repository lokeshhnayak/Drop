define([
	'agency/account/module',        // Angular Module for WebArtists VTSS app.
	'common/utils/supplant',      // Supplant
	'common/utils/Utils',         // Utils Library
	'common/utils/Notifications', // Notifications
	'lodash'                      // Lodash Library
],
function(module, supplant) {

	'use strict';

	module.registerController('UsersController', [
		'$scope',
		'$state',
		'$timeout',
		'_',
		'Logger',
		'Notifications',
		'UsersService',
		'ModalService',
		'AgencyModalService',
		'TableDefaults',
		function ($scope, $state, $timeout, _, Logger, Notifications, UsersService, ModalService, AgencyModalService, TableDefaults) {
			var logger = Logger.getInstance('UsersController');
			logger.info("In UsersController");

			/*Scope Variables*/

			$scope.users = {
				dtOptions: TableDefaults.getUsersTableDefaults()
			};

			$scope.loading = true;

			$scope.selectables = {
				usersList: []
			};

			$scope.onUsersSelectionChanged = function (selection) {
				$scope.selectables.usersList = selection;
				$timeout(function() {
					$scope.$apply();
				}, 0);
			};

			$scope.deleteSelectedUsers = function(){
			};

			$scope.getUsers = function(){
				UsersService.getUsers()
					.then(function(users) {
						$scope.users.data = users;
						$timeout(function() {
							$scope.loading = false;
							// TableTools flash buttons fix. Sometimes, depending on when the data is bound to datatables,
							// the tableTools instance buttons need to be redrawn for the flash object to take notice.
							$timeout(function() {
								var dataTables = TableTools.fnGetMasters(), instances = dataTables.length;
								while(instances--) {
									var dataTable = dataTables[instances];
									if(dataTable.fnResizeRequired()) {
										dataTable.fnResizeButtons();
									}
								}
							}, 1);
						}, 100);
					});
			};

			$scope.addUser = function(row){
				var modalOptions = {
					closeButtonText: "Cancel",
					closeButtonIcon: "fa-ban",
					actionButtonText: "Create",
					actionButtonCss: "btn-success",
					actionButtonIcon: "fa-check",
					headerText: "Add User",
					formIcon: "fa-plus",
					user: {}
				};
				AgencyModalService.saveUser({}, modalOptions)
					.then(function (user) {
						UsersService.createUser(user)
							.then(function(updatedUsers) {
								$scope.users.data = updatedUsers;
								Notifications.success({
									title: "Success",
									content: supplant("User - {0} added successfully", [user.firstName])
								});
							});
					});
			};

			$scope.editUser = function (user) {
				var modalOptions = {
					closeButtonText: "Cancel",
					closeButtonIcon: "fa-ban",
					actionButtonText: "Update",
					actionButtonCss: "btn-success",
					actionButtonIcon: "fa-edit",
					headerText: "Edit User",
					formIcon: "fa-edit",
					user: UsersService.copyUser(user)
				};

				AgencyModalService.saveUser({}, modalOptions)
					.then(function (editedUser) {
						var index = $scope.users.data.map(function(d) {return d.id;}).indexOf(editedUser.id);
						$scope.users.data[index]= editedUser;
						UsersService.updateUser(editedUser)
							.then(function(updatedUser) {
								Notifications.success({
									title: "Success",
									content: supplant("User - {0} updated successfully", [editedUser.firstName])
								});
							});
					});
			};

			$scope.deleteUser = function (user) {
				var modalOptions = {
					closeButtonText: "Cancel",
					closeButtonIcon: "fa-ban",
					actionButtonText: "Delete User",
					actionButtonCss: "btn-danger",
					actionButtonIcon: "fa-trash-o",
					headerText: supplant("Delete User - {0}", [user.firstName]),
					bodyText: "Are you sure you want to delete this user " + user.firstName +" ?",
					formIcon: "fa-trash-o"
				};

				ModalService.showModal({}, modalOptions)
					.then(function (result) {
						UsersService.deleteUser(user)
							.then(function(deletedUser) {
								var index = $scope.Users.data.map(function (d) { return d.id; }).indexOf(user.id);
								var deletedUser = $scope.Users.data.splice(index, 1);
								Notifications.success({
									title: "Success",
									content: supplant("User - {0} deleted successfully", [user.firstName])
								});
							});
					});
			};

			$scope.getUsers();
		}
	]);
});