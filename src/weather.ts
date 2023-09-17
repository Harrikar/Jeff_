import { Client, MessageEmbed } from 'discord.js';
import axios from 'axios';
import {send} from './utils/sends'
class Weather {
    private entity: Client;
    private Send:send
    constructor(entity: Client,Send:send) {
        this.entity = entity;
        this.Send = Send;
    }

    async nation() {
        try {
            if (!this.entity.user) {
                throw new Error("User is null or undefined.");
            }

            await this.Send.sendUserMessage('This is the main /weather command. Use subcommands like `/weather search`');

        } catch (e) {
            await this.Send.sendErrorEmbed(e);
        }
    }
    async search(location: string, units: string = 'metric'){
        try {
            const commandString = `weather of ${location} in ${units}`;
            const apiKey = process.env.OPENWEATHER; 
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=${apiKey}`;

            const response = await axios.get(url);
            const weatherData = response.data;

            const embed = new MessageEmbed()
                .setTitle(`Weather in ${location}`)
                .addField('Temperature', `${weatherData.main.temp} ${units}`, true)
                .setFooter(commandString)
                .setAuthor(this.entity.user);


            embed.addFields(
                { name: 'Location', value: location, inline: true },
                { name: 'Units', value: units, inline: true },
                { name: 'Temp', value: `${weatherData.main.temp} ${units}`, inline: true },
            );

            await this.Send.sendUserEmbed(embed);
        } catch (e) {
            await this.Send.sendErrorEmbed(e);
        }

    }


}

export { Weather };
