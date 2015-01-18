/**
 * User
 *
 * @module      :: Model
 * @description :: This is the base user model
 * @docs        :: http://waterlock.ninja/documentation
 */

module.exports = {

	schema: true,

	attributes: require('waterlock').models.user.attributes({
		firstName: {
			type: 'string',
			required: true,
			defaultsTo: ''
		},
		lastName: {
			type: 'string',
			required: true,
			defaultsTo: ''
		},
		email: {
			type: 'string',
			email: true,
			required: true,
			unique: true
		},
		username: {
			type: 'string',
			required: true,
			unique: true
		},
		entityType: {
			type: "string",
			enum: ['R', 'H', 'A', 'C', 'P'],
			defaultsTo: 'P'
		},
		/*roles: {
			collection: 'Role',
			via: 'users',
			dominant: true,
			through: 'userrole'
		},*/
		roles: {
			collection: 'Role',
			via: 'users'
		},
		getFullName: function() {
			return this.firstName + ' ' + this.lastName;
		}
	}),
	
	beforeCreate: require('waterlock').models.user.beforeCreate,
	beforeUpdate: require('waterlock').models.user.beforeUpdate
};
