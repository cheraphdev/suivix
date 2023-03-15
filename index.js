const { Client, Collection, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const { readdirSync } = require("fs");
const config = require("./config");
const guildSchema = require("./models/guildSchema");
const messagesSchema = require("./models/messagesSchema");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
  restTimeOffset: 0,
  partials: ["USER", "CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION"],
})

client.commands = new Collection()

client.login(config.bot.token)

//|▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬| Commandes Handler |▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬|

const commandFiles = readdirSync("./commande").filter((file) =>
  file.endsWith(".js")
)
for (const file of commandFiles) {
  const command = require(`./commande/${file}`)
  client.commands.set(command.name, command)
}

//|▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

//|▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬| Event Handler |▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬|

const eventFiles = readdirSync("./event").filter((file) => file.endsWith(".js"))
for (const file of eventFiles) {
  const event = require(`./event/${file}`)
  if (event.once) {
    client.once(event.name, (...args) => event.execute(client, ...args))
  } else {
    client.on(event.name, (...args) => event.execute(client, ...args))
  }
}

//|▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

//|▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬| Anti Crash |▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬|

process.on("unhandledRejection", (error) => {
  if (error.code == 10062) return; // Unknown interaction
  console.log(`[ERREUR] ${error}`);
})

//|▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

//|▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬| Syncroniser la database |▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬|

client.on('guildCreate', (guild) => {
  let dataGuildCreate = new guildSchema({
    GuildId: guild.id,
    Prefix: config.bot.prefix
  });
  dataGuildCreate.save();

  const guildCreate = new EmbedBuilder()
    .setTitle("<:validate:1071571218316152892> Log guildCreate")
    .setDescription(`${client.user.username} à rejoint **${guild.name}** !\n\`\`\`MEMBRE(S) = ${guild.memberCount}\nGUILD = ${guild.id}\`\`\``)
    .setFooter({ text: 'Notre objectif et de vous accompagner dans la protection de votre serveur Discord ðŸ˜Š', iconURL: client.user.displayAvatarURL({ dynamic: true }) })
    .setColor(`${config.colors.default}`)

  client.channels.cache.get(`${config.channels.logsGuild}`).send({ embeds: [guildCreate] }).catch(error => {
    return;
  });
});

client.on('guildDelete', async (guild) => {
  const dataGuildDelete = await guildSchema.findOne({
    GuildId: guild.id
  }).catch((err) => { });
  if (!dataGuildDelete) return;
  await dataGuildDelete.delete();

  const dataMessagesDelete = await messagesSchema.findOne({
    GuildId: guild.id
  }).catch((err) => { });
  if (!dataMessagesDelete) return;
  await dataMessagesDelete.delete();

  const guildDelete = new EmbedBuilder()
    .setTitle("<:close:1071523654573236285> Log guildDelete")
    .setDescription(`${client.user.username} à quitter **${guild.name}** !\n\`\`\`MEMBRE(S) = ${guild.memberCount}\nGUILD = ${guild.id}\`\`\``)
    .setFooter({ text: 'Notre objectif et de vous accompagner dans la protection de votre serveur Discord ðŸ˜Š', iconURL: client.user.displayAvatarURL({ dynamic: true }) })
    .setColor(`${config.colors.default}`)

  client.channels.cache.get(`${config.channels.logsGuild}`).send({ embeds: [guildDelete] }).catch(error => {
    return;
  });
});

//|▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬