import * as discord from 'discord.js';
import { Nations } from './src/Nations';
import { playercommand } from './src/Players';
import { TownCommand } from './src/Towns';
import { send } from './src/utils/send';
import { Level } from './src/levels';
import { Alliance } from './src/alliance';
import { Devcommands } from './src/devcommands';
// Set up the client with specified options

const client = new discord.Client({
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





const Send = new send(client);
const nationCommand = new Nations(client, Send);
const townCommand = new TownCommand(client, Send);
const playerCommand = new playercommand(client, Send);

const level = new Level(client, Send);
const alliance = new Alliance(client, Send);
const dev = new Devcommands(client, Send);

client.on('message', async (message) => {
    if (message.author.bot){
        Send.sendUserMessage('stop spamming me you stupid #####')
    }

    const args = message.content.split(' ');
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
            await playerCommand.rank(args[1], args[2]);
        }
    } 
     else if (command === '/levels') {
        const subCommand = args[0]?.toLowerCase();
        if (subCommand === 'show') {
            await level.showlevel(args[1]);
        }
    } else if (command === '/a') {
        const subCommand = args[0]?.toLowerCase();
        if (subCommand === 'info'){
            await alliance.info(args[1])
        }
    } else if (command === '/dev'){
        const subCommand = args[0]?.toLowerCase();
        if (subCommand === 'restart'){
            await dev.restart()
        } else if (subCommand === 'stop'){
            await dev.stop()
        }
    }
});

try {
    const token = 'MTEyMTc1MTQwMDI5NzI3OTU0OQ.GDw6hv.Zzu0SdPCYrJKJARPg60oEzB71Gyqqe-9WEeHHQ';
    client.login(token);
} catch (e) {
    throw new Error;
}







