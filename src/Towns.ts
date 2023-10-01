import { Client } from 'discord.js';
import { CommandTools } from "./utils/CommandTools";
import { OfficialAPI } from 'earthmc';
import {EmbedBuilder} from 'discord.js'
import { Embeds } from './utils/embed';
class TownCommand {
    private entity: Client;

    constructor(entity: Client, ) {
        this.entity = entity;
    }
    footer = 'made by charis_k'

    async town() {
        try {
            if (!this.entity.user) {
                throw new Error("User is null or undefined.");
            }

            this.entity.on("messasge" ,async (message) =>  {
                if(message){
                    const user = message.author
                    await user.send('main /town command use subcommands')
                }
            })
        } catch (e) {
            const embed = Embeds.errorEmbed(e,this.footer)
            this.entity.on("messasge" ,async (message) =>  {
                if(message){
                    const user = message.author
                    await user.send({embed})
                }
            })
        }
    }

    async search(town: string, server: string = "aurora") {
        try {
            const commandString = `/town search town: ${town} server: ${server}`;

            if (!this.entity.user) {
                throw new Error("User is null or undefined.");
            }

            const townlookup = await OfficialAPI.town(town)
            const locationUrl = `https://earthmc.net/map/${server}/?zoom=4&x=${townlookup.spawn.x}&z=${townlookup.spawn.z}`;
            const embed = Embeds.embedBuilder(commandString, this.footer)
            embed.addFields(
                {name:'Name',value:town,inline:true},
                {name:'Nation',value:townlookup.Nation,inline:true},
                {name:"Location", value: `[${Math.round(townlookup.spawn.x)}, ${Math.round(townlookup.spawn.z)}](${locationUrl})`, inline: true },
                {name:'Residents',value:townlookup.residents.toString(),inline:true},                   
                {name: "Balance",value: townlookup.balance, inline: true},
                {name:'Mayor',value:townlookup.Mayor,inline:true},
    
            )

        } catch (e) {
            const embed = Embeds.errorEmbed(e,this.footer)
            this.entity.on("messasge" ,async (message) =>  {
                if(message){
                    const user = message.author
                    await user.send({embed})
                }
            })
        }
    }

    async ranklist(town: string) {
        try {
            const commandString = `/nation ranklist town: ${town} `;

            const townsLookup = await OfficialAPI.town(town);

            for (const rank in townsLookup.ranks) {
                if (townsLookup.rank) {
                    const rankString = CommandTools.listToString(townsLookup.ranks[rank]);
                    const embed = Embeds.embedBuilder(commandString,this.footer)
                    embed.addFields(
                        {name:'Name',value:town,inline:true},
                        {name:'Nation',value:townsLookup.nation,inline:true},
                        {name:'Ranked',value:rankString,inline:true},
                    )
            this.entity.on("messasge" ,async (message) =>  {
                if(message){
                    const user = message.author
                    await user.send({embed})
                    }
                })
            }
        }

        } catch (e) {
            const embed = Embeds.errorEmbed(e,this.footer)
            this.entity.on("messasge" ,async (message) =>  {
                if(message){
                    const user = message.author
                    await user.send({embed})
                }
            })
        }
    }
}

export { TownCommand }
