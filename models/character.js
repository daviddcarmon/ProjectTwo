// create character model
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
