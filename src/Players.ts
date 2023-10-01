import { Client} from 'discord.js';
import { CommandTools } from './utils/CommandTools';
import { OfficialAPI } from 'earthmc';
import { Embeds } from './utils/embed'

class playercommand {
    private entity: Client;

    constructor(entity: Client) {
        this.entity = entity;
        
    }
    footer = 'made by charis_k'
    async player() {
        try {
            if (!this.entity.user) {
                throw new Error("User is null or undefined.");
            }
            this.entity.on("messasge" ,async (message) =>  {
                if(message){
                    const user = message.author
                    await user.send('main /player command use subcommands')
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

    async search(player: string) {
        try {
            const server = 'aurora';
            const commandString = `/player search : ${player} server: ${server}`;

            if (!this.entity.user) {
                throw new Error("User is null or undefined.");
            }


            const players = await OfficialAPI.resident(player);
            const embed = Embeds.embedBuilder(commandString,this.footer)
            embed.addFields (
                { name:'Name',value:player,inline:true},
                { name:"Balance",value:String(players.balance),inline:true},
                { name:'Town',value:String(players.town),inline:true},
                { name:'Nation',value:String(players.nation),inline:true},
                { name:'Town Rank',value:String(players.townRanks),inline:true},
                { name:'Nation Rank',value:String(players.nationRanks),inline:true},
                
            )   
            this.entity.on("messasge" ,async (message) =>  {
                if(message){
                    const user = message.author
                    await user.send({embed})
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

    async friendlist(player: string ) {
        try {
            const server = 'aurora';
            const commandString = `/player friendlist player: ${player} server: ${server}`;

            if (!this.entity.user) {
                throw new Error("User is null or undefined.");
            }
            const playersLookup = await OfficialAPI.resident(player);

            const embed = Embeds.embedBuilder(commandString, this.footer)
                .addFields (
                    { name:'Name',value:player,inline:true},
                    { name:"Friends",value:String(playersLookup.friends),inline:true},
                    
                )   

                this.entity.on("messasge" ,async (message) =>  {
                    if(message){
                        const user = message.author
                        await user.send({embed})
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

    async rank(player: string ) {
        try {
            const server = 'aurora';
            const commandString = `/player rank ${player} `;

            if (!this.entity.user) {
                throw new Error("User is null or undefined.");
            }

            const players = await OfficialAPI.resident(player);
            
            const embed =Embeds.embedBuilder(commandString,this.footer)
                .addFields (
                    { name:'Name',value:player,inline:true},
                    { name:"Town Rank",value:String(players.townRanks),inline:true},
                    { name:"Nation Rank",value:String(players.nationRanks),inline:true}
                )   
                this.entity.on("messasge" ,async (message) =>  {
                    if(message){
                        const user = message.author
                        await user.send({embed})
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
}

export {
    playercommand
}
