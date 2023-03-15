const { REST, Routes, ActivityType } = require("discord.js");
const Discord = require("discord.js");
const config = require("../config");
const mongoose = require("mongoose");
const fs = require("fs");

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {

        console.log(`[BOT] Je suis connecté à ${client.user.tag}.`)

        mongoose.connect(config.db.mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
        /*console.log(`[MONGODB] J'ai réussi à me connecter !`)*/

        client.user.setPresence({
            activities: [{ name: config.status, type: ActivityType.Watching }]
        });

        const commandsFiles = fs.readdirSync("./commande/slashCommands/").filter((file) => file.endsWith(".js"));
        for (const file of commandsFiles) {
            let { data } = require(`../commande/slashCommands/${file}`);
            data.name = file.replace(/\.[^.]*$/, "");
            client.application.commands.create(data).then(() => {
                console.log(`[SLASH] /${data.name} fonctionnel !`);
            }).catch(({ stack }) => {
                console.error(`[ERROR] La slashcommand "${data.name}" à rencontrer une erreur :`, stack);
            });
        };

        //|▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬| Supprimer les slashcommands |▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬|

        /*const rest = new REST({ version: '10' }).setToken(config.bot.token);

        rest.put(Routes.applicationCommands(client.user.id), { body: [] })
            .then(() => console.log('J\'ai bien supprimer toute les commandes slash !'))
            .catch(console.error);*/
    }
}