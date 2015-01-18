/**
* Host
*
* @description :: Represents a Host
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	schema: true,

	attributes: {
		name: {
			type: 'string',
			required: true
		},
		description: 'string',
		hostStatus: {
			type: 'string',
			enum: ['Prospect', 'Active', 'Inactive'],
			defaultsTo: 'Prospect'
		},
		address: {
			model: 'Address'
		}
	}
};

