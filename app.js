require('dotenv').config();
const Discord = require("discord.js");
const blapi = require("blapi");
const client = new Discord.Client();
const fs = require("fs");

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

const apikeys = {
  "top.gg":process.env.topgg,
  "discord.bots.gg":process.env.botsgg
}

client.login(process.env.TOKEN);

blapi.handle(client,apikeys,300)