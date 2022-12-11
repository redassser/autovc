const Discord = require("discord.js");
const client = new Discord.Client({ intents: 129 });
client.config = require("./config.json")
const fs = require("fs");
const Enmap = require('enmap');
require('dotenv').config();
const blapi = require("blapi");

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});
  
client.commands = new Enmap();
  
fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        client.commands.set(commandName, props);
    });
});
client.login(process.env.TOKEN);

apiKeys = {
  "discord.bots.gg": process.env.BOTSGG,
  "top.gg": process.env.TOPGG
}

//blapi.handle(client, apiKeys, 300);