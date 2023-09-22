import * as discord from 'discord.js'
import { send } from './utils/send'


class Join{
    private entity: discord.Client;
    private Send: send;

    constructor(entity: discord.Client, Send: send) {
        this.entity = entity;
        this.Send = Send;
    }
    async join(){
        this.entity.on('guildMemberAdd', (member) => {
            const guild = member.guild;
            const channel =  guild.channels.cache.find(channel => channel.name === 'requests');
            if (channel){
                this.Send.sendUserMessage(`${member} list your town and ign`)
            }

            
        });
    }
}


