const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType } = require("discord.js")

const allembed = require("../database/autoembed.json")
const config = require("../config")
const fs = require("fs")

module.exports = {
    name: "embed-panel",
    run: async (message, args, client) => {

        if (!message.member.permissions.has("Administrator")) {
            return message.channel.send(`**${message.author.tag}**, Vous avez pas les permissions requises. (Administrateur)`)
        }

        const autoembed = allembed[message.guild.id]

        if (!autoembed) return message.channel.send(`❌・L'auto-embed n'a pas été créé, exécuté la commande **embed-create** pour le créer.`)

        const previewEmbed = new EmbedBuilder()
            .setTitle(`${autoembed.titre}`)
            .setDescription(`${autoembed.description}`)
            .setColor(autoembed.couleur)
        const visuels = await message.channel.send({ embeds: [previewEmbed], content: `<:info:1071521506573701120> **Ce système est toujours en cours de développement.**\nVoici un aperçu de ce qui est envoyer après chaque publicité :eyes:` })

        let buttonSetup = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('stats')
                    .setLabel("Activer/Désactiver")
                    .setEmoji('⚙️')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('titre')
                    .setLabel("Titre")
                    .setEmoji('✏️')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('description')
                    .setLabel("Description")
                    .setEmoji('📃')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('couleur')
                    .setLabel("Couleur")
                    .setEmoji('🎨')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('save')
                    .setLabel("Sauvegarder")
                    .setEmoji('✅')
                    .setStyle(ButtonStyle.Success)
            )

        const setupEmbed = new EmbedBuilder()
            .setTitle(`📚 Configuration du auto-embed !`)
            .setDescription(`<:suivixlogo:1079932737483448340> __**Plus d'informations**__\n\`\`\`{member.tag} = Afficher la personne avec sont nom et sont tag.\n{member.id} = Afficher l'identifiant de la personne.\n{guild.name} = Afficher le nom du serveur.\n{guild.id} = Afficher l'identifiant du serveur.\`\`\``)
            .addFields({ name: '📬 __Système Status__', value: `${autoembed.status == "true" ? "\`✅ Activer\`" : "\`❌ Désactiver\`"}`, inline: true })
            .setColor(config.colors.default)
        message.channel.send({ embeds: [setupEmbed], components: [buttonSetup] })

        const filter = m => message.author.id === m.author.id;

        const collector = message.channel.createMessageComponentCollector({ componentType: ComponentType.Button, time: 300000 });

        collector.on('collect', i => {
            if (i.customId === "stats") {
                i.deferUpdate()
                if (i.message.embeds[0].fields[0].value == "\`✅ Activer\`") {
                    i.message.embeds[0].fields[0] = { value: "\`❌ Désactiver\`", name: "📬 __Système Status__", inline: true }
                    i.message.edit({ embeds: i.message.embeds })
                } else {
                    i.message.embeds[0].fields[0] = { value: "\`✅ Activer\`", name: "📬 __Système Status__", inline: true }
                    i.message.edit({ embeds: i.message.embeds })
                }
            } else if (i.customId === "titre") {
                i.reply("Quel titre voulez-vous mettre.")
                message.channel.awaitMessages({ filter, max: 1, time: 60000 })
                    .then(async (collected) => {
                        collected.first().delete();
                        const msgtitre = collected.first().content
                        i.deleteReply()
                        previewEmbed.setTitle(msgtitre)
                        visuels.edit({ embeds: [previewEmbed] })
                    })
            } else if (i.customId === "description") {
                i.reply("Quel description voulez-vous mettre.")
                message.channel.awaitMessages({ filter, max: 1, time: 60000 })
                    .then(async (collected) => {
                        collected.first().delete();
                        const msgdesc = collected.first().content
                        i.deleteReply()
                        previewEmbed.setDescription(msgdesc)
                        visuels.edit({ embeds: [previewEmbed] })
                    })
            } else if (i.customId === "couleur") {
                i.reply("Quel couleur voulez-vous mettre.")
                message.channel.awaitMessages({ filter, max: 1, time: 60000 })
                    .then(async (collected) => {
                        collected.first().delete();
                        const msgcouleur = collected.first().content
                        i.deleteReply()

                        isHexColor = hex => typeof hex === 'string' && hex.length === 6 && !isNaN(Number('0x' + hex))

                        if (isHexColor(`${msgcouleur}`) == false) {
                            message.channel.send(`❌・Ce format ne possède pas de code hexadécimal valable.`).then(msg => { setTimeout(() => msg.delete(), 5000) })
                        } else {
                            previewEmbed.setColor(msgcouleur)
                            visuels.edit({ embeds: [previewEmbed] })
                        }
                    })
            } else if (i.customId === "save") {
                buttonSetup.components[0].setDisabled(true)
                buttonSetup.components[1].setDisabled(true)
                buttonSetup.components[2].setDisabled(true)
                buttonSetup.components[3].setDisabled(true)
                buttonSetup.components[4].setDisabled(true)
                i.message.edit({ components: [buttonSetup] })

                const stats = i.message.embeds[0].fields[0]
                stats.value = stats.value.replace(`✅ Activer`, `true`)
                stats.value = stats.value.replace(`❌ Désactiver`, `false`)

                delete allembed[i.guild.id]
                allembed[i.guild.id] = {
                    "status": stats.value,
                    "titre": visuels.embeds[0].title,
                    "description": visuels.embeds[0].description,
                    "couleur": visuels.embeds[0].color
                }
                fs.writeFile("./database/autoembed.json", JSON.stringify(allembed), (err) => { if (err) console.error(err) })

                i.reply(`✅ Sauvegarde effectué !`)
                collector.stop()
            }
        }) //Fin collector

    }
}