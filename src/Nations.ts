import { Client} from 'discord.js';
import {CommandTools} from "./utils/CommandTools";
import {send} from './utils/send';
import {  Aurora } from 'earthmc';
import {OfficialApi} from 'earthmc'; 


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

            

            const chunks_worth = nations.Chunks * 16;
            const alliance = Aurora.alliance(nation);

            const fields= [
                {name:'',value:this.entity.user.avatarURL,inline:true},
                { name: 'Name', value: nations.name, inline: true },
                { name: "King", value: nations.King, inline: true },
                { name: "Capital", value: nations.Capital, inline: true },
                { name: "Rank", value: nations.ranklist, inline: true },
                { name: "Location", value: `[${Math.round(nations.spawn.x)}, ${Math.round(nations.spawn.z)}](${locationUrl})`, inline: true },
                { name: "Alliance", value: alliance, inline: true },
                { name: "Residents", value: nations.stats.numResidents.toString(), inline: true },
                { name: "Towns", value: nations.stats.numTowns.toString(), inline: true },
                
                { name: `Chunks (${chunks_worth} worth of gold)`, value: nations.Chunks, inline: true },
                {name:`Quoried by ${this.entity.user.username}`,inline:true},
                {name:'bot desinged and coded by charis_k',inline:true}
            ]

            await this.Send.sendUserEmbed(fields);

        } catch (e) {
            await this.Send.sendErrorEmbed(e);
        }
        
    }

    async reslist(nation: string, server: string = "aurora") {
        try {
            const commandString = `/nation reslist nation: ${nation} server: ${server}`;

            const nations = OfficialApi.nation(nation);

            

            const residentsString = CommandTools.listToString(nations.residents);

            const fields = ["Residents", "```" + residentsString.slice(0, 1018) + "```", true]

            await this.Send.sendUserEmbed(fields);

        } catch (e) {
            await this.Send.sendErrorEmbed(e);
        }
    }

    async ranklist(nation: string, server: string = "aurora") {
        try {
            const commandString = `/nation ranklist nation: ${nation} server: ${server}`;

            const nations = OfficialApi.nation(nation);

            

            for (const rank in nations.ranks) {
                if (nations.ranks.hasOwnProperty(rank)) {
                    const rankString = CommandTools.listToString(nations.ranks[rank]);

                    const fields = [rank.charAt(0).toUpperCase() + rank.slice(1), "```" + rankString.slice(0, 1022) + "```", true]
                    await this.Send.sendUserEmbed(fields);
                }
            }

            

        } catch (e) {
            await this.Send.sendErrorEmbed(e);
        }
    }

    async allylist(nation: string, server: string = "aurora") {
        try {
            const commandString = `/nation allylist nation: ${nation} server: ${server}`;

            const nations = OfficialApi.nation(nation);

            

            if (nations.allies.length !== 0) {
                const alliesString = CommandTools.listToString(nations.allies);

                const fields = ["Allies", "```" + alliesString.slice(0, 1018) + "```", true]
                await this.Send.sendUserEmbed(fields);
            } else {
                const fields = ["Allies", `${nations.allies} has no allies :)`, true]
                await this.Send.sendUserEmbed(fields);
            }

           

        } catch (e) {
            await this.Send.sendErrorEmbed(e);
        }
    }

    async enemylist(nation: string, server: string = "aurora") {
        try {
            const commandString = `/nation enemylist nation: ${nation} server: ${server}`;

            const nations = OfficialApi.nation(nation);

            
            if (nations.enemies.length !== 0) {
                const enemiesString = CommandTools.listToString(nations.enemies);

                const fields = ["Enemies", "```" + enemiesString.slice(0, 1018) + "```", true];
                await this.Send.sendUserEmbed(fields);

            } else {
                const fields = ["Enemies", `${nations.enemies} has no enemies :)`, true];
                await this.Send.sendUserEmbed(fields);
            }

            

        } catch (e) {
            await this.Send.sendErrorEmbed(e);
        }
    }

    async townlist(nation: string, server: string = "aurora") {
        try {
            const commandString = `/nation townlist nation: ${nation} server: ${server}`;

            const nations = OfficialApi.nation(nation);


            const townsString = CommandTools.listToString(nations.towns);

            const fields = ["Towns", "```" + townsString.slice(0, 1018) + "```", true]

            await this.Send.sendUserEmbed(fields);

        } catch (e) {
            await this.Send.sendErrorEmbed(e);
        }
    }

    async unallied(nation: string, server: string = "aurora") {
        try {
            const commandString = `/nation unallied nation: ${nation} server: ${server}`;

            const nations = OfficialApi.nation(nation);
            const allNationsLookup = OfficialApi.nation.all();

            

            const allyList = nations.allies;
            const allNations = allNationsLookup.allNations.slice();

            allNations.splice(allNations.indexOf(nations.strings.nation), 1);

            const unalliedList = allNations.filter(nation => !allyList.includes(nation));

            if (unalliedList.length !== 0) {
                for (let i = 0; i < unalliedList.length; i += 15) {
                    const unalliedString = unalliedList.slice(i, i + 15).join(' ');
                    const fields = [i > 0 ? 'Unallied (Continued)' : 'Unallied', "```" + unalliedString + "```", true]
                    await this.Send.sendUserEmbed(fields);
                }

            } else {
                const fields = ["Unallied", `${nations.unallied} has allied everyone :)`, true]
                await this.Send.sendUserEmbed(fields);
            }

            

        } catch (e) {
            await this.Send.sendErrorEmbed(e);
        }
    }

}
export {Nations}
