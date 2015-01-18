/*module.exports = {
	tableName: 'role_permission',

	tables: ['role', 'permission'],

	junctionTable: true,

	attributes: {
		id: {
			primaryKey: true,
			autoIncrement: true,
			type: 'integer'
		},
		
		roles: {
			columnName: 'role_id',
			type: 'integer',
			foreignKey: true,
			references: 'role',
			on: 'id',
			via: 'permissions',
			groupBy: 'role'
		},
		
		permissions: {
			columnName: 'permission_id',
			type: 'integer',
			foreignKey: true,
			references: 'permission',
			on: 'id',
			via: 'roles',
			groupBy: 'permission'
		}
	}
}*/