import * as discord from 'discord.js'
import { Send } from './utils/send'


class Join{
    private entity: discord.Client;
    private send: Send;

    constructor(entity: discord.Client, send: Send) {
        this.entity = entity;
        this.send = send;
    }
    async join(){
        this.entity.on('guildMemberAdd', (member) => {
            const guild = member.guild;
            const channel =  guild.channels.cache.find(channel => channel.name === 'requests');
            if (channel){
                this.send.sendUserMessage(`${member} list your town and ign`)
            }

            
        });
    }
}


