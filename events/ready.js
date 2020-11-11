module.exports = (client,message,array) => {
    console.log("Prepared");
    client.user.setPresence({ activity: { name: 'for "init autovc"',type: "WATCHING" }, status: 'online' });
}