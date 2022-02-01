const { Collection } = require("discord.js")
const { date } = require("zod")

const cooldowns = new Collection()

module.exports = (command, author_id,) => {

        if(cooldowns.has(command.name) == false){
            cooldowns.set(command.name, new Collection())
        }

        const now = Date.now()
        const timestamps = cooldowns.get(command.name)
        const cooldownAmount = (command.cooldown || 3) * 1000

        //cooldown control
        if(timestamps.has(author_id)){
            const expirationTime = timestamps.get(author_id) + cooldownAmount

            if(now < expirationTime){
                const timeLeft = parseInt((expirationTime - now) / 1000).toFixed()
                return timeLeft
            }
            return false 
        }

        //set cooldown
        timestamps.set(author_id, now);
        setTimeout(() => {
            timestamps.delete(author_id)
        }, cooldownAmount);
        
        return false
}