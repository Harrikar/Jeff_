import {CommandTools} from "./utils/CommandTools";
import { Embeds } from "./utils/embed";
import { OfficialAPI } from 'earthmc';
import { Client, } from "discord.js";
class Nations{
   private entity: Client ;

  constructor(entity: Client) {
    this.entity = entity;
  }
    footer = 'Made by charis_k'

    async nation() {
        try {
            if (!this.entity.user) {
                throw new Error("User is null or undefined.");
            }
            this.entity.on("messasge" ,async ( message) =>  {
                if(message){
                    this.entity.user?.send(`${message.author} this is the main /nation command use the subcommands`)
                }
             })
            

        } catch (e) {
            this.entity.user?.send(`an error ${e} occured`)
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


            const embed = Embeds.embedBuilder(commandString,this.footer)
            
            
            embed.addFields(
                { name: 'Name', value: `${nation}`, inline: true },
                { name: "King", value: nations.King, inline: true },
                { name: "Balance",value: nations.balance, inline: true},
                { name:`Chunks ${chunks_worth}`,value:nations.Chunks,inline: true},
                { name: "Location", value: `[${Math.round(nations.spawn.x)}, ${Math.round(nations.spawn.z)}](${locationUrl})`, inline: true },
                { name:'Towns',value:nations.Towns.toString(),inline:true}, 
                { name:'Residents',value:nations.residents.toString(),inline:true},                   
                )
            this.entity.on('message', async (messasge)=> {
                const user = messasge.author
                user.send(embed)
            })

        } catch (e) {
            this.entity.on('message', async (message)=> {
                const user = message.author
                const embed = Embeds.errorEmbed(e,'Unexpected error')
                user.send({embed})
            })

            

        }
        
    }

    async reslist(nation: string, server: string = "aurora") {
        try {
            const commandString = `/nation reslist nation: ${nation} server: ${server}`;

            const nations = await OfficialAPI.nation(nation);
            const residentsString = CommandTools.listToString(nations.residents);
        
            const embed = Embeds.embedBuilder(commandString,this.footer)
            
            
            embed.addFields(
                { name: 'Name', value: `${nation}`, inline: true },
                { name: "Residents", value: residentsString, inline: true },
                         
                )
            this.entity.on('message', async (message)=> {
                const user = message.author
                user.send({embed})
            })
            
        } catch (e) {
            this.entity.on("message",async (message) => {
                const user = message.author
                const embed = Embeds.errorEmbed(e,this.footer)
                user.send({embed})
            })
        }
    }

    async ranklist(nation: string, server: string = "aurora") {
        try {
            const commandString = `/nation ranklist nation: ${nation} server: ${server}`;

            const nations = await OfficialAPI.nation(nation);

            

            for (const rank in nations.ranks) {
                if (nations.ranks) {
                    const rankString = CommandTools.listToString(nations.ranks[rank]);
                    const embed = Embeds.embedBuilder(commandString,this.footer);
                    embed.addFields(
                        {name:"Name",value:nation,inline:true},
                        {name:'Rank',value:rankString}
                    )
                    this.entity.on("message",async (message) => {
                        const user = message.author
                        user.send({embed})
                    })

                }
            }


        } catch (e) {
            this.entity.on("message",async (message) => {
                const user = message.author
                const embed = Embeds.errorEmbed(e,this.footer)
                user.send({embed})
            })
        }
    }

    async allylist(nation: string, server: string = "aurora") {
        try {
            const commandString = `/nation allylist nation: ${nation} server: ${server}`;

            const nations = await OfficialAPI.nation(nation);

            

            if (nations.allies.length !== 0) {
                const alliesString = CommandTools.listToString(nations.allies);
                const embed = Embeds.embedBuilder(commandString,this.footer);
                embed.addFields(
                    { name:'Name',value:nation,inline:true},
                    { name :'Allies' , value : `${alliesString}`,inline:true },
                )
                this.entity.on('message', async (message)=> {
                    const user = message.author
                    user.send({embed})
                })
                
            } else {
                const embed = Embeds.embedBuilder(commandString,this.footer);
                embed.addFields(
                    { name:`Nation ${nation} has not allies :/`,value:'',inline:true},
                )
                this.entity.on('message', async (message)=> {
                    const user = message.author
                    user.send({embed})
                })
                
            }

        } catch (e) {
            const embed = Embeds.errorEmbed(e,this.footer)
            this.entity.on('message', async (message)=> {
                const user = message.author
                user.send({embed})
            })
        }
    }

    async enemylist(nation: string, server: string = "aurora") {
        try {
            const commandString = `/nation enemylist nation: ${nation} server: ${server}`;

            const nations = await OfficialAPI.nation(nation);

            
            if (nations.enemies.length !== 0) {
                const enemiesString = CommandTools.listToString(nations.enemies);
                const embed = Embeds.embedBuilder(commandString,this.footer)

                embed.addFields(
                    {name:'Name',value:nation,inline:true},
                    {name:'Enemies',value:enemiesString,inline:true}
                )

            } else {
                const embed = Embeds.embedBuilder(commandString,this.footer)
                embed.addFields(
                     {name:"Nation has no enemies :)",value:'', inline:true}
                     )
                this.entity.on('message', async (message)=> {
                    const user = message.author
                    user.send({embed})
                })
            }

            

        } catch (e) {
            const embed = Embeds.errorEmbed(e,this.footer)
            this.entity.on('message', async (message)=> {
                const user = message.author
                user.send({embed})
            })
        }
    }

    async townlist(nation: string, server: string = "aurora") {
        try {
            const commandString = `/nation townlist nation: ${nation} server: ${server}`;

            const nations = await OfficialAPI.nation(nation);


            const townsString = CommandTools.listToString(nations.towns);

            const embed = Embeds.embedBuilder(commandString,this.footer);
            embed.addFields(
                {name:'Name',value:nation,inline:true},
                {name:'Towns',value:townsString,inline:true},
            )
            this.entity.on('message', async (message)=> {
                    const user = message.author
                    user.send({embed})
                })

        } catch (e) {
            const embed = Embeds.errorEmbed(e,this.footer)
            this.entity.on('message', async (message)=> {
                const user = message.author
                user.send({embed})
            })
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
                    const embed = Embeds.embedBuilder(commandString,this.footer)
                    embed.addFields(
                        {name:'Name',value:nation,inline:true},
                        {name:'Unallied naitons',value:unalliedString,inline:true}
                    )
                    this.entity.on('message', async (message)=> {
                        const user = message.author
                        user.send({embed})
                    })
                }

            } else {
                const embed = Embeds.embedBuilder(commandString,this.footer)

                embed.addFields(
                    {name:'Name',value:nation,inline:true},
                    {name:'Nation has no enemies :)',value:'',inline:true}
                )
                this.entity.on('message', async (message)=> {
                    const user = message.author
                    user.send({embed})
                })
            }

            

        } catch (e) {
            const embed = Embeds.errorEmbed(e,this.footer)
            this.entity.on('message', async (message)=> {
                const user = message.author
                user.send({embed})
            })
        }
    }

}
export {Nations}
