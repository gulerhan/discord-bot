const { prefix } = require("../config.json")
const cooldown = require("../utils/cooldown")
module.exports = client => {

    client.on("messageCreate", message => {

    if(message.content.startsWith(prefix) == false) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/)
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName)
        if(command == undefined) return;

        //permission control
        if(command.permission && message.member.permissions.has(command.permission) == false) return message.channel.send({content:`Bu komutu kullanmak için ${command.permission} yetkisine ihtiyacınız var !`})

        //cooldown control
        const cooldownTime = cooldown(command, message.author.id)
        if(cooldownTime) return message.channel.send({content: `Lütfen bu komutu tekrar kullanmak için ${cooldownTime} saniye bekleyiniz.`})

        try{
            command.execute(message)
        }catch(e){
            console.log(e)
            return message.channel.send({content: "Bu komut şu anda hatalı!"})
        }
    })
}