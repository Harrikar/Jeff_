import  {Client,MessageEmbed}  from 'discord.js';
import {CommandTools} from './utils/CommandTools';
import  {OfficialApi} from 'earthmc';
import {send} from './utils/sends';


class playercommand{

    private entity: Client;
    private Send : send

    constructor(entity: Client,Send:send) {
        this.entity = entity;
        this.Send = Send;
    }

    
    async player() {
        try {
            if (!this.entity.user) {
                throw new Error("User is null or undefined.");
            }

            await this.Send.sendUserMessage(`This is the main /player command. Use subcommands like /player search`);

        } catch (e) {
            await this.Send.sendErrorEmbed(e);
        }

    
    }

    async search(player: string = "random"){
        try{

            
            const server = 'aurora'
            const commandString = `/player search : ${player} server: ${server}`;
            if (!this.entity.user) {
                throw new Error("User is null or undefined.");
            }

            if (player.toLowerCase() === "random") {
                const allPlayerLookup = OfficialApi.players.all;
                player = String(CommandTools.random_choice(allPlayerLookup.allPlayers));
            }

            const players = OfficialApi.player(player);
            const embed = new MessageEmbed()
                .setTitle(`\`${players.strings.nation}\``)
                .setFooter(commandString)
                .setAuthor(this.entity.user);
                embed.addFields(
                    {name: 'Name', value: players.name, inline: true },
                    {name:'Surname',value: players.surname,inline: true},
                    {name:'Balance',value:players.balance, inline: true},
                    {name:'Nation',value:players.nation, inline: true},
                    {name:'Town',value:players.town, inline: true},
                    {name:'Nation rank',value:players.nationrank, inline: true},
                    {name:'Town rank',value:players.townrank, inline: true},
                );
                await this.Send.sendUserEmbed(embed);

        }   
        catch (e) {
            await this.Send.sendErrorEmbed(e);

        }
        
    }
    async friendlist(player:string = 'random'){
        try{

            
            const server = 'aurora'
            const commandString = `/player friendlist player: ${player} server: ${server}`;
            if (!this.entity.user) {
                throw new Error("User is null or undefined.");
            }

            if (player.toLowerCase() === "random") {
                const allPlayerLookup = OfficialApi.players.all;
                player = String(CommandTools.random_choice(allPlayerLookup.allPlayers));
            }

            const playersLookup = OfficialApi.player(player);
            const embed = new MessageEmbed()
                .setTitle(`\`${playersLookup.strings.nation}\``)
                .setFooter(commandString)
                .setAuthor(this.entity.user);
                embed.addFields(
                    {name: 'Name', value: playersLookup.name, inline: true },
                    {name:'Surname',value: playersLookup.surname,inline: true},
                    {name:'Friends',value:playersLookup.friendlist, inline: true},
                    
                );
                await this.Send.sendUserEmbed(embed);

        }   
        catch (e) {
            await this.Send.sendErrorEmbed(e);

        }
    }

    async rank(player:string='random',object=''){
        try{
            const server = 'aurora';
            const commandString = `/player rank ${object} `;

            if (!this.entity.user) {
                throw new Error("User is null or undefined.");
            }
            if (player.toLowerCase() === 'random'){
                const allPlayerLookup = OfficialApi.players.all;
                player = String(CommandTools.random_choice(allPlayerLookup.allPlayers));

            }
            const players = OfficialApi.player(player);
            if(object === 'Town'){
               const rank = players.town.rank;

            }
            else if(object ==='Nation'){
                const rank = players.nation.rank;
            }
            
            const embed = new MessageEmbed()
                .setTitle(`\`${players.strings.nation}\``)
                .setFooter(commandString)
                .setAuthor(this.entity.user);
                embed.addFields(
                    {name: 'Name', value: players.name, inline: true },
                    {name:'Surname',value: players.surname,inline: true},
                    {name:`Rank town or nation `,value:this.rank, inline: true},
                    
                );
                await this.Send.sendUserEmbed(embed);

        }
        catch(e){
            await this.Send.sendErrorEmbed(e);
        }



    }

}
export {
    playercommand
}