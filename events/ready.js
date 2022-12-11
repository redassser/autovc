module.exports = (client,message,array) => {
    console.log("ready")
    client.user.setPresence({ 
        activities: [{ 
            name: "for /autovc",
            type: 3
        }], 
        status: 'online' 
    });
}