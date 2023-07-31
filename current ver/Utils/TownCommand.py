import random
import disnake
from disnake.ext import commands
from disnake.ext.commands import InteractionBot
import cachetools
from cachetools import TTLCache

import Utils as Utils
bot: InteractionBot = commands.InteractionBot()
class TownCommand(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.slash_command()
    async def town(self, inter):
        pass

    @town.sub_command(description="Provides general info about a town")
    async def search(
        self,
        inter: disnake.ApplicationCommandInteraction,
        town: str = commands.Param(
            description="Town's name, type 'random' for a random choice"
        ),
        server: str = commands.Param(
            description="Server name, defaults to Aurora",
            default="aurora",
            choices=["aurora"]
        )
    ):
        commandString = f"/town search town: {town} server: {server}"

        try:
            if town == "random":
                allTownsLookup = await Utils.Lookup.lookup(server, endpoint="towns")
                town = random.choice(allTownsLookup["allTowns"])
            townsLookup = await Utils.Lookup.lookup(server, endpoint="towns", name=town)

        except Exception as e:
            embed = Utils.Embeds.error_embed(
                value="Check if you wrote a parameter incorrectly or if the server is currently offline",
                type="userError",
                footer=commandString
            )
            await inter.response.send_message(embed=embed, ephemeral=True)
            return

        try:
            try:
                locationUrl = f"https://earthmc.net/map/{server}/?zoom=4&x={townsLookup['spawn']['x']}&z={townsLookup['spawn']['z']}"
                location = f"[{int(round(townsLookup['spawn']['x'], 0))}, {int(round(townsLookup['spawn']['z'], 0))}]({locationUrl})"
            except:
                locationUrl = f"https://earthmc.net/map/{server}/?zoom=4&x={townsLookup['home']['x'] * 16}&z={townsLookup['home']['z'] * 16}"
                location = f"[{townsLookup['home']['x'] * 16}, {townsLookup['home']['z'] * 16}]({locationUrl})"

            try:
                nation = townsLookup["affiliation"]["nation"]
                joinedNationAt = f"<t:{round(townsLookup['timestamps']['joinedNationAt'] / 1000)}:R>"
            except:
                nation = None
                joinedNationAt = "N/A"

            rnaoPermsList = Utils.CommandTools.rnao_perms(json=townsLookup)

            embed = Utils.Embeds.embed_builder(
                title=f"`{townsLookup['strings']['town']}`",
                description=townsLookup["strings"]["board"],
                footer=commandString,
                author=inter.author
            )

            embed.add_field(name="Mayor", value=townsLookup["strings"]["mayor"], inline=True)
            embed.add_field(name="Nation", value=nation, inline=True)
            embed.add_field(name="Location", value=location, inline=True)

            embed.add_field(name="Residents", value=townsLookup["stats"]["numResidents"], inline=True)
            embed.add_field(
                name="Chunks",
                value=f"{townsLookup['stats']['numTownBlocks']}/{townsLookup['stats']['maxTownBlocks']} ({townsLookup['stats']['numTownBlocks'] * 16 + 48}G)",
                inline=True
            )
            embed.add_field(name="Balance", value=f"{townsLookup['stats']['balance']}G", inline=True)

            embed.add_field(name="Founder", value=townsLookup["strings"]["founder"], inline=True)
            embed.add_field(
                name="Founded",
                value=f"<t:{round(townsLookup['timestamps']['registered'] / 1000)}:R>",
                inline=True
            )
            embed.add_field(name="Joined Nation", value=joinedNationAt, inline=True)

            embed.add_field(
                name="Perms",
                value=f"• `Build` — {rnaoPermsList[0]}\n• `Destroy` — {rnaoPermsList[1]}\n• `Switch` — {rnaoPermsList[2]}\n• `ItemUse` — {rnaoPermsList[3]}",
                inline=True
            )
            embed.add_field(
                name="Flags",
                value=f"• `PvP` — {townsLookup['perms']['flagPerms']['pvp']}\n• `Explosions` — {townsLookup['perms']['flagPerms']['explosion']}\n• `Firespread` — {townsLookup['perms']['flagPerms']['fire']}\n• `Mob Spawns` — {townsLookup['perms']['flagPerms']['mobs']}",
                inline=True
            )
            embed.add_field(
                name="Status",
                value=f"• `Capital` — {townsLookup['status']['isCapital']}\n• `Open` — {townsLookup['status']['isOpen']}\n• `Public` — {townsLookup['status']['isPublic']}\n• `Neutral` — {townsLookup['status']['isNeutral']}\n• `Overclaimed` — {townsLookup['status']['isOverClaimed']}\n• `Ruined` — {townsLookup['status']['isRuined']}",
                inline=True
            )

            await inter.response.send_message(embed=embed, ephemeral=False)

        except Exception as e:
            embed = Utils.Embeds.error_embed(
                value="If it is not evident that the error was your fault, please report it",
                footer=commandString
            )
            await inter.response.send_message(embed=embed, ephemeral=True)

    @town.sub_command(description="View all the residents of a specified town")
    async def reslist(
        self,
        inter: disnake.ApplicationCommandInteraction,
        town: str = commands.Param(description="Town's name"),
        server: str = commands.Param(
            description="Server name, defaults to Aurora",
            default="aurora",
            choices=["aurora"]
        )
    ):
        commandString = f"/town reslist town: {town} server: {server}"
        await inter.response.defer()
        try:
            townsLookup = await Utils.Lookup.lookup(server, endpoint="towns", name=town)

        except Exception as e:
            embed = Utils.Embeds.error_embed(
                value="Check if you wrote a parameter incorrectly or if the server is currently offline",
                type="userError",
                footer=commandString
            )
            await inter.response.send_message(embed=embed, ephemeral=True)
            return

        try:
            embed = Utils.Embeds.embed_builder(
                title=f"`{townsLookup['strings']['town']}'s Residents",
                footer=commandString,
                author=inter.author
            )

            residentsString = Utils.CommandTools.list_to_string(list=townsLookup["residents"])

            embed.add_field(name="Residents", value=f"```{residentsString[:1018]}```", inline=True)

            await inter.response.send_message(embed=embed, ephemeral=False)

        except Exception as e:
            embed = Utils.Embeds.error_embed(
                value="If it is not evident that the error was your fault, please report it",
                footer=commandString
            )
            await inter.response.send_message(embed=embed, ephemeral=True)

    @town.sub_command(description="View all the ranked residents of a specified town")
    async def ranklist(
        self,
        inter: disnake.ApplicationCommandInteraction,
        town: str = commands.Param(description="Town's name"),
        server: str = commands.Param(
            description="Server name, defaults to Aurora",
            default="aurora",
            choices=["aurora"]
        )
    ):
        commandString = f"/town ranklist town: {town} server: {server}"
        await inter.response.defer()
        try:
            townsLookup = await Utils.Lookup.lookup(server, endpoint="towns", name=town)

        except Exception as e:
            embed = Utils.Embeds.error_embed(
                value="Check if you wrote a parameter incorrectly or if the server is currently offline",
                type="userError",
                footer=commandString
            )
            await inter.response.send_message(embed=embed, ephemeral=True)
            return

        try:
            embed = Utils.Embeds.embed_builder(
                title=f"`{townsLookup['strings']['town']}'s Ranked Residents",
                footer=commandString,
                author=inter.author
            )

            for rank in townsLookup["ranks"]:
                if len(townsLookup["ranks"][rank]) != 0:
                    rankString = Utils.CommandTools.list_to_string(list=townsLookup["ranks"][rank])

                    embed.add_field(name=rank.capitalize(), value=f"`{rankString[:1022]}`", inline=True)

                else:
                    embed.add_field(name=rank.capitalize(), value="N/A", inline=True)

            if len(townsLookup["trusted"]) != 0:
                trustedString = Utils.CommandTools.list_to_string(list=townsLookup["trusted"])

                embed.add_field(name="Trusted", value=f"`{trustedString[:1022]}`", inline=True)

            else:
                embed.add_field(name="Trusted", value="N/A", inline=True)

            await inter.response.send_message(embed=embed, ephemeral=False)

        except Exception as e:
            embed = Utils.Embeds.error_embed(
                value="If it is not evident that the error was your fault, please report it",
                footer=commandString
            )
            await inter.response.send_message(embed=embed, ephemeral=True)

    @town.sub_command(description="View all the outlaws of a specified town")
    async def outlawlist(
        self,
        inter: disnake.ApplicationCommandInteraction,
        town: str = commands.Param(description="Town's name"),
        server: str = commands.Param(
            description="Server name, defaults to Aurora",
            default="aurora",
            choices=["aurora"]
        )
    ):
        commandString = f"/town outlawlist town: {town} server: {server}"
        await inter.response.defer()
        try:
            townsLookup = await Utils.Lookup.lookup(server, endpoint="towns", name=town)

        except Exception as e:
            embed = Utils.Embeds.error_embed(
                value="Check if you wrote a parameter incorrectly or if the server is currently offline",
                type="userError",
                footer=commandString
            )
            await inter.response.send_message(embed=embed, ephemeral=True)
            return

        try:
            embed = Utils.Embeds.embed_builder(
                title=f"`{townsLookup['strings']['town']}'s Outlaws",
                footer=commandString,
                author=inter.author
            )

            if len(townsLookup["outlaws"]) != 0:
                outlawsString = Utils.CommandTools.list_to_string(list=townsLookup["outlaws"])

                embed.add_field(name="Outlaws", value=f"```{outlawsString[:1018]}```", inline=True)

            else:
                embed.add_field(name="Outlaws", value=f"{townsLookup['strings']['town']} has no outlaws :)", inline=True)

            await inter.response.send_message(embed=embed, ephemeral=False)

        except Exception as e:
            embed = Utils.Embeds.error_embed(
                value="If it is not evident that the error was your fault, please report it",
                footer=commandString
            )
            await inter.response.send_message(embed=embed, ephemeral=True)

        @town.sub_command(
            description="Retrieve and display all the residents of a specified nation with their last login time.")
        async def activity(
                self,
                inter: disnake.ApplicationCommandInteraction,
                nation: str,
                server: str = "aurora"
        ):
            """Retrieve and display all the residents of a specified nation with their last login time."""
            commandString = f"/nation activity nation: {nation} server: {server}"

            await inter.response.defer()

            try:
                nationsLookup = Utils.Lookup.lookup(server, endpoint="towns", name=town)

                embed = Utils.Embeds.embed_builder(
                    title=f"`{nationsLookup['strings']['nation']}'s Residents and Last Login Time`",
                    footer=commandString,
                    author=inter.author
                )

                residents_list = [f"{resident['name']} - Last Login: <t:{int(resident['lastLogin'] / 1000)}:R>"
                                  for resident in nationsLookup["residents"]]
                residents_string = Utils.CommandTools.list_to_string(list=residents_list)

                embed.add_field(name="Residents and Last Login Time", value=f"```{residents_string[:1018]}```",
                                inline=True)

                await inter.send(embed=embed, ephemeral=False)

            except Exception as e:
                embed = Utils.Embeds.error_embed(
                    value="If it is not evident that the error was your fault, please report it",
                    footer=commandString
                )

                await inter.send(embed=embed, ephemeral=True)

        @town.sub_command(description="Retrieve and display the list of nations that match the specified keywords.")
        async def list(
                self,
                inter: disnake.ApplicationCommandInteraction,
                keyword: str = "chunks",
                server: str = "aurora"
        ):
            """Retrieve and display the list of nations based on keywords 'chunks' or 'balance' or defaults to 'chunks'."""
            commandString = f"/nation list keyword: {keyword} server: {server}"

            await inter.response.defer()

            try:
                if keyword.lower() == "balance":
                    townLookup = Utils.Lookup.lookup(server, endpoint="towns", sort="balance")
                elif keyword.lower() == "residents":
                    townLookup = Utils.Lookup.lookup(server, endpoint="towns", sort="residents")
                else:
                    townLookup = Utils.Lookup.lookup(server, endpoint="towns", sort="chunks")

                nation_town = [town["name"] for town in townsLookup["allTowns"]]
                town_list = Utils.CommandTools.list_to_string(list=nation_town)

                embed = Utils.Embeds.embed_builder(
                    title=f"Nations Sorted by {keyword.capitalize()}",
                    description=f"```{town_list}```",
                    footer=commandString,
                    author=inter.author
                )

                await inter.send(embed=embed, ephemeral=False)

            except Exception as e:
                embed = Utils.Embeds.error_embed(
                    value="If it is not evident that the error was your fault, please report it",
                    footer=commandString
                )

                await inter.send(embed=embed, ephemeral=True)

        # Define a global variable to store the cached towns data
        towns_cache = TTLCache(maxsize=100, ttl=60)

        @bot.command(description="Check for missing towns from the EarthMC API")
        async def missing(ctx, server: str = "aurora"):
            global towns_cache

            commandString = f"!missing server: {server}"

            try:
                # Fetch the towns from the API or use the cached data if available
                if (server, "towns") in towns_cache:
                    all_towns_lookup = towns_cache[(server, "towns")]
                else:
                    all_towns_lookup = await Utils.Lookup.lookup(server, endpoint="towns")
                    towns_cache[(server, "towns")] = all_towns_lookup

                # Extract the town names from the API response
                api_towns = set(town["name"] for town in all_towns_lookup["allTowns"])

                # Compare with the previous data (if available)
                if (server, "missing_towns") in towns_cache:
                    previous_towns = towns_cache[(server, "missing_towns")]
                    missing_towns = previous_towns - api_towns
                else:
                    # If no previous data is available, consider all towns as missing
                    missing_towns = api_towns

                if not missing_towns:
                    await ctx.send("All towns are up to date.")
                else:
                    # Fetch the missing town data from the API and add it to missing_towns_data list
                    missing_towns_data = []  # Initialize the list to store missing town data

                    for town in all_towns_lookup["allTowns"]:
                        if town["name"] in missing_towns:
                            x_coord = int(round(town["spawn"]["x"], 0))
                            z_coord = int(round(town["spawn"]["z"], 0))
                            location_url = f"https://earthmc.net/map/{server}/?zoom=4&x={x_coord}&z={z_coord}"
                            location = f"[{x_coord}, {z_coord}]({location_url})"
                            missing_towns_data.append(f"{town['name']} - Location: {location}")

                    # If you have other missing town data to add to the list, you can do it here
                    # For example:
                    # missing_towns_data.append("Some other missing town data")

                    missing_towns_str = "\n".join(missing_towns_data)
                    await ctx.send(f"The following towns are missing:\n{missing_towns_str}")

                # Update the cache with the current towns data
                towns_cache[(server, "missing_towns")] = api_towns

            except Exception as e:
                await ctx.send("An error occurred while fetching town data.")


def setup(bot):
    bot.add_cog(TownCommand(bot))
