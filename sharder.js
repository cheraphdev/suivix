const { ShardingManager } = require("discord.js");

const manager = new ShardingManager("./index.js", {
    totalShards: "auto",
    token: require("./config").bot.token
});
console.log(String.raw`

____        _       _      
/ ___| _   _(_)_   _(_)_  __
\___ \| | | | \ \ / / \ \/ /
 ___) | |_| | |\ V /| |>  < 
|____/ \__,_|_| \_/ |_/_/\_\
  Créer par koyaim#6290 !                   

`)

manager.spawn();
