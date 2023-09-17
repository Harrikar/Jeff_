import { Client, MessageEmbed} from 'discord.js';
import {CommandTools} from "./utils/CommandTools";
import {send} from './utils/sends';
import { OfficialApi, Aurora } from 'earthmc';

class Nations{
   private entity: Client;
   private Send: send
  constructor(entity: Client,Send:send) {
    this.entity = entity;
    this.Send = Send;
  }

    async nation() {
        try {
            if (!this.entity.user) {
                throw new Error("User is null or undefined.");
            }

            await this.Send.sendUserMessage('This is the main /nation command. Use subcommands like `/nation search`, `/nation reslist`, etc.');

        } catch (e) {
            await this.Send.sendErrorEmbed(e);
        }
    }

    async search(nation: string = "random", server: string = "aurora") {
        try {
            const commandString = `/nation search nation: ${nation} server: ${server}`;

            if (!this.entity.user) {
                throw new Error("User is null or undefined.");
            }

            if (nation.toLowerCase() === "random") {
                const allNationsLookup = OfficialApi.nations.all()
                nation = String(CommandTools.random_choice(allNationsLookup.allNations));
            }
            

            const nations = OfficialApi.nation(nation);
            const locationUrl = `https://earthmc.net/map/${server}/?zoom=4&x=${nations.spawn.x}&z=${nations.spawn.z}`;

            const embed = new MessageEmbed()
                .setTitle(`\`${nations.strings.nation}\``)
                .setDescription(nations.strings.board)
                .setFooter(commandString)
                .setAuthor(this.entity.user);

            const chunks_worth = nations.Chunks * 16;
            const alliance = Aurora.alliance(nation);

            embed.addFields(
                { name: 'Name', value: nations.name, inline: true },
                { name: "King", value: nations.King, inline: true },
                { name: "Capital", value: nations.Capital, inline: true },
                { name: "Rank", value: nations.ranklist, inline: true },
                { name: "Location", value: `[${Math.round(nations.spawn.x)}, ${Math.round(nations.spawn.z)}](${locationUrl})`, inline: true },
                { name: "Alliance", value: alliance, inline: true },
                { name: "Residents", value: nations.stats.numResidents.toString(), inline: true },
                { name: "Towns", value: nations.stats.numTowns.toString(), inline: true },
                
                { name: `Chunks (${chunks_worth} worth of gold)`, value: nations.Chunks, inline: true },
            );

            await this.Send.sendUserEmbed(embed);

        } catch (e) {
            await this.Send.sendErrorEmbed(e);
        }
        
    }

    async reslist(nation: string, server: string = "aurora") {
        try {
            const commandString = `/nation reslist nation: ${nation} server: ${server}`;

            const nations = OfficialApi.nation(nation);

            const embed = new MessageEmbed()
                .setTitle(`\`${nations.strings.nation}'s Residents\``)
                .setFooter(commandString)
                .setAuthor(this.entity.user);

            const residentsString = CommandTools.listToString(nations.residents);

            embed.addField("Residents", "```" + residentsString.slice(0, 1018) + "```", true);

            await this.Send.sendUserEmbed(embed);

        } catch (e) {
            await this.Send.sendErrorEmbed(e);
        }
    }

    async ranklist(nation: string, server: string = "aurora") {
        try {
            const commandString = `/nation ranklist nation: ${nation} server: ${server}`;

            const nations = OfficialApi.nation(nation);

            const embed = new MessageEmbed()
                .setTitle(`\`${nations.rank}'s Ranked Residents\``)
                .setFooter(commandString)
                .setAuthor(this.entity.user);

            for (const rank in nations.ranks) {
                if (nations.ranks.hasOwnProperty(rank)) {
                    const rankString = CommandTools.listToString(nations.ranks[rank]);

                    embed.addField(rank.charAt(0).toUpperCase() + rank.slice(1), "```" + rankString.slice(0, 1022) + "```", true);
                }
            }

            await this.Send.sendUserEmbed(embed);

        } catch (e) {
            await this.Send.sendErrorEmbed(e);
        }
    }

    async allylist(nation: string, server: string = "aurora") {
        try {
            const commandString = `/nation allylist nation: ${nation} server: ${server}`;

            const nations = OfficialApi.nation(nation);

            const embed = new MessageEmbed()
                .setTitle(`\`${nations.allies}'s Allies\``)
                .setFooter(commandString)
                .setAuthor(this.entity.user);

            if (nations.allies.length !== 0) {
                const alliesString = CommandTools.listToString(nations.allies);

                embed.addField("Allies", "```" + alliesString.slice(0, 1018) + "```", true);

            } else {
                embed.addField("Allies", `${nations.allies} has no allies :)`, true);
            }

            await this.Send.sendUserEmbed(embed);

        } catch (e) {
            await this.Send.sendErrorEmbed(e);
        }
    }

    async enemylist(nation: string, server: string = "aurora") {
        try {
            const commandString = `/nation enemylist nation: ${nation} server: ${server}`;

            const nations = OfficialApi.nation(nation);

            const embed = new MessageEmbed()
                .setTitle(`\`${nations} Enemies\``) // Please replace with appropriate property
                .setFooter(commandString)
                .setAuthor(this.entity.user);

            if (nations.enemies.length !== 0) {
                const enemiesString = CommandTools.listToString(nations.enemies);

                embed.addField("Enemies", "```" + enemiesString.slice(0, 1018) + "```", true);

            } else {
                embed.addField("Enemies", `${nations.enemies} has no enemies :)`, true);
            }

            await this.Send.sendUserEmbed(embed);

        } catch (e) {
            await this.Send.sendErrorEmbed(e);
        }
    }

    async townlist(nation: string, server: string = "aurora") {
        try {
            const commandString = `/nation townlist nation: ${nation} server: ${server}`;

            const nations = OfficialApi.nation(nation);

            const embed = new MessageEmbed()
                .setTitle(`\`${nations.strings.nation}'s Towns\``)
                .setFooter(commandString)
                .setAuthor(this.entity.user);

            const townsString = CommandTools.listToString(nations.towns);

            embed.addField("Towns", "```" + townsString.slice(0, 1018) + "```", true);

            await this.Send.sendUserEmbed(embed);

        } catch (e) {
            await this.Send.sendErrorEmbed(e);
        }
    }

    async unallied(nation: string, server: string = "aurora") {
        try {
            const commandString = `/nation unallied nation: ${nation} server: ${server}`;

            const nations = OfficialApi.nation(nation);
            const allNationsLookup = OfficialApi.nation.all();

            const embed = new MessageEmbed()
                .setTitle(`\`${nations.strings.nation}'s Unallied Nations\``)
                .setFooter(commandString)
                .setAuthor(this.entity.user);

            const allyList = nations.allies;
            const allNations = allNationsLookup.allNations.slice();

            allNations.splice(allNations.indexOf(nations.strings.nation), 1);

            const unalliedList = allNations.filter(nation => !allyList.includes(nation));

            if (unalliedList.length !== 0) {
                for (let i = 0; i < unalliedList.length; i += 15) {
                    const unalliedString = unalliedList.slice(i, i + 15).join(' ');
                    embed.addField(i > 0 ? 'Unallied (Continued)' : 'Unallied', "```" + unalliedString + "```", true);
                }

            } else {
                embed.addField("Unallied", `${nations.unallied} has allied everyone :)`, true);
            }

            await this.Send.sendUserEmbed(embed);

        } catch (e) {
            await this.Send.sendErrorEmbed(e);
        }
    }

}
export {Nations}
