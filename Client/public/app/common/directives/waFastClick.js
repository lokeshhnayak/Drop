/**
 *
 * Description: Directive utilizes FastClick library.
 *
 *
 * FastClick is a simple, easy-to-use library for eliminating the
 * 300ms delay between a physical tap and the firing of a click event on mobile browsers.
 * FastClick doesn't attach any listeners on desktop browsers.
 * @link: https://github.com/ftlabs/fastclick
 *
 * On mobile devices 'needsclick' class is attached to <element>
 *
 */

define([
	'common/module', 
	'require', 
	'fastclick'
], function (module, require) {

	'use strict';

	module.registerDirective('waFastClick', function () {
		var FastClick = require('fastclick');
		return {
			restrict: 'A',
			compile: function (element, attrs) {
				element.removeAttr('wa-fast-click data-wa-fast-click');

				FastClick.attach(element);

				if(!FastClick.notNeeded())
					element.addClass('needsclick')
			}
		};
	});
});
