// create character model
var Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  var Character = sequelize.define("Character", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    health: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 100,
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
      default: () => {
        return Math.random();
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
  });
  Character.associate = (models) => {
    Character.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Character;
};
