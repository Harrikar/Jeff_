import { Client,MessageEmbed} from 'discord.js';
import {CommandTools} from "./utils/CommandTools";
import {Embeds }from './utils/Embeds'; 
import {Aurora} from 'earthmc';

class Gps {
    private entity: Client;

    constructor(entity: Client) {
        this.entity = entity;
    }
    private async sendUserEmbed(embed: MessageEmbed) {
		try {
			if (this.entity.user) {
				await this.entity.user.send({ embed });
			} else {
				throw new Error("User is null or undefined.");
			}
		} catch (e) {
			await this.sendErrorEmbed(e);
		}
	}
	
	private async sendErrorEmbed(error: any) {
		const embed = Embeds.errorEmbed('An error occurred while processing your request.', error);
		try {
			if (this.entity.user) {
				await this.entity.user.send({ embed });
			} else {
				throw new Error("User is null or undefined.");
			}
		} catch (e) {
			console.error("An error occurred while sending an error message:", e);
		}
	}
    private async sendUserMessage(content: string) {
        try {
            if (this.entity.user) {
                await this.entity.user.send(content);
            } else {
                throw new Error("User is null or undefined.");
            }
        } catch (e) {
            await this.sendErrorEmbed(e);
        }
    }

    async find(x:'',y:'',route:string){
        try {
            if (!this.entity.user) {
                throw new Error("User is null or undefined.");
            }
            const server = 'aurora'
            const commandString = `/find : ${x} and ${y} server: ${server}`;
            
            await this.sendUserMessage('This is the main /player command. Use subcommands like `/player search`.');

            if (route === 'fastest'){

                const route= Aurora.gps.fastest(x,y)
            }
            else if (route === 'safest'){
                const route = Aurora.gps.safest(x,y)
            }

            const embed = new MessageEmbed()
                    .setTitle(`\`${route}Route you chose`)
                    .setFooter(commandString)
                    .setAuthor(this.entity.user);
                    embed.addFields(
                        {name: 'Closest spawn', value: route, inline: true },
                    );
                    await this.sendUserEmbed(embed);

        } catch (e) {
            await this.sendErrorEmbed(e);
        }
    }


}
export default Gps;