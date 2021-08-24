const fs = require("fs");

exports.getUsersFromDatabase = (cb) => {
  let users;
  fs.readFile("./database.json", "utf-8", (err, data) => {
    if (err) {
      console.log(error);
    } else {
      try {
        users = JSON.parse(data);
        return cb(users);
      } catch (error) {
        console.log(error);
      }
    }
  });
  return users;
};

exports.addUsersToDatabase = (users) => {
  fs.writeFile("./database.json", JSON.stringify(users, null, 2), (err) => {
    if (err) {
      console.log(error);
    }
  });
};
