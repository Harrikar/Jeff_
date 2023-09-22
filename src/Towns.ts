import { Client } from 'discord.js';
import { CommandTools } from "./utils/CommandTools";
import { OfficialApi } from 'earthmc';
import { send } from './utils/send';

class TownCommand {
    private entity: Client;
    private Send: send;

    constructor(entity: Client, Send: send) {
        this.entity = entity;
        this.Send = Send;
    }

    async town() {
        try {
            if (!this.entity.user) {
                throw new Error("User is null or undefined.");
            }

            await this.Send.sendUserMessage('This is the main /town command. ');

        } catch (e) {
            await this.Send.sendErrorEmbed(e);
        }
    }

    async search(town: string = "random", server: string = "aurora") {
        try {
            const commandString = `/town search town: ${town} server: ${server}`;

            if (!this.entity.user) {
                throw new Error("User is null or undefined.");
            }

            const townlookup = OfficialApi.town(town)
            const locationUrl = `https://earthmc.net/map/${server}/?zoom=4&x=${townlookup.spawn.x}&z=${townlookup.spawn.z}`;

            const fields = [
                {name:'Name',value:town,inline:true},
                {name:'Residents',value:townlookup.residents.toString(),inline:true},
                {name:`chunks`,value:townlookup.chunks.toString(),inline:true},
                {name:'worth',value:Number(townlookup.chunks * 16 ),inline:true},
                {name:'Nation',value:townlookup.nation,inline:true},
                {name:'Mayor',value:townlookup.Mayor,inline:true},
                {name:'Capital',value:townlookup.Capital,inline:true},
                { name: "Location", value: `[${Math.round(townlookup.spawn.x)}, ${Math.round(townlookup.spawn.z)}](${locationUrl})`, inline: true },
                {name:`Quoried by ${this.entity.user.username}`,inline:true},
                {name:'bot desinged and coded by charis_k',inline:true}

            ]

            await this.Send.sendUserEmbed(fields);

        } catch (e) {
            await this.Send.sendErrorEmbed(e);
        }
    }

    async ranklist(town: string, server: string = "aurora") {
        try {
            const commandString = `/nation ranklist town: ${town} server: ${server}`;

            const townsLookup = OfficialApi.town(town);

            let embedString = `**${townsLookup.rank}'s Ranked Residents**\n`;

            for (const rank in townsLookup.ranks) {
                if (townsLookup.ranks.hasOwnProperty(rank)) {
                    const rankString = CommandTools.listToString(townsLookup.ranks[rank]);

                    embedString += `${rank.charAt(0).toUpperCase() + rank.slice(1)}:\n\`\`\`${rankString.slice(0, 1022)}\`\`\`\n`;
                }
            }

            await this.Send.sendUserMessage(embedString);

        } catch (e) {
            await this.Send.sendErrorEmbed(e);
        }
    }
}

export { TownCommand }
