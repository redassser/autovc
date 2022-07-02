exports.run = (client,message,array) => {
    const Discord = require("discord.js");  
    const vcEmbed = new Discord.MessageEmbed()
    if(!message.member.permissions.has("ADMINISTRATOR")) {
        message.channel.send("Sorry! Admins only.")
        return;
    }
    if(!message.guild.me.permissions.has("MANAGE_CHANNELS")) {
        message.channel.send("Sorry! I don't have the *manage channels* permission.");
        return;
    }
    if (message.guild.channels.cache.find(h=>h.type==="GUILD_CATEGORY"&&h.name==="autovc")) {
        message.channel.send("Sorry! You already have an autovc category.");
        return;
    }
    message.guild.channels.create("autovc", {
        type: "GUILD_CATEGORY",
        position: 2
    }).then(parent => {
        message.guild.channels.create("autovc", {
            type: "GUILD_VOICE",
            parent: parent,
            bitrate: 72000
        });
    }).then(()=>{
        vcEmbed
            .setTitle("autovc category created!")
            .setColor("RANDOM")
            .setDescription("You can add any other channels to the category.")
        message.channel.send({embeds:[vcEmbed]})
    })
}
exports.desc = "Creates the autovc category."
exports.inp = [""]