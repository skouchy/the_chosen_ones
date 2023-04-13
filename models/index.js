// imports User model
const Trip = require('./Trip');
const User = require('./User');

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

module.exports = { Trip, User };