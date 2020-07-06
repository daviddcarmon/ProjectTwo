// require bcrypt for pw hashing
const bcrypt = require("bcryptjs");

// create user model
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define("User", {
    // email  cannot be null and must be proper email before creation
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    // username  cannot be null and must not be used yet before creation
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // create custom method for user model. will check if unhashed pw entered by user can be compared to the hashed pw stored in the db
  User.prototype.validPassword = (password) => {
    return bcrypt.compareSync(password, this.password);
  };
  // hooks are auto methods that run furing various phases of the user model lifecycle. before user is created we will auto hash their pw
  User.addHook("beforeCreate", (user) => {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });
  return User;
};
