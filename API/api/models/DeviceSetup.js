/**
* Device Setup
*
* @description :: Represents a Device Setup
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	schema: true,

	types: {
		camera_limit: function(num) {
			return num <= 4;
		}
	},

	attributes: {
		allocation: {
			type: 'string',
			enum: ['N', 'A'], // N - Not Allocated, A - Allocated
			defaultsTo: 'N'
		},
		installation: {
			type: 'string',
			enum: ['N', 'I', 'A'], // N - Not Installed, I - Installed, A - Activated
			defaultsTo: 'N'
		},
		storage: {
			type: 'string',
			enum: ['N', 'SD', 'HDD'], // N - Not Available, SD - SD Card/Flash, HDD - Hard Disk
			defaultsTo: 'SD'
		},
		storageCapacity: 'int',
		numOfCameras: {
			type: 'int',
			camera_limit: true
		},
		activateGPS: 'boolean',
		activateAcc: 'boolean',
		activateSpeaker: 'boolean',
		activateMic: 'boolean',
		speedLimit: 'int'
	}
};

