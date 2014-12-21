/**
 * DETECT MOBILE DEVICES
 * Description: Detects mobile device - if any of the listed device is
 *
 * detected class is inserted to <element>.
 *
 *  we'll have to test this for different devices
 */


define([
	'common/module'
], function (module) {

	'use strict';

	module.registerDirective('waDeviceDetect', function () {
		return {
			restrict: 'A',
			compile: function (element, attrs) {
				element.removeAttr('wa-device-detect data-wa-device-detect');

				var isMobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
				
				element.toggleClass('desktop-detected', !isMobile);
				element.toggleClass('mobile-detected', isMobile);
			}
		};
	});
});
