import { Client, MessageEmbed } from 'discord.js';
import {Embeds} from './Embeds';
class send{
    private entity: Client;

    constructor(entity: Client) {
        this.entity = entity;
    }

    public async sendUserMessage(content: string) {
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


  public async sendUserEmbed(embed: MessageEmbed) {
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

  public async sendErrorEmbed(error: any) {
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
}
export {send}
