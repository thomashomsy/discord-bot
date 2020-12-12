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

class MessageProccesor {
  constructor(db, client) {
    this.db = db;
    this.client = client;
  }
  addMember(args) {
    if (args.length >= 4) {
      const resolveName = this.client.users.cache.get(args[1]);
      if (resolveName) {
        const id = parseInt(resolveName.id);
        if (db.getUser(id).length < 1) {
          console.log("User does not exist in DB");
          const isAdmin = parseInt(args[2]);
          const university = args[3];
          return db.addMember(id, args[1], isAdmin, university);
        }
      }
    }
    return false;
  }

  processMessage(message) {
    if (message.content.startsWith("!")) {
      const args = message.content
        .substring(1, message.content.length - 1)
        .toLowerCase()
        .split(" "); //Split up command arguments
      switch (args[0]) {
        case "addmember":
          if (db.isAdmin(message.author)) {
            message.reply("Attempting to add a member!");
            if (this.addMember(args)) {
              message.reply("User Added");
            } else {
              message.reply("User was not added!");
            }
          } else {
            message.reply("Sorry You don't have permission for this!");
          }
          break;
      }
    }
  }
}

const db = new Database();
const MP = new MessageProccesor(db, client);
client.on("message", function (message) {
  console.log(
    message.author + " - " + message.author.tag + ": " + message.content
  );
  MP.processMessage(message);
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.BOT_TOKEN);
