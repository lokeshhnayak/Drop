/**
* Device
*
* @description :: Represents a Device
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	schema: true,

	attributes: {
		model: {
			type: 'string',
			required: true
		},
		serial: {
			type: 'string',
			required: true
		},
		password: 'string',
		software: {
			model: 'DeviceSoftware'
		},
		link: {
			type: 'url',
			required: true
		},
		setup: {
			model: 'DeviceSetup'
		},
		host: {
			model: 'Host'
		},
		agency: {
			model: 'Agency'
		},
		vehicle: {
			model: 'Vehicle'
		}
	}
};

