define([
	'common/module'
], function(module){

	"use strict";

	return module.registerDirective('waInclude', function () {
			return {
				replace: true,
				restrict: 'A',
				templateUrl: function (element, attrs) {
					return attrs.waInclude;
				},
				compile: function(element){
					element[0].className = element[0].className.replace(/placeholder[^\s]+/g, '');
				}
			};
		}
	);

});
