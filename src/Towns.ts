import { Client } from 'discord.js';
import { CommandTools } from "./utils/CommandTools";
import { OfficialAPI } from 'earthmc';
import { Send } from './utils/send';
import {EmbedBuilder} from 'discord.js'
class TownCommand {
    private entity: Client;
    private send: Send;

    constructor(entity: Client, send: Send) {
        this.entity = entity;
        this.send = send;
    }

    async town() {
        try {
            if (!this.entity.user) {
                throw new Error("User is null or undefined.");
            }

            await this.send.sendUserMessage('This is the main /town command. ');

        } catch (e) {
            await this.send.sendErrorsend(e);
        }
    }

    async search(town: string = "random", server: string = "aurora") {
        try {
            const commandString = `/town search town: ${town} server: ${server}`;

            if (!this.entity.user) {
                throw new Error("User is null or undefined.");
            }

            const townlookup = await OfficialAPI.town(town)
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

            await this.send.sendUsersend(fields);

        } catch (e) {
            await this.send.sendErrorsend(e);
        }
    }

    async ranklist(town: string) {
        try {
            const commandString = `/nation ranklist town: ${town} `;

            const townsLookup = await OfficialAPI.town(town);


            for (const rank in townsLookup.ranks) {
                if (townsLookup.ranks.hasOwnProperty(rank)) {
                    const rankString = CommandTools.listToString(townsLookup.ranks[rank]);
                    const embed = new EmbedBuilder()
                        if (this.entity.user){
                            embed.setAuthor(this.entity.user.username.toString)
                        }
                        embed.setColor('DarkGreen')
                        embed.setDescription(commandString)
                        .setImage(String(this.entity.user?.avatarURL))
                        embed.addFields(
                            {name:'Ranklist',value:rankString,inline:true}
                        )
                        await this.send.sendUsersend(embed);
                }
            }

        } catch (e) {
            await this.send.sendErrorsend(e);
        }
    }
}

export { TownCommand }
