const { Client, CommandInteraction } = require("discord.js");
const config = require("../config");
const Discord = require("discord.js");
const messagesSchema = require("../models/messagesSchema");
const guildSchema = require("../models/guildSchema");

/**
 * 
 * @param {Client} client 
 * @param {CommandInteraction} interaction
 */
module.exports = {
    name: 'interactionCreate',
    async execute(client, interaction) {

        const data = await guildSchema.findOne({
            GuildId: interaction.guild.id
        });

        if (interaction.type === Discord.InteractionType.ApplicationCommand) {

            const { exe } = require(`../commande/slashCommands/${interaction.commandName}`);
            exe(client, interaction);
            console.log(`[SLASH] La slashcommand "${interaction.commandName}" à été exécuté par ${interaction.user.tag}`);
        }

        if (interaction.customId === "messagesCount") {
            await interaction.deferReply({ ephemeral: true });

            const messages = await messagesSchema.findOne({
                GuildId: interaction.guild.id
            })

            interaction.followUp({
                fr: {
                    embeds: [{
                        author: { name: `${interaction.user.username}#${interaction.user.discriminator}`, iconURL: `${interaction.user.displayAvatarURL()}` },
                        description: `Vous avez envoyer \`${messages.UserMessages}\` message(s).`,
                        footer: { text: 'Suivix aide votre serveur publicitaire 😁', iconURL: client.user.displayAvatarURL({ dynamic: true }) },
                        color: 0xFFFF00
                    }],
                    ephemeral: true
                }
            }[interaction.locale] || {
                embeds: [{
                    author: { name: `${interaction.user.username}#${interaction.user.discriminator}`, iconURL: `${interaction.user.displayAvatarURL()}` },
                    description: `You have sent \`${messages.UserMessages}\` message(s).`,
                    footer: { text: 'Suivix helps your ad server 😁', iconURL: client.user.displayAvatarURL({ dynamic: true }) },
                    color: 0xFFFF00
                }],
                ephemeral: true
            }
            )
        }

        if (interaction.customId === "leaderboard") {
            await interaction.deferReply({ ephemeral: true });
            const leaderboard = await messagesSchema.find({
                GuildId: interaction.guild.id
            }).sort({ UserMessages: -1 }).limit(10);

            const mappedData = leaderboard
                .map((d, i) => `\`${i + 1}\` <@${d.UserId}> - Message(s): \`${d.UserMessages}\``)
                .join("\n");

            interaction.followUp({
                fr: {
                    embeds: [{
                        author: { name: `${interaction.user.username}#${interaction.user.discriminator}`, iconURL: `${interaction.user.displayAvatarURL()}` },
                        description: mappedData.toString(),
                        footer: { text: 'Suivix aide votre serveur publicitaire 😁', iconURL: client.user.displayAvatarURL({ dynamic: true }) },
                        color: 0xFFFF00
                    }],
                    ephemeral: true
                }
            }[interaction.locale] || {
                embeds: [{
                    author: { name: `${interaction.user.username}#${interaction.user.discriminator}`, iconURL: `${interaction.user.displayAvatarURL()}` },
                    description: mappedData.toString(),
                    footer: { text: 'Suivix helps your ad server 😁', iconURL: client.user.displayAvatarURL({ dynamic: true }) },
                    color: 0xFFFF00
                }],
                ephemeral: true
            }
            )
        }

        if (interaction.customId === "statsbot") {
            await interaction.deferReply({ ephemeral: true })

            interaction.followUp({
                fr: {
                    embeds: [{
                        author: { name: `${interaction.user.username}#${interaction.user.discriminator}`, iconURL: `${interaction.user.displayAvatarURL()}` },
                        description: `Serveur(s): \`${client.guilds.cache.size}\`\nSalon(s): \`${client.channels.cache.size}\`\nUtilisateur(s): \`${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}\`\nDiscord.js: \`v${Discord.version}\`\nNode: \`${process.version}\``,
                        footer: { text: 'Suivix aide votre serveur publicitaire 😁', iconURL: client.user.displayAvatarURL({ dynamic: true }) },
                        color: 0xFFFF00
                    }],
                    ephemeral: true
                }
            }[interaction.locale] || {
                embeds: [{
                    author: { name: `${interaction.user.username}#${interaction.user.discriminator}`, iconURL: `${interaction.user.displayAvatarURL()}` },
                    description: `Server(s): \`${client.guilds.cache.size}\`\nChannel(s): \`${client.channels.cache.size}\`\nUser(s): \`${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}\`\nDiscord.js: \`v${Discord.version}\`\nNode: \`${process.version}\``,
                    footer: { text: 'Suivix helps your ad server 😁', iconURL: client.user.displayAvatarURL({ dynamic: true }) },
                    color: 0xFFFF00
                }],
                ephemeral: true
            }
            )
        }

        if (interaction.isSelectMenu()) {

            if (interaction.values?.[0] === "emoji1") {

                const emoji1 = "1️⃣"

                let data = await guildSchema.findOneAndUpdate({
                    ReactionEmoji: emoji1,
                    GuildId: interaction.guild.id
                });

                interaction.reply({
                    fr: {
                        embeds: [{
                            author: { name: `${interaction.user.username}#${interaction.user.discriminator}`, iconURL: `${interaction.user.displayAvatarURL()}` },
                            description: `L'émoji ${emoji1} à bien été enregistrer.`,
                            footer: { text: 'Suivix aide votre serveur publicitaire 😁', iconURL: client.user.displayAvatarURL({ dynamic: true }) },
                            color: 0xFFFF00
                        }],
                        ephemeral: true
                    }
                }[interaction.locale] || {
                    embeds: [{
                        author: { name: `${interaction.user.username}#${interaction.user.discriminator}`, iconURL: `${interaction.user.displayAvatarURL()}` },
                        description: `The emoji ${emoji1} has been saved.`,
                        footer: { text: 'Suivix helps your ad server 😁', iconURL: client.user.displayAvatarURL({ dynamic: true }) },
                        color: 0xFFFF00
                    }],
                    ephemeral: true
                }
                )

                data.save();
            }
            if (interaction.values?.[0] === "emoji2") {
                const emoji2 = "✏️"

                let data = await guildSchema.findOneAndUpdate({
                    ReactionEmoji: emoji2,
                    GuildId: interaction.guild.id
                });

                interaction.reply({
                    fr: {
                        embeds: [{
                            author: { name: `${interaction.user.username}#${interaction.user.discriminator}`, iconURL: `${interaction.user.displayAvatarURL()}` },
                            description: `L'émoji ${emoji2} à bien été enregistrer.`,
                            footer: { text: 'Suivix aide votre serveur publicitaire 😁', iconURL: client.user.displayAvatarURL({ dynamic: true }) },
                            color: 0xFFFF00
                        }],
                        ephemeral: true
                    }
                }[interaction.locale] || {
                    embeds: [{
                        author: { name: `${interaction.user.username}#${interaction.user.discriminator}`, iconURL: `${interaction.user.displayAvatarURL()}` },
                        description: `The emoji ${emoji2} has been saved.`,
                        footer: { text: 'Suivix helps your ad server 😁', iconURL: client.user.displayAvatarURL({ dynamic: true }) },
                        color: 0xFFFF00
                    }],
                    ephemeral: true
                }
                )

                data.save();
            }
        }
    }
};