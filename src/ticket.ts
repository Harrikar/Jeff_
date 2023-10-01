import { Client } from 'discord.js';

class Ticket{
    private entity: Client;

    constructor(entity: Client) {
        this.entity = entity;
    }
    async ticket(){
        try{
            this.send.sendUserMessage('this is the main ticket command use the /ticket open to open a ticket')
        }catch(e){
            this.send.sendUserMessage(`Unexpected error ${e}`)
        }
    }

    async open(){
        this.entity.on('message', async (message) => {
            try{
                
                const guild = message.guild;

                const channel = await guild.channels.create('new-channel', {
                    name:`${message.author} ticket `,
                    type: 'GUILD_TEXT', 
                    topic: '',
                    reason: `ticket channel for ${message.author}`
                });
                const ticketer = message.author;
                channel.send(`${message.author} list the reason for opening your ticket and an admin will be here to help you`)
    
            }catch(e){
                this.send.sendErrorEmbed(e)
            }
        })
    }
    async claim (channel){
        this.entity.on('message', async (message) => {
            try {
                const guildId = '1038964213961457674';
                const guild = this.entity.guilds.cache.get(guildId);

                if (!guild) {
                    return;
                }

                const user = message.author;
                const roleId = '1039114027198070864';
                const member = guild.members.cache.get(user.id);

                if (member && member.roles.cache.has(roleId)) {
                    channel.send(`${message.author} will help your ticket`)
                } else {
                    channel.send('you dont hace the perms for this')
                    
                }
            }catch(e){
                this.send.sendErrorEmbed(e)
            }
        })

    }

    async close(channel,ticketer) {
        this.entity.on('message', async (message) => {
            try {
                const guildId = '1038964213961457674';
                const guild = this.entity.guilds.cache.get(guildId);

                if (!guild) {
                    return;
                }

                const user = message.author;
                const roleId = '1039114027198070864';
                const member = guild.members.cache.get(user.id);

                if (member && member.roles.cache.has(roleId)) {
                    channel.send(`${message.author} closed your ticket`)
                } else {
                    channel.send('you dont hace the perms for this')
                    
                }
                ticketer.send(`your ticket was close by ${message.author}`)
            }catch(e){
                this.send.sendErrorEmbed(e)
            }
        })
    }

}


export {Ticket}
