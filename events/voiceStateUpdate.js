module.exports = (client, memberPrev, memberNew) => {
    //AUTOVC
    const channelNames = ["autovc"];
    randomName = () => channelNames[Math.floor(Math.random()*channelNames.length)];
        //randomize name list
    if(!memberNew.guild.members.me.permissions.has("ManageChannels")) return;
    if(!memberNew.guild.members.me.permissions.has("ViewChannel")) return;  
    var channelNew = memberNew.channel; channelPrev = memberPrev.channel
    if(channelNew!=null&&(channelNew.parent.name=="auto-vc"||channelNew.parent.name=="autovc")) { //if they join
        const parent = channelNew.parent;
        update(parent);
        return;
    }
    if(channelPrev!=null&&(channelPrev.parent.name=="auto-vc"||channelPrev.parent.name=="autovc")) { //if they leave
        const parent = channelPrev.parent;
        update(parent);
        return;
    }
    function update(parent) {
        const emptynum = parent.children.cache
            .filter(channel=>channel.members.first() === undefined)
            .size
        if(emptynum > 1) {
            channelPrev.delete();
        } else if (emptynum === 0) {
            parent.guild.channels.create({
                name: randomName(),
                type: 2,
                parent: parent,
                bitrate: 72000
            });
        }
    }
    //AUTOVC
}