import { Client, User, Message } from 'discord.js';

class send {
    private entity: Client;

    constructor(entity: Client) {
        this.entity = entity;
    }

    private async sendMessageUser(user: User, content: string | object) {
        try {
            await user.send(content);
        } catch (e) {
            await this.sendErrorEmbed(e);
        }
    }

    public async sendUserMessage(content: string) {
        const user = this.entity.user;
        if (user) {
            await this.sendMessageUser(user, content);
        } else {
            throw new Error("User is null or undefined.");
        }
    }

    public async sendUserEmbed(embed: object) {
        const user = this.entity.user;
        if (user) {
            await this.sendMessageUser(user, { embed });
        } else {
            throw new Error("User is null or undefined.");
        }
    }

    public async sendErrorEmbed(error: any) {
        const user = this.entity.user;
        if (user) {
            await this.sendMessageUser(user, `An error occurred: ${error}`);
        } else {
            throw new Error("User is null or undefined.");
        }
    }
}

export { send };
