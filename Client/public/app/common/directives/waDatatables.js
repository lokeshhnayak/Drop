/**
 * Web Artists Data Tables Directive
 */
define([
	// Utilities
	'common/module',        // Commons Module.
	'common/utils/supplant',// Supplant Helper from Crockford.
	'jquery',               // jQuery
	'lodash',               // Lodash plugin for data manipulation
	'bootstrap',            // Bootstrap
	'datatables',           // jQuery Datatables
	'datatables-tabletools',// Datatables Tabletools plugin
	'datatables-colvis',    // Datatables Col Visibility plugin
	'datatables-bootstrap', // Datatables bootstrap styles
	'datatables-colfilter', // Datatables column filter plugin
	'datatables-selectable' // Datatables Selectables plugin
],
function(module, supplant) {

	'use strict';

	module.registerDirective('waDatatables', [
		'$timeout',
		'$parse',
		'_',
		function($timeout, $parse, _) {

			var linker = function(scope, element, attrs) {

				// apply DataTable options, use defaults if none specified.
				var options = {};
				if (attrs.waDatatables.length > 0) {
					options = scope.$eval(attrs.waDatatables);
				} else {
					options = {
						"bStateSave": true,
						"bPaginate": false,
						"bLengthChange": false,
						"bFilter": false,
						"bInfo": false,
						"bRetrieve": true,
						"sDom": "TC<'clear'>R<'dt-toolbar'<'col-xs-6'l><'col-xs-6'f<'toolbar'>>r>" + "t" + "<'dt-toolbar-footer'<'col-xs-6'i><'col-xs-6'p>>",
						"oTableTools": {
							"aButtons": ["copy", {
								"sExtends": "print",
								"sMessage": "Ended Live Events <i>(press Esc to close)</i>"
							}, {
								"sExtends": "collection",
								"sButtonText": "Export",
								"aButtons": ["csv", "xls", "pdf"]
							}],
							"sSwfPath": "/reports/vendor/dataTables/copy_csv_xls_pdf.swf"
						}

					};
				}

				// Tell the dataTables plugin what columns to use
				// We can either derive them from the dom, or use setup from the controller           
				var explicitColumns = [];
				// Reverting to jQuery here since element.find in angular is only limited to tag ids.
				$(element).find('thead>tr[0]>th').each(function(index, elem) {
					explicitColumns.push($(elem).text());
				});
				if (explicitColumns.length > 0) {
					options["aoColumns"] = explicitColumns;
				} else if (attrs.aoColumns) {
					options["aoColumns"] = scope.$eval(attrs.aoColumns);
				}

				// aoColumnDefs is dataTables way of providing fine control over column config
				if (attrs.aoColumnDefs) {
					options["aoColumnDefs"] = scope.$eval(attrs.aoColumnDefs);
				}

				// added here to modify styles for table tools & colVis plugins
				if (attrs.fnRowCallback) {
					options["fnRowCallback"] = scope.$eval(attrs.fnRowCallback);
				}

				if (attrs.selectableOptions) {
					var selectionChangedHandler = $parse(attrs.onSelectionChanged);
					options["oSelectable"] = scope.$eval(attrs.selectableOptions);
					options["oSelectable"]["fnSelectionChanged"] = function(selection) {
						selectionChangedHandler(scope, {selection: selection._aoData});
					};
				}

				// apply the plugin
				var dataTable = $(element).dataTable(options);

				// check if column filters are defined.
				if (attrs.colFilterAoColumns) {
					dataTable.columnFilter({
						aoColumns: scope.$eval(attrs.colFilterAoColumns),
						sPlaceHolder: "head:before"
					});
				}

				if(attrs.childTableOptions) {
					var formatChildTable = function(aData) {
						var childColumns = scope.$eval(attrs.childTableOptions);
						var childTableColumns = '';
						angular.forEach(childColumns, function(eachColumn) {
							childTableColumns += supplant('<tr><td class="heading">{0}</td><td>{1}</td></tr>', [eachColumn.heading, aData[eachColumn.field]]);
						});
						var childTableHtml = supplant('<div class="child-table"><table class="table table-condensed table-bordered">{0}</table></div>', [childTableColumns]);
						return childTableHtml;
					};

					$(element).find('tbody').on('click', 'td.control', function() {
						var tr = this.parentNode;
						if(!dataTable.fnIsOpen(tr) && ($(tr).find('td.control>div').length)){
							var aData = dataTable.fnGetData(tr);
							var details = dataTable.fnOpen(tr, formatChildTable(aData), 'child-details');
							$('div.childTable', details).slideDown();
							$(tr).find('td.control>div>i').removeClass('fa-plus').addClass('fa-minus');
						} else {
							dataTable.fnClose(tr)
							$(tr).find('td.control>div>i').removeClass('fa-minus').addClass('fa-plus');
						}
					});
				}

				/* Get row data based on the id and custom action specified in controller*/
				if (attrs.customActions) {
					var ActionList = scope.$eval(attrs.customActions);
					_.each(ActionList, function (obj) {
						$(element).find('tbody').on('click', 'td ' + obj.actionControlId, function () {
							var parent = $(this).closest("tr")[0];
							var rowData = dataTable.fnGetData(parent);
							var rowHandler = $parse(obj.actionHandler);
							rowHandler(scope, { row: rowData });
						});
					});
					
				}

				// watch for any changes to our data, rebuild the DataTable
				scope.$watch(attrs.aaData, function(value) {
					var val = value || null;
					if (val) {
						dataTable.fnClearTable();
						dataTable.fnAddData(scope.$eval(attrs.aaData));
						clearSelection();
					}
				}, true);

				// Event to clear selection.
				scope.$on("clearSelection", function() {
					clearSelection();
				});

				function clearSelection() {
					if(attrs.selectableOptions) {
						var selection = dataTable.fnGetSelection();
						if(selection) {
							selection.fnClear();
						}
					}
				}
			};

			return {
				// For now, it can be used as an attribute.
				restrict: 'A',
				link: linker
			};
		}
	]);
});
