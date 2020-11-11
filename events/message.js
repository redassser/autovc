module.exports = (client, message) => {
    if (message.author.bot) return;
    const Discord = require("discord.js")
    const possCommands = [
        "init auto vc",
        "init auto-vc",
        "init autovc"
    ];
    if(possCommands.includes(message.content.toLowerCase())) {
        message.guild.channels.create("auto-vc",
            {
                type: "category",
                position: 2
            }
        ).then(parent => {
            message.guild.channels.create("auto-vc",
                {
                    type: "voice",
                    parent: parent,
                    bitrate: 72000
                }
            );
        })
    }
}