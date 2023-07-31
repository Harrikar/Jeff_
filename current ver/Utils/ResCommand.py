import disnake
from disnake.ext import commands
from disnake.ext.commands import InteractionBot
import Utils as Utils
from Utils import *
import random

bot: InteractionBot = commands.InteractionBot()
players_cache = {}

class ResCommand(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.slash_command(description="Main /res command")
    async def res(self, inter: disnake.ApplicationCommandInteraction):
        pass

    @res.sub_command(description="Provides general info about a resident")
    async def search(
        self,
        inter: disnake.ApplicationCommandInteraction,
        username: str = commands.Param(description="Resident's username, type 'random' for a random choice"),
        server: str = commands.Param(description="Server name, defaults to Aurora", default="aurora", choices=["aurora"])
    ):
        commandString = f"/res search username: {username} server: {server}"
        await inter.response.defer()

        try:
            if username == "random":
                allResidentsLookup = await Utils.Lookup.lookup(server, endpoint="residents")
                username = random.choice(allResidentsLookup["allResidents"])

            residentsLookup = await Utils.Lookup.lookup(server, endpoint="residents", name=username)

            fullNameList = [residentsLookup["strings"]["title"], residentsLookup["strings"]["username"], residentsLookup["strings"]["surname"]]
            fullNameList = [x for x in fullNameList if x != ""]

            fullName = " ".join(fullNameList)

            if residentsLookup["timestamps"]["lastOnline"] != 0:
                lastOnline = f"<t:{round(residentsLookup['timestamps']['lastOnline'] / 1000)}:R>"
            else:
                lastOnline = "NPC"

            try:
                town = residentsLookup["affiliation"]["town"]
                joinedTownAt = f"<t:{round(residentsLookup['timestamps']['joinedTownAt'] / 1000)}:R>"
                try:
                    nation = residentsLookup["affiliation"]["nation"]
                except:
                    nation = None

            except:
                town = None
                joinedTownAt = "N/A"
                nation = None

            rnaoPermsList = Utils.CommandTools.rnao_perms(json=residentsLookup)

            embed = Utils.Embeds.embed_builder(
                title=f"`{fullName}`",
                author=inter.author,
                footer=commandString,
                thumbnail=f"https://mc-heads.net/head/{residentsLookup['strings']['username']}"
            )

            embed.add_field(name="Affiliation", value=f"• `Town` — {town}\n• `Nation` — {nation}", inline=True)
            embed.add_field(name="Online", value=residentsLookup["status"]["isOnline"], inline=True)
            embed.add_field(name="Balance", value=f"{residentsLookup['stats']['balance']}G", inline=True)

            embed.add_field(name="Registered", value=f"<t:{round(residentsLookup['timestamps']['registered'] / 1000)}:R>", inline=True)
            embed.add_field(name="Last Online", value=lastOnline, inline=True)
            embed.add_field(name="Joined Town", value=joinedTownAt, inline=True)

            embed.add_field(
                name="Perms",
                value=f"• `Build` — {rnaoPermsList[0]}\n• `Destroy` — {rnaoPermsList[1]}\n• `Switch` — {rnaoPermsList[2]}\n• `ItemUse` — {rnaoPermsList[3]}",
                inline=True
            )
            embed.add_field(
                name="Flags",
                value=f"• `PvP` — {residentsLookup['perms']['flagPerms']['pvp']}\n• `Explosions` — {residentsLookup['perms']['flagPerms']['explosion']}\n• `Firespread` — {residentsLookup['perms']['flagPerms']['fire']}\n• `Mob Spawns` — {residentsLookup['perms']['flagPerms']['mobs']}",
                inline=True
            )

            for rankType in residentsLookup["ranks"]:
                if len(residentsLookup["ranks"][rankType]) != 0:
                    rankString = Utils.CommandTools.list_to_string(list=residentsLookup["ranks"][rankType])

                    if rankType == "townRanks":
                        name = "Town Ranks"
                    else:
                        name = "Nation Ranks"

                    embed.add_field(name=name, value=rankString.title(), inline=False)

            await inter.send(embed=embed, ephemeral=False)

        except Exception as e:
            embed = Utils.Embeds.error_embed(
                value="If it is not evident that the error was your fault, please report it",
                footer=commandString
            )

            await inter.send(embed=embed, ephemeral=True)



    @res.sub_command(description="View all the friends of a specified resident")
    async def friends(
        self,
        inter: disnake.ApplicationCommandInteraction,
        username: str = commands.Param(description="Resident's username"),
        server: str = commands.Param(description="Server name, defaults to Aurora", default="aurora", choices=["aurora"])
    ):
        commandString = f"/res friends username:{username} server:{server}"
        await inter.response.defer()

        try:
            residentsLookup = await Utils.Lookup.lookup(server.lower(), endpoint="residents", name=username)

            embed = Utils.Embeds.embed_builder(
                title=f"`{residentsLookup['strings']['username']}'s Friends`",
                footer=commandString,
                author=inter.author
            )

            if residentsLookup["friends"]:
                friendsString = Utils.CommandTools.list_to_string(residentsLookup["friends"])
                embed.add_field(name="Friends", value=f"```{friendsString[:1018]}```", inline=True)

            else:
                embed.add_field(
                    name="Friends",
                    value=f"{residentsLookup['strings']['username']} has no friends :(",
                    inline=True
                )

            await inter.send(embed=embed, ephemeral=False)

        except Exception as e:
            embed = Utils.Embeds.error_embed(
                value="If it is not evident that the error was your fault, please report it",
                footer=commandString
            )

            await inter.send(embed=embed, ephemeral=True)

    @res.sub_command(description="Display all the townless players")
    async def townless(
            self,
            inter: disnake.ApplicationCommandInteraction,
            server: str = commands.Param(description="Server name, defaults to Aurora", default="aurora",
                                         choices=["aurora"])
    ):
        commandString = f"/res townless server:{server}"
        await inter.response.defer()

        try:
            allResidentsLookup = await Utils.Lookup.lookup(server, endpoint="residents")

            # Filter online townless residents
            townless_players = [
                resident["strings"]["username"]
                for resident in allResidentsLookup["allResidents"]
                if not resident["affiliation"].get("town") and resident["status"]["isOnline"]
            ]

            if townless_players:
                townless_players_string = Utils.CommandTools.list_to_string(townless_players)
                embed = Utils.Embeds.embed_builder(
                    title="Townless Players (Online)",
                    description=f"```{townless_players_string}```",
                    footer=commandString,
                    author=inter.author
                )

                await inter.send(embed=embed, ephemeral=False)
            else:
                embed = Utils.Embeds.embed_builder(
                    title="Townless Players (Online)",
                    description="No online townless players found.",
                    footer=commandString,
                    author=inter.author
                )

                await inter.send(embed=embed, ephemeral=False)

        except Exception as e:
            embed = Utils.Embeds.error_embed(
                value="An error occurred while processing your request.",
                footer=commandString
            )

            await inter.send(embed=embed, ephemeral=True)

    @bot.command(description="Track the coordinates of a player")
    async def track(ctx, player_name: str, server: str = "aurora"):
        global players_cache

        commandString = f"!track player: {player_name} server: {server}"

        try:
            # Fetch player data from the API or use the cached data if available
            if (server, "players", player_name) in players_cache:
                player_lookup = players_cache[(server, "players", player_name)]
            else:
                player_lookup = await Utils.Lookup.lookup(server, endpoint="players", name=player_name)
                players_cache[(server, "players", player_name)] = player_lookup

            # Extract the player coordinates from the API response
            x_coord = int(round(player_lookup["x"], 0))
            z_coord = int(round(player_lookup["z"], 0))
            location_url = f"https://earthmc.net/map/{server}/?zoom=4&x={x_coord}&z={z_coord}"
            location = f"[{x_coord}, {z_coord}]({location_url})"

            await ctx.send(f"{player_name}'s current location: {location}")

        except Exception as e:
            await ctx.send("An error occurred while fetching player data.")





    

def setup(bot):
    bot.add_cog(ResCommand(bot))
