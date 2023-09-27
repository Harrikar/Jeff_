import {CommandTools} from "./utils/CommandTools";
import {Send} from './utils/send';
import { OfficialAPI } from 'earthmc';
import { EmbedBuilder,Embed ,Client, Options} from "discord.js";

class Nations{
   private entity: Client ;
   private send: Send

  constructor(entity: Client,send:Send) {
    this.entity = entity;
    this.send = send;
  }

    async nation() {
        try {
            if (!this.entity.user) {
                throw new Error("User is null or undefined.");
            }

            await this.send.sendUserMessage('This is the main /nation command. Use subcommands like `/nation search`, `/nation reslist`, etc.');

        } catch (e) {
            await this.send.sendErrorsend(e);
        }
    }

    async search(nation: string , server: string = "aurora") {
        try {
            const commandString = `/nation search nation: ${nation} server: ${server}`;

            if (!this.entity.user) {
                throw new Error("User is null or undefined.");
            }
            


            const nations = await OfficialAPI.nation(nation)
            
            const locationUrl = `https://earthmc.net/map/${server}/?zoom=4&x=${nations.spawn.x}&z=${nations.spawn.z}`;
            

            const chunks_worth = nations.Chunks * 16;


            const embed = new EmbedBuilder()
                .setAuthor(this.entity.user.displayName.toString)
                .setDescription(commandString)
                .setColor('DarkGreen')
                .setTitle(`info for ${nation} nation`)
            embed.addFields(
                { name: 'Name', value: nation, inline: true },
                { name: "King", value: nations.King, inline: true },
                { name: "Balance",value: nations.balance, inline: true},
                { name:`Chunks ${chunks_worth}`,value:nations.Chunks,inline: true},
                { name: "Location", value: `[${Math.round(nations.spawn.x)}, ${Math.round(nations.spawn.z)}](${locationUrl})`, inline: true },
                { name:'Towns',value:nations.Towns.toString(),inline:true}, 
                { name:'Residents',value:nations.residents.toString(),inline:true},                   
                )
                
            await this.send.sendUsersend(embed);

        } catch (e) {
            await this.send.sendErrorsend(e);
        }
        
    }

    async reslist(nation: string, server: string = "aurora") {
        try {
            const commandString = `/nation reslist nation: ${nation} server: ${server}`;

            const nations = await OfficialAPI.nation(nation);
            const residentsString = CommandTools.listToString(nations.residents);

            if (!this.entity.user){
                this.send.sendUserMessage('Not possible to identify user')
            }
            else{
                const embed = new EmbedBuilder()
                    .setAuthor(this.entity.user.displayName.toString)
                    .setDescription(commandString)
                    .setColor('DarkGreen')
                    .setTitle(`info for ${nation} nation`)
                    .addFields(
                        { name:'Residents',value:residentsString,inline:true}
                        )
                await this.send.sendUsersend(embed);

            }

        } catch (e) {
            await this.send.sendErrorsend(e);
        }
    }

    async ranklist(nation: string, server: string = "aurora") {
        try {
            const commandString = `/nation ranklist nation: ${nation} server: ${server}`;

            const nations = await OfficialAPI.nation(nation);

            

            for (const rank in nations.ranks) {
                if (nations.ranks.hasOwnProperty(rank)) {
                    const rankString = CommandTools.listToString(nations.ranks[rank]);

                    const fields = [rank.charAt(0).toUpperCase() + rank.slice(1), "```" + rankString.slice(0, 1022) + "```", true]
                    await this.send.sendUsersend(fields);
                }
            }

            

        } catch (e) {
            await this.send.sendErrorsend(e);
        }
    }

    async allylist(nation: string, server: string = "aurora") {
        try {
            const commandString = `/nation allylist nation: ${nation} server: ${server}`;

            const nations = await OfficialAPI.nation(nation);

            

            if (nations.allies.length !== 0) {
                const alliesString = CommandTools.listToString(nations.allies);
                const embed = new EmbedBuilder()
                if (this.entity.user){
                    embed.setAuthor(this.entity.user.displayName.toString)}
                
                embed.setDescription(commandString)
                embed.setColor('DarkGreen')
                embed.setTitle(`info for ${nation} nation`)
                embed.addFields(
                    { name:'Allies',value:alliesString,inline:true}
                    )

            await this.send.sendUsersend(embed);
                
            } else {
                const embed = new EmbedBuilder()
                    if (this.entity.user){
                        embed.setAuthor(this.entity.user.displayName.toString)}
                    
                    embed.setDescription(commandString)
                    embed.setColor('DarkGreen')
                    embed.setTitle(`info for ${nation} nation`)
                    embed.addFields(
                        { name:'This nation has no allied nations :/',value:'',inline:true}
                        )

                await this.send.sendUsersend(embed);
            }

           

        } catch (e) {
            await this.send.sendErrorsend(e);
        }
    }

    async enemylist(nation: string, server: string = "aurora") {
        try {
            const commandString = `/nation enemylist nation: ${nation} server: ${server}`;

            const nations = await OfficialAPI.nation(nation);

            
            if (nations.enemies.length !== 0) {
                const enemiesString = CommandTools.listToString(nations.enemies);

                const fields = ["Enemies", "```" + enemiesString.slice(0, 1018) + "```", true];
                await this.send.sendUsersend(fields);

            } else {
                const fields = ["Enemies", `${nations.enemies} has no enemies :)`, true];
                await this.send.sendUsersend(fields);
            }

            

        } catch (e) {
            await this.send.sendErrorsend(e);
        }
    }

    async townlist(nation: string, server: string = "aurora") {
        try {
            const commandString = `/nation townlist nation: ${nation} server: ${server}`;

            const nations = await OfficialAPI.nation(nation);


            const townsString = CommandTools.listToString(nations.towns);

            const fields = ["Towns", "```" + townsString.slice(0, 1018) + "```", true]

            await this.send.sendUsersend(fields);

        } catch (e) {
            await this.send.sendErrorsend(e);
        }
    }

    async unallied(nation: string, server: string = "aurora") {
        try {
            const commandString = `/nation unallied nation: ${nation} server: ${server}`;

            const nations = await OfficialAPI.nation(nation);
            

        
            const unalliedList = nations.unalliedList

            if (unalliedList.length !== 0) {
                for (let i = 0; i < unalliedList.length; i += 15) {
                    const unalliedString = unalliedList.slice(i, i + 15).join(' ');
                    const fields = [i > 0 ? 'Unallied (Continued)' : 'Unallied', "```" + unalliedString + "```", true]
                    await this.send.sendUsersend(fields);
                }

            } else {
                const fields = ["Unallied", `${nations.unallied} has allied everyone :)`, true]
                await this.send.sendUsersend(fields);
            }

            

        } catch (e) {
            await this.send.sendErrorsend(e);
        }
    }

}
export {Nations}
