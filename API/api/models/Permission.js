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