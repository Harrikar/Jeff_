import {Nations} from './src/Nations';
import { playercommand } from './src/Players';
import {TownCommand} from './src/Towns';
import * as Discord from 'discord.js';
import * as dotenv from 'dotenv'
import {send} from './src/utils/sends';
import { Weather } from './src/weather';
import { Level } from './src/levels';

const client = new Discord.Client();
const Send = new send(client);
const nationCommand = new Nations(client,Send);
const townCommand = new TownCommand(client,Send);
const playerCommand = new playercommand(client,Send);
const weathercommand = new Weather(client,Send)
const level = new Level(client,Send)
dotenv.config();


client.on('message', async (message) => {
    if (message.author.bot) return;

    const args = message.content.split(' ');
    const command = args.shift()?.toLowerCase();
    // check which command was run
    if (command === '/nation') {
        const subCommand = args[0]?.toLowerCase();

        if (subCommand === 'search') {
            await nationCommand.search(args[1], args[2]);
        } else if (subCommand === 'reslist') {
            await nationCommand.reslist(args[1], args[2]);
        } else if (subCommand === 'ranklist') {
            await nationCommand.ranklist(args[1], args[2]);
        } else if (subCommand === 'allylist') {
            await nationCommand.allylist(args[1], args[2]);
        } else if (subCommand === 'enemylist') {
            await nationCommand.enemylist(args[1], args[2]);
        } else if (subCommand === 'townlist') {
            await nationCommand.townlist(args[1], args[2]);
        } else if (subCommand === 'unallied') {
            await nationCommand.unallied(args[1], args[2]);
        } else {
            await nationCommand.nation();
        }
    } else if (command === '/town') {
        const subCommand = args[0]?.toLowerCase();
        if (subCommand === 'search') {
            await townCommand.search(args[1]);
        } else if (subCommand === 'rank') {
            await townCommand.ranklist(args[1]);
        } else if (subCommand === 'ranklist') {
            await townCommand.ranklist(args[1]);
        }
    } else if (command === '/player') {
        const subCommand = args[0]?.toLowerCase();
        if (subCommand === 'search') {
            await playerCommand.search(args[1]);
        } else if (subCommand === 'friendlist') {
            await playerCommand.friendlist(args[1]);
        } else if (subCommand === 'rank') {
            await playerCommand.rank(args[1], args[2]);
        }
    }
    else if (command === '/weather'){
        const subCommand = args[0]?.toLowerCase();
        if (subCommand === '/weather search'){
            await weathercommand.search(args[1])
        }
    }
    else if (command === '/levels show'){
        await level.showlevel(args[1])
    }
});

try{
    
    const token = process.env.TOKEN
    client.login(token);
}
catch (e){
    throw new console.error(`Error ${e}`);
    
}


