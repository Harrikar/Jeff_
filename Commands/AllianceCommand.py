import disnake
from disnake.ext import commands
from Utils.Utils import *
import requests
class AllianceCommand(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.slash_command(description="Alliance-related commands.")
    async def alliance(self, inter: disnake.ApplicationCommandInteraction):
        await inter.response.send_message("Please specify a sub-command. Use `/alliance info` for general alliance information.")

    @alliance.sub_command(description="Retrieve and display general information about an alliance.")
    async def info(self, inter: disnake.ApplicationCommandInteraction, alliance: str):
        """Retrieve and display general information about an alliance."""
        commandString = f"/alliance info {alliance}"

        try:
            await inter.response.defer()
            url = f'https://emctoolkit.vercel.app/api/aurora/alliances/{alliance}'
            allianceInfo = requests.get(url=url).json()

            members = ", ".join(allianceInfo.get("nations", ["None"]))

            embed = Embeds.embed_builder(
                title=f"{allianceInfo['tag']} {allianceInfo['name']}",
                description=allianceInfo["description"],
                footer=commandString,
                author=inter.author
            )

            embed.add_field(name="Leader/s", value=allianceInfo["leader"], inline=True)
            embed.add_field(name="Members", value=members, inline=False)
            embed.add_field(name="Towns", value=allianceInfo["towns"], inline=True)

            await inter.edit_original_message(embed=embed)

        except Exception as e:
            embed = Embeds.error_embed(
                value=e,
                footer=commandString
            )

            await inter.response.send_message(embed=embed)

def setup(bot):
    bot.add_cog(AllianceCommand(bot))
