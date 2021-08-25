const User = require("../models/User");
const users = require("../data/users.json");
const databaseConnection = require("../config/databaseConnection");

databaseConnection();

(async () => {
  try {
    await User.deleteMany();
    console.log("Users are deleted");

    await User.insertMany(users);
    console.log("All users are added");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
})();
