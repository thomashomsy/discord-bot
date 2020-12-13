//const Database = require("./helpers/database");
const Discord = require("discord.js");
require("dotenv").config();
const client = new Discord.Client();

const Database = require('./helpers/Database.js');

class MessageProccesor {
  constructor(db, client) {
    this.db = db;
    this.client = client;
  }
  addMember(args) {
    if (args.length >= 4) {
      this.client.users.
      const resolveName = this.client.users.cache.get(args[1]);
      console.log("Name resolved to: " + resolveName);
      if (resolveName) {
        const id = parseInt(resolveName.id);
        if (db.getUser(id).length < 1) {
          console.log("User does not exist in DB");
          const isAdmin = parseInt(args[2]);
          const university = args[3];
          return db.addMember(id, args[1], isAdmin, university);
        } else {
          console.log("failed line 73");
        }
      }
      console.log("resolve name didn't work");
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
          if (db.isAdmin(message.author.id)) {
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
client.users.resolveID()
client.on("message", function (message) {
  console.log(
    message.author.id + " - " + message.author.tag + ": " + message.content
  );
  MP.processMessage(message);
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.BOT_TOKEN);
