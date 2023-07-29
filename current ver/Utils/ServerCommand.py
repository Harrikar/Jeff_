import disnake
from disnake.ext import commands
import Utils as Utils

class ServerCommand(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

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
            serverLookup = Utils.Lookup.lookup(server)
            allResidentsLookup = Utils.Lookup.lookup(server, endpoint="residents")
            allTownsLookup = Utils.Lookup.lookup(server, endpoint="towns")
            allNationsLookup = Utils.Lookup.lookup(server, endpoint="nations")

        except:
            embed = Utils.Embeds.error_embed(
                value="Check if you wrote a parameter incorrectly or if the server is currently offline",
                type="userError",
                footer=commandString
            )

            await inter.send(embed=embed, ephemeral=True)
            return

        try:
            weather = Utils.CommandTools.get_weather(serverLookup)

            embed = Utils.Embeds.embed_builder(
                title=f"`{server.capitalize()}`",
                footer=commandString,
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

        except:
            embed = Utils.Embeds.error_embed(
                value="If it is not evident that the error was your fault, please report it",
                footer=commandString
            )

            await inter.send(embed=embed, ephemeral=True)

def setup(bot):
    bot.add_cog(ServerCommand(bot))
