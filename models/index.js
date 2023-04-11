// imports User model
const User = require('./User');
const Trip = require('./Trip');

Trip.hasMany(User, {
    foreignKey: 'trip_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

User.belongsTo(Trip, {
    foreignKey: 'trip_id'
});

// EXAMPLE
// Team.hasMany(Player);
// Player.belongsTo(Team);

module.exports = { User, Trip };