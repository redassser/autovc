const Discord = require("discord.js");  

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("autovc")
        .setDescription("Creates the autovc category. Admins only."),
        async execute(interaction) {
            if(!interaction.member.permissions.has("Administrator")) 
                interaction.reply({ephemeral: true, content: "Sorry! Admins only."});
            else if(!interaction.appPermissions.has("ManageChannels"))
                interaction.reply({ephemeral: true, content: "Sorry! I don't have the *manage channels* permission."});
            else if(!interaction.appPermissions.has("ViewChannel"))
                interaction.reply({ephemeral: true, content: "Sorry! I don't have the *view channels* permission."});
            else if (interaction.guild.channels.cache.find(h=>h.type===2&&h.name==="autovc"))
                interaction.reply({ephemeral: true, content: "Sorry! You already have an autovc category."});
            else {
                await interaction.guild.channels.create({
                    name: "autovc",
                    type: 4,
                    position: 2
                }).then(parent => {
                    interaction.guild.channels.create({
                        name: "autovc",
                        type: 2,
                        parent: parent,
                        bitrate: 72000
                    });
                }).then(()=>{
                    interaction.reply({ephemeral: true, content: "AUTOVC created. You can add any other channels to the category!"})
                })
            }
        },
}