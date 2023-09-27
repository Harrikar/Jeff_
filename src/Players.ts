import { Client, Colors } from 'discord.js';
import { CommandTools } from './utils/CommandTools';
import { Send } from './utils/send';
import { EmbedBuilder } from 'discord.js';
import { OfficialAPI,Aurora } from 'earthmc';

class playercommand {
    private entity: Client;
    private send: Send;

    constructor(entity: Client, send: Send) {
        this.entity = entity;
        this.send = send;
    }

    async player() {
        try {
            if (!this.entity.user) {
                throw new Error("User is null or undefined.");
            }

            await this.send.sendUserMessage(`This is the main /player command. Use subcommands like /player search`);
        } catch (e) {
            await this.send.sendErrorsend(e);
        }
    }

    async search(player: string) {
        try {
            const server = 'aurora';
            const commandString = `/player search : ${player} server: ${server}`;

            if (!this.entity.user) {
                throw new Error("User is null or undefined.");
            }


            const players = await OfficialAPI.resident(player);
            const embed = new EmbedBuilder()
                .setAuthor(this.entity.user.displayName.toString)
                .setDescription(commandString)
                .setColor('DarkGreen')
                .setTitle(`info for ${player} player`)
                .addFields (
                    { name:'Name',value:player,inline:true},
                    { name:"Balance",value:String(players.balance),inline:true},
                    { name:'Town',value:String(players.town),inline:true},
                    { name:'Nation',value:String(players.nation),inline:true},
                    { name:'Town Rank',value:String(players.townRanks),inline:true},
                    { name:'Nation Rank',value:String(players.nationRanks),inline:true},
                    
                )   

            await this.send.sendUsersend( embed);

        } catch (e) {
            await this.send.sendErrorsend(e);
        }
    }

    async friendlist(player: string ) {
        try {
            const server = 'aurora';
            const commandString = `/player friendlist player: ${player} server: ${server}`;

            if (!this.entity.user) {
                throw new Error("User is null or undefined.");
            }
            const playersLookup = await OfficialAPI.resident(player);

            const embed = new EmbedBuilder()
                .setAuthor(this.entity.user.displayName.toString)
                .setDescription(commandString)
                .setColor('DarkGreen')
                .setTitle(`info for ${player} player`)
                .addFields (
                    { name:'Name',value:player,inline:true},
                    { name:"Friends",value:String(playersLookup.friends),inline:true},
                    
                )   

            await this.send.sendUsersend(embed);

        } catch (e) {
            await this.send.sendErrorsend(e);
        }
    }

    async rank(player: string ) {
        try {
            const server = 'aurora';
            const commandString = `/player rank ${player} `;

            if (!this.entity.user) {
                throw new Error("User is null or undefined.");
            }

            const players = await OfficialAPI.resident(player);
            
            const embed = new EmbedBuilder()
                .setAuthor(this.entity.user.displayName.toString)
                .setDescription(commandString)
                .setColor('DarkGreen')
                .setTitle(`info for ${player} player`)
                .addFields (
                    { name:'Name',value:player,inline:true},
                    { name:"Town Rank",value:String(players.townRanks),inline:true},
                    { name:"Nation Rank",value:String(players.nationRanks),inline:true}
                    
                )   


            await this.send.sendUsersend(embed);

        } catch (e) {
            await this.send.sendErrorsend(e);
        }
    }
}

export {
    playercommand
}
