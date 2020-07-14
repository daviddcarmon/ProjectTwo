// create character model
module.exports = (sequelize, DataTypes) => {
  var Character = sequelize.define("Character", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });
  return Character;
};
