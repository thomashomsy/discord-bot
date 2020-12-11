//const mysql = require("mysql");

export default class database {
  constructor() {
    this.mysql = require("mysql");

    this.connection = mysql.connection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    });

    this.connection.connect(function (error) {
      console.log(error);
    });
  }

  setUpTables() {
    this.connection.query("DROP DATABASE busr;").catch((err) => {
      console.log(err.message);
    });
    this.connection.query(
      "CREATE TABLE `busr_members` ( `discord_id` INT(64) unsigned NOT NULL, `discord_name` VARCHAR(64) DEFAULT '', `isAdmin` BOOLEAN(1) NOT NULL DEFAULT '0', `university` VARCHAR(40) DEFAULT '', PRIMARY KEY (`discord_id`) );"
    );
    this.connection.query("INSERT INTO `busr_members` VALUES()");
  }
}
