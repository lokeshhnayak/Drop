define([
	'common/module',         // Angular Module for WebArtists VTSS app.
	'common/utils/supplant', // Supplant
	'common/utils/Utils',    // Utils Library
	'lodash'                 // Lodash Library
],
function(module, supplant) {

	'use strict';

	module.registerService('Notifications', [
		'_',
		'Logger',
		function (_, Logger) {
			var logger = Logger.getInstance('Notifications');
			logger.info("In Notifications");

			var success = function(notificationData) {
				$.bigBox({
					title: notificationData.title || "Success",
					content: notificationData.content,
					color: "#739E73",
					icon: notificationData.icon || "fa fa-thumbs-o-up rotateIn animated",
					timeout: notificationData.timeout || 6000
				});
			};

			var info = function(notificationData) {
				$.bigBox({
					title: notificationData.title || "Info",
					content: notificationData.content,
					color: "#3276B1",
					icon: notificationData.icon || "fa fa-info rotateIn animated",
					timeout: notificationData.timeout || 6000
				});
			};

			var warn = function(notificationData) {
				$.bigBox({
					title: notificationData.title || "Warning",
					content: notificationData.content,
					color: "#C79121",
					icon: notificationData.icon || "fa fa-warning rotateIn animated",
					timeout: notificationData.timeout || 6000
				});
			};

			var error = function(notificationData) {
				$.bigBox({
					title: notificationData.title || "Error!",
					content: notificationData.content,
					color: "#C46A69",
					icon: notificationData.icon || "fa fa-close rotateIn animated",
					timeout: notificationData.timeout || 6000
				});
			};

			return {
				success : success,
				info : info,
				warn : warn,
				error : error
			};
		}
	]);
});