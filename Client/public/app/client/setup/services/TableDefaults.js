define([
	'client/setup/module',   // Angular Module for WebArtists VTSS app.
	'common/utils/supplant', // Supplant
	'common/utils/Utils',    // Utils Library
	'lodash',                // Lodash Library
	'moment'
],
function(module, supplant) {

	'use strict';

	module.registerService('TableDefaults', [
		'_',
		'Logger',
		function (_, Logger) {
			var logger = Logger.getInstance('TableDefaults');
			logger.info("In TableDefaults");

			/** Vehicles Datatable Options - BEGIN */
			var getVehiclesDTOptions = function () {
				return {
					"sDom": "L<'dt-toolbar'<'col-xs-12 col-sm-6'l><'col-sm-6 hidden-xs'TC>r>" +
						"t" +
						"<'dt-toolbar-footer'<'col-xs-6'i><'col-xs-6'p>>",
					//"sDom": "LTC<'clear'>R<'dt-toolbar'lr>" + "t" + "<'dt-toolbar-footer'<'col-xs-6'i><'col-xs-6'p>>",
					"oTableTools": {
						"aButtons": ["copy", {
							"sExtends": "print",
							"sMessage": "Print Vehicles Report <i>(press Esc to close)</i>"
						}, "csv", "xls", "pdf"],
						"sSwfPath": "plugin/datatables-tabletools/swf/copy_csv_xls_pdf.swf"
					},
					"colVis": {
						activate: "mouseover",
						aiExclude: [0]
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

			var getVehiclesColumns = function () {
				return [{
					"bSortable": false,
					"mDataProp": null,
					"sDefaultContent": '',
					"aTargets": [0],
					'sWidth': '15px'
				},
				{
					"mDataProp": 'registrationNumber',
					"aTargets": [1]
				},
				{
					"mDataProp": 'description',
					"aTargets": [2],
				},
				{
					"mDataProp": 'type',
					"aTargets": [3],
					"sDefaultContent": '<label for="" class="badge alert-warning">Car</label>',
					"fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
						if (oData.vehicleType === "Car") {
							$(nTd)[0].innerHTML = '<div><label for="" class="badge alert-success">Car</label></div>';
						} else if(oData.vehicleType === "Bus") {
							$(nTd)[0].innerHTML = '<div><label for="" class="badge alert-warning">Bus</label></div>';
						} else if(oData.vehicleType === "Van") {
							$(nTd)[0].innerHTML = '<div><label for="" class="badge alert-info">Van</label></div>';
						} else {
							$(nTd)[0].innerHTML = '<div><label for="" class="badge alert-danger">Unknown</label></div>';
						}
					}
				},
				{
					"mDataProp": 'passengerCapacity',
					"aTargets": [4],
				},
				{
					"mDataProp": null,
					"aTargets": [5],
					"sWidth": "70px",
					"sDefaultContent": '<div class="btn-group btn-group-sm">' + 
						'<button type="button" data-toggle="tooltip" title="Edit Vehicle Details" class="btn btn-default btn-sm btn-icon" data-container="td" id="edit-vehicle"><i class="fa fa-edit fa-lg txt-color-green"></i></button>' +
						'<button type="button" data-toggle="tooltip" title="Delete Vehicle" class="btn btn-default btn-sm btn-icon" data-container="td" id="delete-vehicle"><i class="fa fa-trash-o fa-lg txt-color-red"></i></button>' +
						'</div>',
					"fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
						$(".btn-icon", nTd).tooltip();
					}
				}];
			};

			var getVehiclesFilters = function() {
				return [null,
				{
					type: "text"
				},
				{
					type: "text"
				},
				{
					type: "select",
					values: ['Car', 'Bus', 'Van']
				},
				{
					type: "text"
				},
				null];
			};

			var getVehiclesCustomActions = function() {
				return [{
					actionControlId: "#edit-vehicle",
					actionHandler: "editVehicle(row)"
				}, {
					actionControlId: "#delete-vehicle",
					actionHandler: "deleteVehicle(row)"
				}];
			};

			var getVehiclesSelectableOptions = function() {
				return {
					bShowControls: true,
					bSelectAllCheckbox: true,
					sSelectionTrigger: "cell",
					sSelectedRowClass: "success"
				};
			};

			var getVehiclesTableDefaults = function() {
				return {
					dtOptions : getVehiclesDTOptions(),
					dtColumns : getVehiclesColumns(),
					dtColumnFilters : getVehiclesFilters(),
					dtCustomActions : getVehiclesCustomActions(),
					dtSelectableOptions : getVehiclesSelectableOptions()
				};
			};
			var getPassengersDTOptions = function () {
				return{
					"sDom": "L<'dt-toolbar'<'col-xs-12 col-sm-6'l><'col-sm-6 hidden-xs'TC>r>" +
						"t" +
						"<'dt-toolbar-footer'<'col-xs-6'i><'col-xs-6'p>>",
					"oTableTools": {
						"aButtons": ["copy", {
							"sExtends": "print",
							"sMessage": "Print Passengers Report <i>(press Esc to close)</i>"
						}, "csv", "xls", "pdf"],
						"sSwfPath": "plugin/datatables-tabletools/swf/copy_csv_xls_pdf.swf"
					},
					"colVis": {
						activate: "mouseover",
						aiExclude: [0]
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
			var getPassengersColumns = function() {
				return [{
					"bSortable": false,
					"mDataProp": null,
					"sDefaultContent": '',
					"aTargets": [0],
					"sWidth": '15px'
				},
				{
					"mDataProp" : "passengerfirstname",
					"aTargets":[1]
				},
				{
					"mDataProp" : "clientid",
					"aTargets" : [2]
				},
				{
					"mDataProp" : "pickupstopname",
					"aTargets" : [3]
				},
				{
					"mDataProp" : "dropstopname",
					"aTargets" : [4]
				},
				{
					"mDataProp": null,
					"aTargets": [5],
					"sWidth": "70px",
					"sDefaultContent": '<div class="btn-group btn-group-sm">' + 
						'<button type="button" data-toggle="tooltip" title="Edit Passenger Details" class="btn btn-default btn-sm btn-icon" data-container="td" id="edit-vehicle"><i class="fa fa-edit fa-lg txt-color-green"></i></button>' +
						'<button type="button" data-toggle="tooltip" title="Delete Passenger" class="btn btn-default btn-sm btn-icon" data-container="td" id="delete-vehicle"><i class="fa fa-trash-o fa-lg txt-color-red"></i></button>' +
						'</div>',
					"fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
						$(".btn-icon", nTd).tooltip();
					}
				}];
			};
			var getPassengersFilters = function(){
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
				null];
			};
			var getPassengersCustomActions = function(){
				return [{
					actionControlId: "#edit-passenger",
					actionHandler: "editPassenger(row)"
				},
			    {
					actionControlId: "#delete-passenger",
					actionHandler: "deletePassenger(row)"
				}];
			};
			var getPassengersSelectableOptions = function(){
				return {
					bShowControls: true,
					bSelectAllCheckbox: false,
					sSelectionTrigger: "cell",
					sSelectedRowClass: "success"
				};
			};
			var getPassengersTableDefaults = function(){
				return {
					dtOptions : getVehiclesDTOptions(),
					dtColumns : getPassengersColumns(),
					dtColumnFilters : getPassengersFilters(),
					dtCustomActions : getPassengersCustomActions(),
					dtSelectableOptions: getPassengersSelectableOptions()
				};
			};

			/** Vehicles Datatable Options - END */

			/** Holidays Datatable Options - BEGIN */

			var getHolidaysDTOptions = function () {
				return {
					"sDom": "L<'dt-toolbar'<'col-xs-12 col-sm-6'l><'col-sm-6 hidden-xs'TC>r>" +
						"t" +
						"<'dt-toolbar-footer'<'col-xs-6'i><'col-xs-6'p>>",
					//"sDom": "LTC<'clear'>R<'dt-toolbar'lr>" + "t" + "<'dt-toolbar-footer'<'col-xs-6'i><'col-xs-6'p>>",
					"oTableTools": {
						"aButtons": ["copy", {
							"sExtends": "print",
							"sMessage": "Print Holidays Report <i>(press Esc to close)</i>"
						}, "csv", "xls", "pdf"],
						"sSwfPath": "plugin/datatables-tabletools/swf/copy_csv_xls_pdf.swf"
					},
					"colVis": {
						activate: "mouseover",
						aiExclude: [0]
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

			var getHolidaysColumns = function () {
				return [{
					"bSortable": false,
					"mDataProp": null,
					"sDefaultContent": '',
					"aTargets": [0],
					'sWidth': '15px'
				},
				{
					"mDataProp": 'name',
					"aTargets": [1],
					"sDefaultContent": ''
				},
				{
					"mDataProp": 'description',
					"aTargets": [2],
					"sDefaultContent": ''
				},
				{
					"mDataProp": 'dateFrom',
					"aTargets": [3],
					"sType": 'date',
					"sDefaultContent": '',
					'mRender': function(data, type, obj) {
						// Format Date Here.
						return moment(data).format("ll");
					}
				},
				{
					"mDataProp": 'dateTo',
					"aTargets": [4],
					"sType": 'date',
					"sDefaultContent": '',
					'mRender': function(data, type, obj) {
						// Format Date Here.
						return moment(data).format("ll");
					}
				},
				{
					"mDataProp": null,
					"aTargets": [5],
					"sWidth": "70px",
					"sDefaultContent": '<div class="btn-group btn-group-sm">' +
						'<button type="button" data-toggle="tooltip" title="Edit Holiday Details" class="btn btn-default btn-sm btn-icon" data-container="td" id="edit-holiday"><i class="fa fa-edit fa-lg txt-color-green"></i></button>' +
						'<button type="button" data-toggle="tooltip" title="Delete Holiday" class="btn btn-default btn-sm btn-icon" data-container="td" id="delete-holiday"><i class="fa fa-trash-o fa-lg txt-color-red"></i></button>' +
						'</div>',
					"fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
						$(".btn-icon", nTd).tooltip();
					}
				}];
			};

			var getHolidaysFilters = function() {
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
				null];
			};

			var getHolidaysCustomActions = function() {
				return [{
					actionControlId: "#edit-holiday",
					actionHandler: "editHoliday(row)"
				}, {
					actionControlId: "#delete-holiday",
					actionHandler: "deleteHoliday(row)"
				}];
			};

			var getHolidaysSelectableOptions = function() {
				return {
					bShowControls: true,
					bSelectAllCheckbox: true,
					sSelectionTrigger: "cell",
					sSelectedRowClass: "success"
				};
			};

			var getHolidaysTableDefaults = function() {
				return {
					dtOptions : getHolidaysDTOptions(),
					dtColumns : getHolidaysColumns(),
					dtColumnFilters : getHolidaysFilters(),
					dtCustomActions : getHolidaysCustomActions(),
					dtSelectableOptions : getHolidaysSelectableOptions()
				};
			};

			/** Holidays Datatable Options - END */

			return {
				getVehiclesTableDefaults : getVehiclesTableDefaults,
				getHolidaysTableDefaults : getHolidaysTableDefaults,
				getPassengersTableDefaults : getPassengersTableDefaults
			};
		}
	]);
});