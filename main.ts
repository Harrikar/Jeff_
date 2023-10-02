import { Client, GatewayIntentBits} from 'discord.js';
import { Nations } from './src/Nations';
import { playercommand } from './src/Players';
import { TownCommand } from './src/Towns';
import { Devcommands } from './src/devcommands';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';

const clientId = '1121751400297279549'; 
const token = '';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
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

const nationCommand = new Nations(client);
const townCommand = new TownCommand(client);
const playerCommand = new playercommand(client);
const dev = new Devcommands(client);

client.on('messageCreate', async (message) => {
    if (message.author.bot) {
        await message.author.send('I dont accept commands from bots')
        return;
    }

    const args = message.content.trim().split(/ +/);
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

client.once('ready', async () => {
    try {
        console.log('Logged in as ' + client.user?.tag);

        const commands = [
            {
                name: 'nation',
                description: 'Main nation command',
                options: [
                    {
                        name: 'search',
                        type: 1,
                        description: 'Search for a nation',
                        options: [
                            {
                                name: 'name',
                                type: 3,
                                description: 'Name of the nation you want to search',
                            }
                        ]
                    },
                    {
                        name: 'reslist',
                        type: 1,
                        description: 'List of resources for a nation',
                        options: [
                            {
                                name: 'name',
                                type: 3,
                                description: 'Name of the nation you want to list resources for',
                            }
                        ]
                    },
                    {
                        name: 'ranklist',
                        type: 1,
                        description: 'List of ranks for a nation',
                        options: [
                            {
                                name: 'name',
                                type: 3,
                                description: 'Name of the nation you want to list ranks for',
                            }
                        ]
                    },
                    {
                        name: 'allylist',
                        type: 1,
                        description: 'List of allies for a nation',
                        options: [
                            {
                                name: 'name',
                                type: 3,
                                description: 'Name of the nation you want to list allies for',
                            }
                        ]
                    },
                    {
                        name: 'enemylist',
                        type: 1,
                        description: 'List of enemies for a nation',
                        options: [
                            {
                                name: 'name',
                                type: 3,
                                description: 'Name of the nation you want to list enemies for',
                            }
                        ]
                    },
                    {
                        name: 'townlist',
                        type: 1,
                        description: 'List of towns for a nation',
                        options: [
                            {
                                name: 'name',
                                type: 3,
                                description: 'Name of the nation you want to list towns for',
                            }
                        ]
                    },
                    {
                        name: 'unallied',
                        type: 1,
                        description: 'List of unallied nations',
                    }
                ]
            },
            {
                name: 'town',
                description: 'Main town command',
                options: [
                    {
                        name: 'lookup',
                        type: 1,
                        description: 'Search for a town',
                        options: [
                            {
                                name: 'town_name',
                                type: 3,
                                description: 'Name of the town you want to search',
                            }
                        ]
                    },
                    {
                        name: 'rank',
                        type: 1,
                        description: 'Rank of a town',
                        options: [
                            {
                                name: 'town_name',
                                type: 3,
                                description: 'Name of the town you want to get the rank for',
                            }
                        ]
                    },
                    {
                        name: 'showranks',
                        type: 1,
                        description: 'List of ranks for a town',
                    },
                    {
                        name: 'showresidents',
                        type: 1,
                        description: 'List of residents for a town',
                        options: [
                            {
                                name: 'town_name',
                                type: 3,
                                description: 'Name of the town you want to get the residents for',
                            }
                        ]
                    }
                ]
            },
            {
                name: 'player',
                description: 'Main player command',
                options: [
                    {
                        name: 'find',
                        type: 1,
                        description: 'Search for a player',
                        options: [
                            {
                                name: 'player_name',
                                type: 3,
                                description: 'Name of the player you want to search',
                            }
                        ]
                    },
                    {
                        name: 'friendlist',
                        type: 1,
                        description: 'List of friends for a player',
                        options: [
                            {
                                name: 'player_name',
                                type: 3,
                                description: 'Name of the player you want to get the friend list for',
                            }
                        ]
                    },
                    {
                        name: 'rank',
                        type: 1,
                        description: 'Rank of a player',
                        options: [
                            {
                                name: 'player_name',
                                type: 3,
                                description: 'Name of the player you want to get the rank for',
                            }
                        ]
                    }
                ]
            },
            {
                name: 'dev',
                description: 'Main /dev command',
                options: [
                    
  
                            {
                                name: 'restart',
                                type: 1,
                                description: 'Restart command',
                            },
                            {
                                name: 'stop',
                                type: 1,
                                description: 'Stop command',
                            }
                        ]

            }, 
        ]
        const rest = new REST({ version: '10' }).setToken(token);

        try {
            console.log('Started refreshing application / commands.');

            await rest.put(Routes.applicationCommands(clientId), {
                body: commands,
            });

            console.log('Successfully reloaded application / commands.');
        } catch (error) {
            console.error(error);
        }

    } catch (e) {
        console.error(e);
    }
});

try {
    client.login(token);
    console.log('Login successful');
} catch (e) {
    throw new Error;
}
