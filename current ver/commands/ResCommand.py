import disnake
from disnake.ext import commands
from disnake.ext.commands import Param
import Utils as Utils
import random
import aiohttp


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
        username: str = Param(description="Resident's username, type 'random' for a random choice"),
        server: str = Param(description="Server name, defaults to Aurora", default="aurora", choices=["aurora"])
    ):
        await inter.response.defer()

        try:
            if username == "random":
                allResidentsLookup = await Utils.Lookup.lookup(server, endpoint="residents")
                username = random.choice(allResidentsLookup["allResidents"])

            residentsLookup = await Utils.Lookup.lookup(server, endpoint="residents", name=username)

            fullNameList = [residentsLookup["strings"]["title"], residentsLookup["strings"]["username"], residentsLookup["strings"]["surname"]]
            fullNameList = [x for x in fullNameList if x]

            fullName = " ".join(fullNameList)

            lastOnline = f"<t:{round(residentsLookup['timestamps']['lastOnline'] / 1000)}:R>" if residentsLookup["timestamps"]["lastOnline"] != 0 else "NPC"

            town = residentsLookup["affiliation"]["town"] if "town" in residentsLookup["affiliation"] else None
            joinedTownAt = f"<t:{round(residentsLookup['timestamps']['joinedTownAt'] / 1000)}:R>" if "joinedTownAt" in residentsLookup["timestamps"] else "N/A"
            nation = residentsLookup["affiliation"]["nation"] if "nation" in residentsLookup["affiliation"] else None

            rnaoPermsList = Utils.CommandTools.rnao_perms(json=residentsLookup)

            embed = Utils.Embeds.embed_builder(
                title=f"`{fullName}`",
                author=inter.author,
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

            for rankType, ranks in residentsLookup["ranks"].items():
                if ranks:
                    rankString = Utils.CommandTools.list_to_string(*ranks)
                    name = "Town Ranks" if rankType == "townRanks" else "Nation Ranks"
                    embed.add_field(name=name, value=rankString.title(), inline=False)

            await inter.send(embed=embed, ephemeral=False)

        except Exception as e:
            embed = Utils.Embeds.error_embed(
                value="If it is not evident that the error was your fault, please report it"
            )

            await inter.send(embed=embed, ephemeral=True)

    @res.sub_command(description="View all the friends of a specified resident")
    async def friends(
            self,
            inter: disnake.ApplicationCommandInteraction,
            username: str = Param(description="Resident's username"),
            server: str = Param(description="Server name, defaults to Aurora", default="aurora", choices=["aurora"])
    ):
        await inter.response.defer()

        try:
            residentsLookup = await Utils.Lookup.lookup(server.lower(), endpoint="residents", name=username)

            embed = Utils.Embeds.embed_builder(
                title=f"`{residentsLookup['strings']['username']}'s Friends`",
                author=inter.author
            )

            if residentsLookup["friends"]:
                friendsString = Utils.CommandTools.list_to_string(*residentsLookup["friends"])
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
                value="If it is not evident that the error was your fault, please report it"
            )

            await inter.send(embed=embed, ephemeral=True)

    @res.sub_command(description="Display all the townless players")
    async def townless(
            self,
            inter: disnake.ApplicationCommandInteraction,
            server: str = Param(description="Server name, defaults to Aurora", default="aurora", choices=["aurora"])
    ):
        await inter.response.defer()

        try:
            allResidentsLookup = await Utils.Lookup.lookup(server, endpoint="residents")

            townless_players = [
                resident["strings"]["username"]
                for resident in allResidentsLookup["allResidents"]
                if not resident["affiliation"].get("town") and resident["status"]["isOnline"]
            ]

            if townless_players:
                townless_players_string = Utils.CommandTools.list_to_string(*townless_players)
                embed = Utils.Embeds.embed_builder(
                    title="Townless Players (Online)",
                    description=f"```{townless_players_string}```",
                    author=inter.author
                )
                await inter.send(embed=embed, ephemeral=False)
            else:
                embed = Utils.Embeds.embed_builder(
                    title="Townless Players (Online)",
                    description="No online townless players found.",
                    author=inter.author
                )
                await inter.send(embed=embed, ephemeral=False)

        except Exception as e:
            embed = Utils.Embeds.error_embed(
                value="An error occurred while processing your request."
            )
            await inter.send(embed=embed, ephemeral=True)

    @res.sub_command(description="Track the coordinates of a player")
    async def track(
            self,
            inter: disnake.ApplicationCommandInteraction,
            player_name: str,
            server: str = Param(description="Server name, defaults to Aurora", default="aurora")
    ):
        try:
            player_data = await Utils.Lookup.player_lookup(player_name)
            x_coord = int(round(player_data["x"], 0))
            z_coord = int(round(player_data["z"], 0))
            location_url = f"https://earthmc.net/map/{server}/?zoom=4&x={x_coord}&z={z_coord}"
            location = f"[{x_coord}, {z_coord}]({location_url})"
            await inter.send(f"{player_name}'s current location: {location}")

        except aiohttp.ContentTypeError:
            await inter.send("An error occurred while fetching player data. Please try again later.")

        except KeyError:
            await inter.send(f"Player '{player_name}' not found in the API response.")

        except Exception as e:
            await inter.send(f"An unexpected error occurred: {e}. Please contact the bot developer for assistance.")


def setup(bot):
    bot.add_cog(ResCommand(bot))
