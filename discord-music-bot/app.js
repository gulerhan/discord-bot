const Discord = require("discord.js");
const fs = require("fs");
const { Intents, Collection} = Discord;
const client = new Discord.Client({
    "intents": [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
})

//commands
client.commands = new Collection()

//command handler
const commands = fs.readdirSync("./commands");
commands.forEach(commandName => {
    const command = require(`./commands/${commandName}`)
    client.commands.set(command.name, command)
})

//events
const events = fs.readdirSync("./events")

//config file
const {token} = require ("./config.json")

client.once("ready", () =>{
    console.log("youtube hazır");

    client.user.setPresence({status:"dnd", activities: [{name: "Musıc", type:"LISTENING"}]})

    //events
    events.forEach(event =>{
        const eventFile = require(`./events/${event}`)
        eventFunc(client)
    })    
})

client.login(token)