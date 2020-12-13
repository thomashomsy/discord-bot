const mysql = require("mysql");

class Database {
  constructor() {
    this.connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: "busr",
      insecureAuth: true,
    });

    this.connection.connect(function (error) {
      if (error) console.log("Error: " + error);
    });
  }

  setUpTables() {
    this.connection.query("DROP DATABASE busr;");
    this.connection.query("CREATE DATABASE busr;");
    this.connection.query("USE busr;");
    this.connection.query(
      "CREATE TABLE `busr_members` ( `discord_id` INT(64) unsigned NOT NULL, `discord_name` VARCHAR(64) DEFAULT '', `isAdmin` BOOLEAN NOT NULL DEFAULT 0, `university` VARCHAR(40) DEFAULT '', PRIMARY KEY (`discord_id`) );"
    );
    this.connection.query(
      "INSERT INTO `busr_members` VALUES(188720056404803586, `Respects#3394`, 1, `University Of Kent`)"
    );
  }

  addMember(userId, userTag, isAdmin, university) {
    this.connection.query(
      `INSERT INTO busr_members VALUES(${userId}, ${userTag}, ${isAdmin}, ${university});`
    );
    return true;
  }

  getUser(author) {
    return this.connection.query(
      `SELECT * FROM busr_members WHERE 'discord_id'=${author};`,
      function (err, result) {
        if (err) console.log(err);
        return result;
      }
    );
  }

  isAdmin(author) {
    return this.connection.query(
      `SELECT isAdmin FROM busr_members WHERE 'discord_id'=${author};`,
      function (err, result) {
        if (err) console.log(err);
        if (result && result.isAdmin === 1) return true;
        else return false;
      }
    );
  }
}
exports.Database = Database;
