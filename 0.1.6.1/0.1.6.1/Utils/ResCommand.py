import random
import disnake
from disnake.ext import commands
import Utils as Utils

class ResCommand(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.slash_command()
    async def res(
        self,
        inter
    ):
        pass

    @res.sub_command(description="Provides general info about a resident")
    async def search(
        self,
        inter: disnake.ApplicationCommandInteraction,
        username: str = commands.Param(description="Resident's username, type 'random' for a random choice"),
        server: str = commands.Param(description="Server name, defaults to Aurora", default="aurora", choices=["aurora"]),
    ):
        commandString = f"/res search username:{username} server:{server}"
        try:
            if username.lower() == "random":
                allResidentsLookup = Utils.Lookup.lookup(server, endpoint="residents")
                username = random.choice(allResidentsLookup["allResidents"])

            residentsLookup = Utils.Lookup.lookup(server, endpoint="residents", name=username)
        except:
            embed = Utils.Embeds.error_embed(
                value="Check if you wrote a parameter incorrectly or if the server is currently offline",
                type="userError",
                footer=commandString,
            )
            await inter.send(embed=embed, ephemeral=True)
            return

        try:
            fullNameList = [residentsLookup["strings"]["title"], residentsLookup["strings"]["username"], residentsLookup["strings"]["surname"]]
            fullNameList = [x for x in fullNameList if x != ""]
            fullName = " ".join(fullNameList)

            if residentsLookup["timestamps"]["lastOnline"] != 0:
                lastOnline = f"<t:{round(residentsLookup['timestamps']['lastOnline'] / 1000)}:R>"
            else:
                lastOnline = "NPC"

            town = residentsLookup["affiliation"].get("town")
            joinedTownAt = f"<t:{round(residentsLookup['timestamps']['joinedTownAt'] / 1000)}:R>" if town else "N/A"
            nation = residentsLookup["affiliation"].get("nation")

            rnaoPermsList = Utils.CommandTools.rnao_perms(json=residentsLookup)

            embed = Utils.Embeds.embed_builder(
                title=f"`{fullName}`",
                author=inter.author,
                footer=commandString,
                thumbnail=f"https://mc-heads.net/head/{residentsLookup['strings']['username']}",
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
                inline=True,
            )
            embed.add_field(
                name="Flags",
                value=f"• `PvP` — {residentsLookup['perms']['flagPerms']['pvp']}\n• `Explosions` — {residentsLookup['perms']['flagPerms']['explosion']}\n• `Firespread` — {residentsLookup['perms']['flagPerms']['fire']}\n• `Mob Spawns` — {residentsLookup['perms']['flagPerms']['mobs']}",
                inline=True,
            )

            for rankType in residentsLookup["ranks"]:
                if len(residentsLookup["ranks"][rankType]) != 0:
                    rankString = Utils.CommandTools.list_to_string(list=residentsLookup["ranks"][rankType])
                    name = "Town Ranks" if rankType == "townRanks" else "Nation Ranks"
                    embed.add_field(name=name, value=rankString.title(), inline=False)

            await inter.send(embed=embed, ephemeral=False)

        except:
            embed = Utils.Embeds.error_embed(value="If it is not evident that the error was your fault, please report it", footer=commandString)
            await inter.send(embed=embed, ephemeral=True)


    @res.sub_command(description="View all the friends of a specified resident")
    async def friendlist(
        self,
        inter: disnake.ApplicationCommandInteraction,
        username: str = commands.Param(description="Resident's username"),
        server: str = commands.Param(description="Server name, defaults to Aurora", default="aurora", choices=["aurora"]),
    ):
        commandString = f"/res friendlist username:{username} server:{server}"
        await inter.response.defer()
        try:
            residentsLookup = Utils.Lookup.lookup(server.lower(), endpoint="residents", name=username)
        except:
            embed = Utils.Embeds.error_embed(
                value="Check if you wrote a parameter incorrectly or if the server is currently offline",
                type="userError",
                footer=commandString,
            )
            await inter.send(embed=embed, ephemeral=True)
            return

        try:
            embed = Utils.Embeds.embed_builder(
                title=f"`{residentsLookup['strings']['username']}'s Friends",
                footer=commandString,
                author=inter.author,
            )

            if residentsLookup["friends"]:
                friendsString = Utils.CommandTools.list_to_string(list=residentsLookup["friends"])
                embed.add_field(name="Friends", value=f"```{friendsString[:1018]}```", inline=True)
            else:
                embed.add_field(name="Friends", value=f"{residentsLookup['strings']['username']} has no friends :(", inline=True)

            await inter.send(embed=embed, ephemeral=False)

        except:
            embed = Utils.Embeds.error_embed(value="If it is not evident that the error was your fault, please report it", footer=commandString)
            await inter.send(embed=embed, ephemeral=True)


def setup(bot):
    bot.add_cog(ResCommand(bot))