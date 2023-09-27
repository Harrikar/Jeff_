import { Send } from './utils/send';
import { Client, Message } from 'discord.js';
import { Aurora } from 'earthmc';
import { CommandTools } from './utils/CommandTools';
import {OfficialApi} from 'earthmc'; 

class Alliance {
    private entity: Client;
    private send: Send;

    constructor(entity: Client, send: Send) {
        this.entity = entity;
        this.send = send;
    }

    async a() {
        this.entity.on('message', async (message: Message) => {
            try {
                this.send.sendUserMessage("this is the main /a command for alliance info use /a info");
            } catch (e) {
                this.send.sendUsersend(e);
            }
        });
    }

    async info(name: string) {
        const commandString = `info of alliance ${name}`;
        this.entity.on('message', async (message: Message) => {
            try {
                let alliance = Aurora.alliance(name);
                let members = alliance.members;
                const inputList = CommandTools.splitOnChanges(members);
                let splited = CommandTools.varnew(inputList);
                let totalBalance = 0;

                for (const nationName of splited) {
                    try {
                        const nation = await OfficialApi.nation(nationName);
                        totalBalance += nation.balance;
                    } catch (error) {
                        this.send.sendErrorsend(error)
                    }
                }

                
                const fields = [
                    { name:'Name',value:`${name} ${alliance.discord} `,inline:true},
                    { name:'Residents',value:alliance.Residents,inline:true},
                    { name:'Towns',value:alliance.Towns},
                    { name: 'Total Balance', value: totalBalance.toString(),inline:true},
                    { name:'Residents',value:alliance.residents,inline:true}

                ];
                this.send.sendUsersend(fields)

            } catch (e) {
                this.send.sendErrorsend(e)
            }
        });
    }
}

export { Alliance };
