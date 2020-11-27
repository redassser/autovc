const { VoiceBroadcast } = require("discord.js");

module.exports = (client, oldmember, newmember) => {
    if(!newmember.guild.members.cache.get(client.user.id).hasPermission("MANAGE_CHANNELS")) {newmember.member.send("Sorry! I don't have the ``manage channels`` permission in "+newmember.guild.name+"!");return;}
    if(newmember.channel!=null&&newmember.channel.parent.name=="auto-vc") { //if they join
        var chanid = newmember.channel.id
        checkLatest(chanid);
    }
    if(oldmember.channel!=null&&oldmember.channel.parent.name=="auto-vc") { //if they leave
        var chanid = oldmember.channel.id
        checkPast(chanid)
        return;
    }
    function checkLatest(id) {
        if(newmember.channelID === oldmember.channelID) {return;}
        if(newmember.channel.members.size>1) {return;}
        var chanarray = []; const parnt = newmember.channel.parent
        if(parnt.children.has(channel => channel.members.first()===undefined)) {return;}
        parnt.children.each(channel => chanarray.push(channel.id))
        if(chanarray.includes(id)) {
            parnt.guild.channels.create("auto-vc",
                {
                    type: "voice",
                    parent: parnt,
                    bitrate: 72000
                }
            ); return;
        }
    }
    function checkPast(id) {
        if(oldmember.channel.members.first()!=undefined) {return;}
        var emptychanarray = []; const parnt = oldmember.channel.parent; var xnum;
        parnt.children.filter(channel => channel.members.first()===undefined)
        .each(channel => emptychanarray.push(channel))
        if(emptychanarray.length>1) {
            xnum = emptychanarray.length-1
        } else if (newmember.channel.parent.name=="auto-vc"&&emptychanarray.length===1) {
            xnum = emptychanarray.length
        }
        for(let x=0;x<xnum;x++) {
            var dead = emptychanarray[x]
            var sad = parnt.guild.channels.cache.find(h=>h.id==dead)
            sad.delete()
        }
    }
}