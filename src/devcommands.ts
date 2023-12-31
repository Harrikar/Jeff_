import { Client } from "discord.js";
import { Send } from "./utils/send";
import * as pm2 from 'pm2'; 

class Devcommands {
    private entity: Client;
    private send: Send;

    constructor(entity: Client, send: Send) {
        this.entity = entity;
        this.send = send;

    }

    async restart() {
        this.entity.on('message', async (message) => {
            try {
                const guildId = '1131117400985706538';
                const guild = this.entity.guilds.cache.get(guildId);

                if (!guild) {
                    return;
                }

                const user = this.entity?.user
                const roleId = '1131896754070093954';
                if (user){
                    const user_id = user.id
                    const member = guild.members.cache.get(user_id);
                    if (member && member.roles.cache.has(roleId)) {
                        await this.send.sendUserMessage('restarting')
                        pm2.restart
                    } else {
                        this.send.sendUserMessage('this command is for devs only')

                        }
                    }
                
            } catch (e) {
                throw new Error
                
            }
        });
    }
    async stop() {
        this.entity.on('message', async (message) => {
            try {
                const guildId = '1131117400985706538';
                const guild = this.entity.guilds.cache.get(guildId);

                if (!guild) {
                    return;
                }

                const user = this.entity?.user
                const roleId = '1131896754070093954';
                if (user){
                    const member = guild.members.cache.get(user.id);

                    if (member && member.roles.cache.has(roleId)) {
                        await this.send.sendUserMessage('stoping')
                        pm2.stop
                    } else {
                        this.send.sendUserMessage('this command is for devs only')
                        
                    }
                }
            } catch (e) {
                throw new Error
            }
        });
    }
    

}
export {Devcommands}