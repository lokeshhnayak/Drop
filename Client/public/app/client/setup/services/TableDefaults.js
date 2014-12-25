define([
	'client/setup/module',   // Angular Module for WebArtists VTSS app.
	'common/utils/supplant', // Supplant
	'common/utils/Utils',    // Utils Library
	'lodash'                 // Lodash Library
],
function(module, supplant) {

	'use strict';

	module.registerService('TableDefaults', [
		'_',
		'Logger',
		function (_, Logger) {
			var logger = Logger.getInstance('TableDefaults');
			logger.info("In TableDefaults");

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
					"mDataProp": 'client',
					"aTargets": [2],
				},
				{
					"mDataProp": 'type',
					"aTargets": [3],
					"sDefaultContent": '<label for="" class="label label-warning">Car</label>',
					"fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
						if (oData.type === "Car") {
							$(nTd)[0].innerHTML = '<div><label for="" class="label label-success">Car</label></div>';
						} else if(oData.type === "Bus") {
							$(nTd)[0].innerHTML = '<div><label for="" class="label label-warning">Bus</label></div>';
						} else if(oData.type === "Van") {
							$(nTd)[0].innerHTML = '<div><label for="" class="label label-info">Van</label></div>';
						} else {
							$(nTd)[0].innerHTML = '<div><label for="" class="label label-danger">Unknown</label></div>';
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
					"sWidth": "60px",
					"sDefaultContent": '<div class="btn-group btn-group-sm">' + 
						'<button type="button" data-toggle="tooltip" title="Edit Vehicle Details" class="btn btn-default btn-sm btn-icon" data-container="td" id="edit-vehicle"><i class="fa fa-edit text-primary"></i></button>' +
						'<button type="button" data-toggle="tooltip" title="Delete Vehicle" class="btn btn-default btn-sm btn-icon" data-container="td" id="delete-vehicle"><i class="fa fa-trash-o text-success"></i></button>' +
						'</div>',
					"fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
						// $(".btn-icon", nTd).tooltip();
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
					dtColumns : getVehiclesColumns(),
					dtColumnFilters : getVehiclesFilters(),
					dtCustomActions : getVehiclesCustomActions(),
					dtSelectableOptions : getVehiclesSelectableOptions()
				};
			};

			return {
				getVehiclesTableDefaults : getVehiclesTableDefaults
			};
		}
	]);
});