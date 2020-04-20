//@ts-check
const Discord = require("discord.js");
const config = require("./config.json");
const bot = new Discord.Client({disableMentions: "everyone"});
const fs = require ("fs");
bot.commands = new Discord.Collection();

// Requires all dependencies

fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("No commands were found...")
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`)
        console.log(`${f} loaded!`)
        bot.commands.set(props.help.name, props);
    })
})

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online!`)
    bot.user.setActivity("prefix is '-'!", {type: "WATCHING"});
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = config.prefix;
    let messageArray = message.content.split(" ")
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot, message, args)

})


bot.on('guildMemberAdd', member => {
  
    const channel = /** @type {import('discord.js').TextChannel} */ (member.guild.channels.cache.find(ch => ch.name === 'bot-testing'));
  
    if (!channel) return;
  
    channel.send(`Welcome ${member}, make sure to read #rules`);

});
bot.login(config.token);