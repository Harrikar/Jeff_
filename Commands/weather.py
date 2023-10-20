import disnake
import aiohttp
from disnake.ext import commands
import Utils.Utils as Utils
from Utils.Utils import *
import os
class Weather(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.slash_command(name="weather", help="Get the current weather for a location.",description="Get the current weather for a location")
    async def weather(self, inter: disnake.ApplicationCommandInteraction, location: str, unit: str = "metric"):
        valid_units = ["metric", "imperial"]
        unit = unit.lower()

        if unit not in valid_units:
            await inter.response.send_message("Invalid unit system. Please use 'metric' or 'imperial'.")
            return

        api_key = str(os.environ.get('KEY'))
        base_url = "http://api.openweathermap.org/data/2.5/weather?"

        params = {
            "q": location,
            "appid": api_key,
            "units": unit,
        }

        async with aiohttp.ClientSession() as session:
            async with session.get(base_url,params=params) as response:
                response = await response.json()

        if response.status_code == 200:
            data = response

            weather_description = data["weather"][0]["description"]
            temperature = data["main"]["temp"]
            humidity = data["main"]["humidity"]
            wind_speed = data["wind"]["speed"]

            unit_symbol = "°C" if unit == "metric" else "°F"

            weather_embed = Utils.Embeds.embed_builder(title=f'Weather in {location}')
            weather_embed.add_field(name="Description", value=weather_description, inline=False)
            weather_embed.add_field(name="Temperature", value=f"{temperature} {unit_symbol}", inline=True)
            weather_embed.add_field(name="Humidity", value=f"{humidity}%", inline=True)
            weather_embed.add_field(name="Wind Speed", value=f"{wind_speed} m/s", inline=True)

            await inter.response.send_message(embed=weather_embed)
        else:
            await inter.response.send_message("Sorry, couldn't fetch weather information for that location.")

def setup(bot):
    bot.add_cog(Weather(bot))