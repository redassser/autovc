module.exports = (client,message,array) => {
    console.log("ready")
    client.user.setPresence({ 
        activities: [{ 
            name: "for .autovc || UPDATED",
            type: "WATCHING"
        }], 
        status: 'online' 
    });
}