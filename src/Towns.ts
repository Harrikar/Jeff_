import { Client, MessageEmbed } from 'discord.js';
import {CommandTools} from "./utils/CommandTools";
import { OfficialApi, Aurora } from 'earthmc';
import {send} from './utils/sends'

class TownCommand {
    private entity: Client;
    private Send : send
    constructor(entity: Client,Send:send) {
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

            if (town.toLowerCase() === "random") {
                const allTownsLookup = OfficialApi.towns.all;
                town = String(CommandTools.random_choice(allTownsLookup.allTowns));
            }

            const towns = OfficialApi.town(town);
            const Mayor = OfficialApi.townsLookup.Mayor;

            const embed = new MessageEmbed()
                .setTitle(`\`${towns.strings.nation}\``)
                .setDescription(towns.strings.board)
                .setFooter(commandString)
                .setAuthor(this.entity.user);

            const chunks_worth = towns.Chunks.worth()
            const town_spawn_x = towns.spawn.x;
            const town_spawn_z = towns.spawn.z;
            const town_spawn = town_spawn_x + ',' + town_spawn_z ;
            embed.addFields(
                { name: 'Name', value: towns.name, inline: true },
                { name: "Mayor", value: Mayor, inline: true },
                { name:'Nation',value:towns.nation, inline: true},
                { name:'Balance',value:towns.balance, inline: true},
                { name:` Chunks (worth ${chunks_worth})`,value:towns.Chunks, inline: true},
                { name:' Resident',value:towns.numResidents, inline: true},
                { name:"Spawn",value:towns.town_spawn, inline: true}
            );

            await this.Send.sendUserEmbed(embed);

        } catch (e) {
            await this.Send.sendErrorEmbed(e);
        }
    }

    async ranklist(town: string, server: string = "aurora") {
        try {
            const commandString = `/nation ranklist town: ${town} server: ${server}`;

            const townsLookup = OfficialApi.town(town);

            const embed = new MessageEmbed()
                .setTitle(`\`${townsLookup.rank}'s Ranked Residents\``)
                .setFooter(commandString)
                .setAuthor(this.entity.user);

            for (const rank in townsLookup.ranks) {
                if (townsLookup.ranks.hasOwnProperty(rank)) {
                    const rankString = CommandTools.listToString(townsLookup.ranks[rank]);

                    embed.addField(rank.charAt(0).toUpperCase() + rank.slice(1), "```" + rankString.slice(0, 1022) + "```", true);
                }
            }

            await this.Send.sendUserEmbed(embed);

        } catch (e) {
            await this.Send.sendErrorEmbed(e);
        }
    }


}

export {TownCommand}
