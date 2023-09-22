import { Client } from "discord.js";
import { send } from "./utils/send";
import * as pm2 from 'pm2'; 

class Devcommands {
    private entity: Client;
    private Send: send;

    constructor(entity: Client, Send: send) {
        this.entity = entity;
        this.Send = Send;

        pm2.connect(function (err) {
            if (err) {
                console.error(err);
                process.exit(2);
                
            }
        });
    }

    async restart() {
        this.entity.on('message', async (message) => {
            try {
                const guildId = '1131117400985706538';
                const guild = this.entity.guilds.cache.get(guildId);

                if (!guild) {
                    return;
                }

                const user = message.author;
                const roleId = '1131896754070093954';
                const member = guild.members.cache.get(user.id);

                if (member && member.roles.cache.has(roleId)) {
                    await this.Send.sendUserMessage('restarting')
                    pm2.restart
                } else {
                    new Error
                    
                }
            } catch (e) {
                this.Send.sendUserMessage('this command is for devs only')
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

                const user = message.author;
                const roleId = '1131896754070093954';
                const member = guild.members.cache.get(user.id);

                if (member && member.roles.cache.has(roleId)) {
                    await this.Send.sendUserMessage('stoping')
                    pm2.stop
                } else {
                    new Error
                    
                }
            } catch (e) {
                this.Send.sendUserMessage('this command is for devs only')
            }
        });
    }
    

}
export {Devcommands}