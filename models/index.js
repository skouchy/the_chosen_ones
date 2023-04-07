// imports User model
const User = require('./User');
const Project =require('./Trip');

User.hasMany(Trip, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Trip.belongsTo(User,{
    foreignKey: 'user_id'
});

module.exports = { User };