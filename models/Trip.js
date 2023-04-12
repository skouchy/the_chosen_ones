// create our User model: imported 'Model' class & 'DataTypes' obj from Sequelize
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Trip extends Model { }

// initialize User model data and configuration
Trip.init(
    {
        // defines 'id' column and allowed data constraints
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        // defines 'username' column and allowed data constraints
        trip_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        launch_date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        end_date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        section: {
            type: DataTypes.STRING,
            allowNull: true
        },
        river: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        // calls sequelize connection direct to the database
        sequelize,
        // auto generation of createdAt/updatedAt timestamp fields are not permitted
        timestamps: false,
        // instructs Sequalize: do not modify Table Names to be 'plural'
        freezeTableName: true,
        // commands underscores rather than hyphens (i.e. `comment_text` and not `commentText`)
        underscored: true,
        // make it so our model name stays lowercase in the database
        modelName: 'trip'
    }
);

// exports user model to be used in other parts of app
module.exports = Trip;

  //(https://sequelize.org/v5/manual/models-definition.html#configuration))