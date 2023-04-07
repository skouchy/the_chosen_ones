// create our User model: imported 'Model' class & 'DataTypes' obj from Sequelize
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model { }

// initialize User model data and configuration
User.init(
    {
        // defines 'id' column and allowed data constraints
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        // defines 'username' column and allowed data constraints
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // defines 'email' column and allowed data constraints
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        // defines 'password' column and allowed data constraints
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6], // password must be atleast 6 characters
            },
        },
    },
    {
        hooks: {
          beforeCreate: async (newUserData) => {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
          },
          beforeUpdate: async (updatedUserData) => {
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            return updatedUserData;
          },
        },
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
        modelName: 'user'
    }
    );
    
    // exports user model to be used in other parts of app
    module.exports = User;
  
  //(https://sequelize.org/v5/manual/models-definition.html#configuration))