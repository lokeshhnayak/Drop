/**
* Address
*
* @description :: Represents an Address
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	schema: true,

	attributes: {
 		street: 'string',
 		state: 'string',
 		country: 'string',
 		pincode: 'string',
 		mailId: {
 			type: 'email',
 			required: true
 		},
 		phoneNumber: {
 			type: 'numeric',
 			required: true
 		},
 		client: {
 			model: 'Client'
 		}
	}
};

