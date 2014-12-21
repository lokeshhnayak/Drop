define([
	'common/module'
], function (module) {

	'use strict';

	module.registerDirective('hrefVoid', function () {
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				element.attr('href','#');
				element.on('click', function(e){
					e.preventDefault();
					e.stopPropagation();
				})
			}
		};
	});
});
