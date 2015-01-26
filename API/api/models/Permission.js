/**
 * Permission
 *
 * @module      :: Permission
 * @description :: This is the base permissions model.
 */

module.exports = {

	schema: true,

	seedData: require('./seed/permissions.json'),

	attributes: {
		name: {
			type: 'string',
			required: true
		},
		description: {
			type: 'string'
		},
		entityType: {
			type: "string",
			enum: ['R', 'H', 'A', 'C', 'P', 'L', 'AU'],
			defaultsTo: 'P'
		},
		module: 'string',
		category: 'string',
		clientUrl: 'string',
		apiVerb: 'string',
		api: 'string',
		/*roles: {
			collection: 'Role',
			via: 'permissions',
			through: 'rolepermission'
		}*/
		roles: {
			collection: 'Role',
			via: 'permissions',
			dominant: true
		}
	}
}