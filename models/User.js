// create our User model: imported 'Model' class & 'DataTypes' obj from Sequelize
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection.js");
const bcrypt = require("bcrypt");

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// initialize User model data and configuration
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6], // password must be atleast 6 characters
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // only unique contraint
      validate: {
        isEmail: true,
      }
    },
    diet: {
      type: DataTypes.STRING,
      allowNull: true
    },
    has_boat: {
      type: DataTypes.ENUM,
      values: ['none', 'raft', 'kayak'],
      allowNull: false
    },
    can_row: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    trip_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'trip',
        key: 'id'
      }
    }
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },

    // calls sequelize connection direct to the database
    sequelize,
    // auto generation of createdAt/updatedAt timestamp fields are not permitted
    timestamps: false,
    // instructs Sequalize: do not modify Table Names to be 'plural'
    freezeTableName: true,
    // commands underscores rather than hyphens (i.e. `comment_text` and not `commentText`)
    underscored: true,
    // make it so our model name stays lowercase in the database
    modelName: 'user',
  }
);

// exports user model to be used in other parts of app
module.exports = User;

//(https://sequelize.org/v5/manual/models-definition.html#configuration))
