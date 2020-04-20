//@ts-check
const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    message.reply(message.author.displayAvatarURL());
    
}

module.exports.help = {
    name: "avatar",
    description: "show your profile picture"
    
}