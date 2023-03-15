const config = require("../config");
const Discord = require("discord.js");

module.exports = {
    name: 'guildMemberAdd',
    async execute(client, member) {
        if (member.guild.id != '1079932687168589936') return;
        let myRole = member.guild.roles.cache.get("1080091325799616512");
        member.roles.add(myRole);
        const channelid = '1080073356306550844';
        const message2 = `Hey <@${member.id}>, bienvenue sur le serveur support de <@${client.user.id}> 🏆`
        const channel = member.guild.channels.cache.get(channelid)
        channel.send(message2)
    }
}