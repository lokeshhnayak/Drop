/**
 * Role
 *
 * @module      :: Role
 * @description :: This is the base role model - can be 
 *              "Root", "Host Admin", "Host Technician", "Host Finance", 
 *              "Agency Admin", "Agency Technician", "Agency Finance",
 *              "Client Admin", "Client Technician", "Client Finance"
 *              "Passenger"
 */

module.exports = {

	schema: true,

	seedData: require('./seed/roles.json'),

	attributes: {
		name: {
			type: 'string',
			required: true,
			defaultsTo: 'Passenger'
		},
		description: {
			type: 'string'
		},
		/*users: {
			collection: 'User',
			via: 'roles',
			through: 'userrole'
		},*/
		users: {
			collection: 'User',
			via: 'roles',
			dominant: true
		},
		/*permissions: {
			collection: 'Permission',
			via: 'roles',
			through: 'rolepermission'
		}*/
		permissions: {
			collection: 'Permission',
			via: 'roles'
		}
	}
}