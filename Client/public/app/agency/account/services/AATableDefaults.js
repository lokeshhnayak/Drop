define([
	'agency/account/module',   // Angular Module for WebArtists VTSS app.
	'common/utils/supplant', // Supplant
	'common/utils/Utils',    // Utils Library
	'lodash',                // Lodash Library
	'moment'
],
function(module, supplant) {

	'use strict';

	module.registerService('AATableDefaults', [
		'_',
		'Logger',
		function (_, Logger) {
			var logger = Logger.getInstance('AATableDefaults');
			logger.info("In AATableDefaults");

			/** Users Datatable Options - BEGIN */

			var getUsersDTOptions = function () {
				return {
					"sDom": "L<'dt-toolbar'<'col-xs-12 col-sm-6'l><'col-sm-6 hidden-xs'TC>r>" +
						"t" +
						"<'dt-toolbar-footer'<'col-xs-6'i><'col-xs-6'p>>",
					//"sDom": "LTC<'clear'>R<'dt-toolbar'lr>" + "t" + "<'dt-toolbar-footer'<'col-xs-6'i><'col-xs-6'p>>",
					"oTableTools": {
						"aButtons": ["copy", {
							"sExtends": "print",
							"sMessage": "Print Users Report <i>(press Esc to close)</i>"
						}, "csv", "xls", "pdf"],
						"sSwfPath": "plugin/datatables-tabletools/swf/copy_csv_xls_pdf.swf"
					},
					"colVis": {
						activate: "mouseover",
						aiExclude: [0, 9]
					},
					"aaSorting": [[1, "asc"]],
					drawCallback: function (oSettings) {
						if ($.fn.DataTable.ColVis) {
							$('.ColVis_MasterButton').addClass('btn btn-default');
							$('.ColVis_Button').removeClass('ColVis_Button');
						}
						$('.DTTT_container a').removeClass('DTTT_button').addClass("btn btn-default");
						$('.DTTT_container').removeClass('DTTT_container').addClass('DTTT btn-group');
						$('.dt-toolbar input, select').addClass('form-control input-sm');
					}
				};
			};

			var getUsersColumns = function () {
				return [{
					"bSortable": false,
					"mDataProp": null,
					"sDefaultContent": '',
					"aTargets": [0],
					'sWidth': '15px'
				},
				{
					"mDataProp": 'firstName',
					"aTargets": [1],
				},
				{
					"mDataProp": 'lastName',
					"aTargets": [2],
				},
				{
					"mDataProp": 'about',
					"aTargets": [3],
					"bVisible": false
				},
				{
					"mDataProp": 'email',
					"aTargets": [4],
				},
				{
					"mDataProp": 'phoneNumber',
					"aTargets": [5],
				},
				{
					"mDataProp": 'username',
					"aTargets": [6],
				},
				{
					"mDataProp": 'address',
					"aTargets": [7],
				},
				{
					"mDataProp": 'roles',
					"aTargets": [8],
				},
				{
					"mDataProp": null,
					"aTargets": [9],
					"sWidth": "80px",
					"className": "text-center",
					"sDefaultContent": '<div class="btn-group btn-group-sm">' +
						'<button type="button" data-toggle="tooltip" title="Edit User Details" class="btn btn-default btn-sm btn-icon" data-container="td" id="edit-vehicle"><i class="fa fa-edit fa-lg txt-color-green"></i></button>' +
						'<button type="button" data-toggle="tooltip" title="Delete User" class="btn btn-default btn-sm btn-icon" data-container="td" id="delete-vehicle"><i class="fa fa-trash-o fa-lg txt-color-red"></i></button>' +
						'</div>',
					"fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
						$(".btn-icon", nTd).tooltip();
					}
				}];
			};

			var getUsersFilters = function() {
				return [null,
				{
					type: "text"
				},
				{
					type: "text"
				},
				{
					type: "text"
				},
				{
					type: "text"
				},
				{
					type: "text"
				},
				{
					type: "text"
				},
				{
					type: "text"
				},
				{
					type: "text"
				},
				null];
			};

			var getUsersCustomActions = function() {
				return [{
					actionControlId: "#edit-user",
					actionHandler: "editUser(row)"
				}, {
					actionControlId: "#delete-user",
					actionHandler: "deleteUser(row)"
				}];
			};

			var getUsersSelectableOptions = function() {
				return {
					bShowControls: true,
					bSelectAllCheckbox: true,
					sSelectionTrigger: "cell",
					sSelectedRowClass: "success"
				};
			};

			var getUsersTableDefaults = function() {
				return {
					dtOptions : getUsersDTOptions(),
					dtColumns : getUsersColumns(),
					dtColumnFilters : getUsersFilters(),
					dtCustomActions : getUsersCustomActions(),
					dtSelectableOptions : getUsersSelectableOptions()
				};
			};

			/** Users Datatable Options - END */

			return {
				getUsersTableDefaults : getUsersTableDefaults,
			};
		}
	]);
});