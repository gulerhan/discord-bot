module.exports = {
    "name": "ban",
    "permission": "BAN_MEMBERS",
    execute(message){
        return message.channel.send({content: "Ban message"})
    }
}