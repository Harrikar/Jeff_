import { Client, User,Embed } from 'discord.js';



class Send {
    private entity: Client;

    constructor(entity: Client) {
        this.entity = entity;
    }

    private async sendMessageUser(user: User, content: string | object) {
        try {
            await user.send(content);
        } catch (e) {
            await this.sendErrorsend(e);
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

    public async sendUsersend(send: object) {
        const user = this.entity.user;
        if (user) {
            await this.sendMessageUser(user, { send });
        } else {
            throw new Error("User is null or undefined.");
        }
    }

    public async sendErrorsend(error: any) {
        const user = this.entity.user;
        if (user) {
            await this.sendMessageUser(user, `An error occurred: ${error}`);
        } else {
            throw new Error("User is null or undefined.");
        }
    }
}

export { Send };
