define([
	'common/module',
	'jquery-ui'
], function (module) {
	"use strict";

	return module.registerDirective('waDatepicker', function () {
		return {
			restrict: 'A',
			compile: function (element, attrs) {
				element.removeAttr('waDatepicker');

				var onSelectCallbacks = [];
				if (attrs.minRestrict) {
					onSelectCallbacks.push(function (selectedDate) {
						$(attrs.minRestrict).datepicker('option', 'minDate', selectedDate);
					});
				}
				if (attrs.maxRestrict) {
					onSelectCallbacks.push(function (selectedDate) {
						$(attrs.maxRestrict).datepicker('option', 'maxDate', selectedDate);
					});
				}

				var options = {
					prevText: '<i class="fa fa-chevron-left"></i>',
					nextText: '<i class="fa fa-chevron-right"></i>',
					onSelect: function (selectedDate) {
						angular.forEach(onSelectCallbacks, function (callback) {
							callback.call(this, selectedDate)
						})
					}
				};


				if (attrs.numberOfMonths) options.numberOfMonths = parseInt(attrs.numberOfMonths);

				if (attrs.dateFormat) options.dateFormat = attrs.dateFormat;

				if (attrs.defaultDate) options.defaultDate = attrs.defaultDate;

				if (attrs.changeMonth) options.changeMonth = attrs.changeMonth == "true";


				element.datepicker(options)
			}
		}
	})
});