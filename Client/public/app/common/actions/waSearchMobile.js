define([
	'common/module'
], function (module) {

	'use strict';

	module.registerDirective('waSearchMobile', function () {
		return {
			restrict: 'A',
			compile: function (element, attrs) {
				element.removeAttr('wa-search-mobile data-wa-search-mobile');

				element.on('click', function (e) {
					$('body').addClass('search-mobile');
					e.preventDefault();
				});

				$('#cancel-search-js').on('click', function (e) {
					$('body').removeClass('search-mobile');
					e.preventDefault();
				});
			}
		}
	});
});
