const Discord = require("discord.js");
require("dotenv").config();
const client = new Discord.Client();

client.on("message", function (message) {
  console.log(message.author.tag + ": " + message.content);
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.BOT_TOKEN);

//   .catch((error) => {
//     console.log(error.message);
//   });
