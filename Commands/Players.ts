import  {Client,MessageEmbed}  from 'discord.js';
import {CommandTools} from './utils/CommandTools';
import {Embeds} from '.utils/Embeds'; 
import  {OfficialApi} from 'earthmc';


class Player{

    private entity: Client;

    constructor(entity: Client) {
        this.entity = entity;
    }

    async player() {
        try {
            if (!this.entity.user) {
                throw new Error("User is null or undefined.");
            }

            await this.sendUserMessage(`This is the main /player command. Use subcommands like /player search`);

        } catch (e) {
            await this.sendErrorEmbed(e);
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
                await this.sendUserEmbed(embed);

        }   
        catch (e) {
            await this.sendErrorEmbed(e);

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
                await this.sendUserEmbed(embed);

        }   
        catch (e) {
            await this.sendErrorEmbed(e);

        }
    }

    async rank(player:string='random',town:boolean,nation:boolean){
        try{
            const server = 'aurora';
            const commandString = `/player rank ${nation} or ${town}`;

            if (!this.entity.user) {
                throw new Error("User is null or undefined.");
            }
            if (player.toLowerCase() === 'random'){
                const allPlayerLookup = OfficialApi.players.all;
                player = String(CommandTools.random_choice(allPlayerLookup.allPlayers));

            }
            const players = OfficialApi.player(player);
            if(town === true){
               const rank = players.town.rank;

            }
            else if(nation ===true){
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
                await this.sendUserEmbed(embed);

        }
        catch(e){
            await this.sendErrorEmbed(e);
        }



    }


    private async sendUserEmbed(embed: MessageEmbed) {
		try {
			if (this.entity.user) {
				await this.entity.user.send({ embed });
			} else {
				throw new Error("User is null or undefined.");
			}
		} catch (e) {
			await this.sendErrorEmbed(e);
		}
	}
	
	private async sendErrorEmbed(error: any) {
		const embed = Embeds.errorEmbed('An error occurred while processing your request.', error);
		try {
			if (this.entity.user) {
				await this.entity.user.send({ embed });
			} else {
				throw new Error("User is null or undefined.");
			}
		} catch (e) {
			console.error("An error occurred while sending an error message:", e);
		}
	}
    private async sendUserMessage(content: string) {
        try {
            if (this.entity.user) {
                await this.entity.user.send(content);
            } else {
                throw new Error("User is null or undefined.");
            }
        } catch (e) {
            await this.sendErrorEmbed(e);
        }
    }


}
export default Player;