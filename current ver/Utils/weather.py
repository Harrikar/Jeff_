import disnake
from disnake.ext import commands
import requests
import Utils as Utils
from Utils import *
class WeatherCommand(commands.Cog):
    def __init__(self, bot):
        self.bot = bot


    API_KEY = "7ef56e400a62114e2f5ec8ccd15b1ddb"

    @commands.slash_command(name="weather", help="Get the current weather for a location.", description="Get the current weather for a location")
    async def weather(self, inter: disnake.ApplicationCommandInteraction, location: str, unit: str = "metric"):
        valid_units = ["metric", "imperial"]
        unit = unit.lower()

        if unit not in valid_units:
            await inter.response.send_message("Invalid unit system. Please use 'metric' or 'imperial'.")
            return

        base_url = "http://api.openweathermap.org/data/2.5/weather"

        params = {
            "q": location,
            "appid": API_KEY,
            "units": unit,
        }

        try:
            response = requests.get(base_url, params=params)
            response.raise_for_status()  # Raise an exception if the status code is not 200
            data = response.json()

            weather_description = data["weather"][0]["description"]
            temperature = data["main"]["temp"]
            humidity = data["main"]["humidity"]
            wind_speed = data["wind"]["speed"]

            unit_symbol = "°C" if unit == "metric" else "°F"

            weather_embed = disnake.Embed(title=f"Weather in {location}", color=0x00FF00)
            weather_embed.add_field(name="Description", value=weather_description, inline=False)
            weather_embed.add_field(name="Temperature", value=f"{temperature} {unit_symbol}", inline=True)
            weather_embed.add_field(name="Humidity", value=f"{humidity}%", inline=True)
            weather_embed.add_field(name="Wind Speed", value=f"{wind_speed} m/s", inline=True)

            await inter.response.send_message(embed=weather_embed)

        except requests.exceptions.RequestException as e:
            await inter.response.send_message(f"Error: {e}")
        except KeyError:
            await inter.response.send_message("Sorry, couldn't fetch weather information for that location.")
        except Exception as e:
            await inter.response.send_message(f"An error occurred: {e}")


def setup(bot):
    bot.add_cog(WeatherCommand(bot))

