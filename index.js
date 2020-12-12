//const Database = require("./helpers/database");
const Discord = require("discord.js");
require("dotenv").config();
const client = new Discord.Client();
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
      if (err) console.log("Error: " + error);
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
}

const db = new Database();
//db.setUpTables();
new client.on("message", function (message) {
  console.log(
    message.author + " - " + message.author.tag + ": " + message.content
  );
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.BOT_TOKEN);
