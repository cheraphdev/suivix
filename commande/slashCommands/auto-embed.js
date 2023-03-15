const Discord = require("discord.js");
const config = require("../../config");
const path = require("path");
const fs = require("fs");
const guildSchema = require("../../models/guildSchema");

module.exports = {
    data: {
        description: "🧰 Implementation of auto-embed.",
        descriptionLocalizations: {
            fr: "🧰 Mise en place de l'auto-embed."
        }
    },

    async exe(client, interaction) {

        let guildData = await guildSchema.findOne({
            GuildId: interaction.guild.id
        })

        if (!interaction.member.permissions.has("Administrator")) {
            interaction.reply({
                fr: {
                    embeds: [{
                        author: { name: `${interaction.user.username}#${interaction.user.discriminator}`, iconURL: `${interaction.user.displayAvatarURL()}` },
                        description: `Vous avez pas les permissions requises. \`(Administrateur)\``,
                        footer: { text: 'Suivix aide votre serveur publicitaire 😁', iconURL: client.user.displayAvatarURL({ dynamic: true }) },
                        color: 0xFFFF00
                    }]
                }
            }[interaction.locale] || {
                embeds: [{
                    author: { name: `${interaction.user.username}#${interaction.user.discriminator}`, iconURL: `${interaction.user.displayAvatarURL()}` },
                    description: `You do not have the required permissions. \`(Administrator)\``,
                    footer: { text: 'Suivix helps your ad server 😁', iconURL: client.user.displayAvatarURL({ dynamic: true }) },
                    color: 0xFFFF00
                }]
            }
            )
        }

        addautoembed(interaction.guild.id)

        interaction.reply({
            fr: {
                embeds: [{
                    author: { name: `${interaction.user.username}#${interaction.user.discriminator}`, iconURL: `${interaction.user.displayAvatarURL()}` },
                    description: `L'enregistrement de **l'auto-embed** à été fait avec succès !\nFaite la commande \`${guildData.Prefix}embed-panel\` pour personnaliser **l'auto-embed**.`,
                    footer: { text: 'Suivix aide votre serveur publicitaire 😁', iconURL: client.user.displayAvatarURL({ dynamic: true }) },
                    color: 0xFFFF00
                }]
            }
        }[interaction.locale] || {
            embeds: [{
                author: { name: `${interaction.user.username}#${interaction.user.discriminator}`, iconURL: `${interaction.user.displayAvatarURL()}` },
                description: `**Auto-embed** registration successful!\nRun the command \`${guildData.Prefix}embed-panel\` to customize **auto-embed**.`,
                footer: { text: 'Suivix helps your ad server 😁', iconURL: client.user.displayAvatarURL({ dynamic: true }) },
                color: 0xFFFF00
            }]
        }
        )
        
        async function addautoembed(serverID) {
            let server = require(path.resolve(path.join("./database/autoembed.json")))

            if (!server[serverID]) {
                server[serverID] = {}
                fs.writeFile("./database/autoembed.json", JSON.stringify(server), (err) => {
                    if (err) console.error(err)
                })
            }

            server = require(path.resolve(path.join("./database/autoembed.json")))

            server[serverID] = {
                "status": "false",
                "titre": "Nouvelle publicité ({member.tag})",
                "description": "⚠️ Votre publicité doit respecter le **règlement du serveur**, les **TOS** et la **charte utilisation** de Discord !\n💨 Votre publicité doit contenir une **description** d'au moins **50 caractères** (hors lien.s)\n🔗 Les **liens** contenu dans votre publicité doivent êtres **valides**",
                "couleur": config.colors.default
            }
            fs.writeFile(
                path.resolve(path.join("./database/autoembed.json")),
                JSON.stringify(server, null, 2),
                (err) => {
                    if (err) console.log(err)
                })
        }
    }
};