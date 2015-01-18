/**
 * EntityType
 *
 * @module      :: Model
 * @description :: This is the base entity type model - can be "Root", "Host", "Agency", "Client", "Passenger"
 * @docs        :: http://waterlock.ninja/documentation
 */

module.exports = {

	attributes: {
		name: {
			type: "string",
			required: true
		}
	}
}