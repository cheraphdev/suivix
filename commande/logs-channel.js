const { EmbedBuilder } = require("discord.js")
const path = require("path")
const fs = require("fs")
const config = require("../config")

module.exports = {
    name: "logs-channel",
    run: async (message, args, client) => {
        if (!message.member.permissions.has("ManageChannels")) {
            return message.channel.send(`**${message.author.tag}**, Vous avez pas les permissions requises. (Gérer les salons)`)
        }

        const addPubChannelMessageEmbed = new EmbedBuilder()
            .setTitle("⏳ Ajout d'un salon")
            .setColor(config.colors.default)
            .setDescription(`Bienvenue dans le menu d'ajout du salon de logs publicitaire.\n\n*\`Si vous souhaitez quittez, écrivez "annuler" !\`*`)
            .setFooter({ text: 'Suivix aide votre serveur publicitaire 😁', iconURL: client.user.displayAvatarURL({ dynamic: true }) })
        message.channel.send({ embeds: [addPubChannelMessageEmbed] }).then(async (msg) => {

            let channel
            const filter = m => message.author.id === m.author.id;
            await message.channel.awaitMessages({ filter, max: 1, time: 30000 })
                .then(async (collected) => {
                    collected.first().delete();
                    channel = collected.first().content
                }).catch((err) => {

                    const noSalonEmbed = new EmbedBuilder()
                        .setTitle("❌ Erreur...")
                        .setColor(config.colors.default)
                        .setDescription("Vous n'avez pas entrer de salon.")
                        .setFooter({ text: 'Suivix aide votre serveur publicitaire 😁', iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                    return msg.edit({ embeds: [noSalonEmbed] });
                })

            if (channel == undefined) return

            channel = channel.replace('<', '');
            channel = channel.replace('#', '');
            channel = channel.replace('>', '');

            if (channel === "annuler") {
                return message.channel.send("Annulation ⌛").then((message) => { message.delete({ timeout: 100 }) }).then(message.channel.send(`Annulation avec succès ✅`))
            }

            const salon = message.guild.channels.cache.find((c) => c.id === channel)
            if (!salon) {
                const introuvableEmbed = new EmbedBuilder()
                    .setTitle("❌ Erreur...")
                    .setColor(config.colors.default)
                    .setDescription("Ce salon est introuvable.")
                    .setFooter({ text: 'Suivix aide votre serveur publicitaire 😁', iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                return msg.edit({ embeds: [introuvableEmbed] })
            }

            setlogschannel(message.guild.id, salon.id)

            const sucessadd = new EmbedBuilder()
                .setTitle("✅ Succès")
                .setColor(config.colors.default)
                .setDescription("Le salon <#" + salon.id + "> à correctement été ajouté !")
                .setFooter({ text: 'Suivix aide votre serveur publicitaire 😁', iconURL: client.user.displayAvatarURL({ dynamic: true }) })
            msg.edit({ embeds: [sucessadd] })
        })

        // Function
        async function setlogschannel(serverID, channelID) {
            let server = require(path.resolve(path.join('./database/logschannel.json')));
            if (!server[serverID]) {
                server[serverID] = {
                    logsChannel: channelID
                }
            } else {
                server[serverID] = {
                    logsChannel: channelID
                }
            }
            fs.writeFile(path.resolve(path.join('./database/logschannel.json')), JSON.stringify(server, null, 2), (err) => {
                if (err) console.log(err)
            });
        }
    }
}