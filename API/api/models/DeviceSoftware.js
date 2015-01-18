/**
* Device Software
*
* @description :: Represents a Device Software
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	schema: true,

	attributes: {
		deviceModel: {
			type: 'string',
			required: true
		},
		version: {
			type: 'string',
			required: true
		},
		description: 'string',
		releaseDate: {
			type: 'date',
			required: true
		},
		link: {
			type: 'url',
			required: true
		},
		address: {
			model: 'Address'
		},
		agency: {
			model: 'Agency'
		}
	}
};

