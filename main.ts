import * as discord from 'discord.js';
import { Nations } from './src/Nations';
import { playercommand } from './src/Players';
import { TownCommand } from './src/Towns';
import { Send } from './src/utils/send';
import { Devcommands } from './src/devcommands';
import { SapphireClient } from '@sapphire/framework';

const client = new SapphireClient({
    intents: [
        discord.GatewayIntentBits.Guilds,
        discord.GatewayIntentBits.GuildMessages,
    ],
    allowedMentions: {
        parse: ['users', 'roles'],
        repliedUser: true,
    },    

    presence: {
        activities: [
            {
                name: 'Watching Jefferson',
                
            }
        ],
        status: 'online'
    }
});

const send = new Send(client);
const nationCommand = new Nations(client, send);
const townCommand = new TownCommand(client, send);
const playerCommand = new playercommand(client, send);
const dev = new Devcommands(client, send);

client.on('message', async (message) => {
    if (client.user?.bot){
        send.sendUserMessage('sorry i dont accept commands from bots ')
    }
    
    const args = client.on.arguments.slice('')
    const command = args.shift()?.toLowerCase();

    // Check which command was run
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
            await playerCommand.rank(args[1]);
        }
    } 
     //else if (command === '/levels') {
        //const subCommand = args[0]?.toLowerCase();
       // if (subCommand === 'show') {
            //await level.showlevel(args[1]);
        //}
        //TODO : Fix levels
 
    else if (command === '/dev'){
        const subCommand = args[0]?.toLowerCase();
        if (subCommand === 'restart'){
            await dev.restart()
        } else if (subCommand === 'stop'){
            await dev.stop()
        }
    }
});

try {
    const token = '';
    client.login(token);
    console.log('Login sucessful')
} catch (e) {
    throw new Error;
}







