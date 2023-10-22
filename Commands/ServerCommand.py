import disnake
from disnake.ext import commands
import Utils.Utils as Utils

class ServerCommand(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
        self.footer = 'made by charis_k'


    @commands.slash_command(description="Provides info about a server")
    async def server(
        self,
        inter: disnake.ApplicationCommandInteraction,
        server: str = commands.Param(
            description="Server name, defaults to Aurora",
            default="aurora",
            choices=["aurora"]
        )
    ):
        commandString = f"/server server: {server}"
        await inter.response.defer()
        try:
            serverLookup = await Utils.Lookup.lookup(server)
            allResidentsLookup = await Utils.Lookup.lookup(server, endpoint="residents")
            allTownsLookup = await Utils.Lookup.lookup(server, endpoint="towns")
            allNationsLookup = await Utils.Lookup.lookup(server, endpoint="nations")

        except Exception as e:
            embed = Utils.Embeds.error_embed(
                value=f'Error is {e}',
                footer=self.footer
            )

            await inter.send(embed=embed, ephemeral=True)
            return

        try:
            weather = Utils.CommandTools.get_weather(serverLookup)

            embed = Utils.Embeds.embed_builder(
                title=f"`{server.capitalize()}`",
                footer=self.footer,
                author=inter.author
            )

            embed.add_field(
                name="Online Players",
                value=f"{serverLookup['players']['numOnlinePlayers']}/{serverLookup['players']['maxPlayers']}",
                inline=False
            )

            embed.add_field(name="Weather", value=weather, inline=True)
            embed.add_field(name="Time", value=f"{serverLookup['world']['time']}/24000", inline=True)
            embed.add_field(
                name="Day",
                value=int(round(serverLookup["world"]["fullTime"] / 24000, 0)),
                inline=True
            )

            embed.add_field(
                name="Stats",
                value=f"• `Residents` — {allResidentsLookup['numResidents']}\n• `Towns` — {allTownsLookup['numTowns']}\n• `Nations` — {allNationsLookup['numNations']}",
                inline=False
            )

            await inter.send(embed=embed, ephemeral=False)

        except Exception as e:
            embed = Utils.Embeds.error_embed(
                value=f'Error is {e}',
                footer=self.footer
            )

            await inter.send(embed=embed, ephemeral=True)

def setup(bot):
    bot.add_cog(ServerCommand(bot))
