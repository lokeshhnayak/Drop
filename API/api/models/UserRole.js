/*module.exports = {
	tableName: 'userrole',

	tables: ['user', 'role'],

	junctionTable: true,

	attributes: {
		id: {
			primaryKey: true,
			autoIncrement: true,
			type: 'integer'
		},
		
		users: {
			columnName: 'user_id',
			type: 'integer',
			foreignKey: true,
			references: 'user',
			on: 'id',
			via: 'roles',
			groupBy: 'user'
		},
		
		roles: {
			columnName: 'role_id',
			type: 'integer',
			foreignKey: true,
			references: 'role',
			on: 'id',
			via: 'users',
			groupBy: 'role'
		}
	}
}*/