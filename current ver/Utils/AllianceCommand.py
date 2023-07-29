import disnake
from disnake.ext import commands
import Utils
from Utils import *

class AllianceCommand(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.slash_command(description="Alliance-related commands.")
    async def alliance(self, inter: disnake.ApplicationCommandInteraction):
        await inter.response.send_message("Please specify a sub-command. Use `/alliance info` for general alliance information.")

    @alliance.sub_command(base="alliance", name="info", description="Retrieve and display general information about an alliance.")
    async def info(self, inter: disnake.ApplicationCommandInteraction, alliance: str):
        """Retrieve and display general information about an alliance."""
        commandString = f"/alliance info {alliance}"

        try:
            await inter.response.defer()

            allianceInfo = await Utils.lookup("alliances", name=alliance)  # Use the lookup function from Utils module
            members = ", ".join(allianceInfo.get("nations", ["None"]))

            embed = Utils.embed_builder(  # Use the embed_builder function from Utils module
                title=f"{allianceInfo['tag']} {allianceInfo['name']}",
                description=allianceInfo["description"],
                footer=commandString,
                author=inter.author
            )

            embed.add_field(name="Leader/s", value=allianceInfo["leader"], inline=True)
            embed.add_field(name="Members", value=members, inline=False)
            embed.add_field(name="Towns", value=allianceInfo["towns"], inline=True)
            embed.add_field(name="Balance", value=f"{allianceInfo['balance']}G", inline=True)

            await inter.edit_original_message(embed=embed)

        except Exception as e:
            embed = Utils.error_embed(  # Use the error_embed function from Utils module
                title="Error",
                description="An error occurred while processing your request. If the error wasn't on your side, I advise reporting the bug so it can be fixed.",
                footer=commandString
            )

            await inter.response.send_message(embed=embed)

def setup(bot):
    bot.add_cog(AllianceCommand(bot))
