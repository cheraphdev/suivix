const { EmbedBuilder } = require('discord.js');
const config = require("../config");
const guildSchema = require('../models/guildSchema');
let cooldown = new Set();
let cseconds = "2";
const messagesSchema = require("../models/messagesSchema");

module.exports = {
    name: 'messageCreate',
    async execute(client, message) {

        if (message.author.bot) return
        if (message.channel.type == "DM") return;

        //|▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬| Récupération des messages d'un utilisateur (mongodb) |▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬|

        const author = message.author;
        const randomNum = Math.floor(Math.random() * 1 + 1);
        const messagesToAdd = randomNum;

        let data = await messagesSchema.findOneAndUpdate(
            {
                GuildId: message.guild.id,
                UserId: author.id,
            },
            {
                $inc: {
                    UserMessages: messagesToAdd,
                },
            }
        );

        if (!data) {
            let data = new messagesSchema({
                GuildId: message.guild.id,
                UserId: author.id,
                UserMessages: messagesToAdd
            });
            data.save();
        }

        //|▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

        //|▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬| Event aide mention / Commande prefix |▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬|

        let guildData = await guildSchema.findOne({
            GuildId: message.guild.id
        })

        if (message.content.match(`^<@!?${client.user.id}>( |)$`)) {
            const prefixEmbed = new EmbedBuilder()
                .setTitle(`Salut ${message.author.tag}`)
                .setDescription(`Voici mon préfixe \`` + guildData.Prefix + `\``)
                .setColor(config.colors.default)
            message.reply({ embeds: [prefixEmbed] })
        }

        const args = message.content.slice(guildData.Prefix.length).trim().split(' ')
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName)

        if (!message.content.startsWith(guildData.Prefix) || message.author.bot) return;
        if (!command) return
        console.log(`[COMMANDE] La commande "${commandName}" à été exécuté par ${message.author.tag}`)

        try {
            command.run(message, args, client)
        } catch (error) {
            message.channel.send(`> **❌ Je suis désolée mais il y à eu une erreur durant l'execution du code.**`)
        };

        //|▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

    }
}