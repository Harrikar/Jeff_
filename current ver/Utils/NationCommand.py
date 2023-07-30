import random
import disnake
from disnake.ext import commands
import Utils as Utils
from Utils import *
from disnake.errors import InteractionTimedOut

class NationCommand(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.slash_command(description="Nation-related commands.")
    async def nation(self, inter: disnake.ApplicationCommandInteraction):
        pass

    @nation.sub_command(description="Retrieve and display general information about a nation.")
    async def search(
            self,
            inter: disnake.ApplicationCommandInteraction,
            nation: str = "random",
            server: str = "aurora"
    ):
        """Retrieve and display general information about a nation."""
        commandString = f"/nation search nation: {nation} server: {server}"

        await inter.response.defer()

        try:
            if nation.lower() == "random":
                allNationsLookup = await Utils.Lookup.lookup(server, endpoint="nations")
                nation = random.choice(allNationsLookup["allNations"])

            nationsLookup = await Utils.Lookup.lookup(server, endpoint="nations", name=nation)
            locationUrl = f"https://earthmc.net/map/{server}/?zoom=4&x={nationsLookup['spawn']['x']}&z={nationsLookup['spawn']['z']}"

            embed = Utils.Embeds.embed_builder(
                title=f"`{nationsLookup['strings']['nation']}`",
                description=nationsLookup["strings"]["board"],
                footer=commandString,
                author=inter.author
            )

            embed.add_field(name="King", value=nationsLookup["strings"]["king"], inline=True)
            embed.add_field(name="Capital", value=nationsLookup["strings"]["capital"], inline=True)
            embed.add_field(
                name="Location",
                value=f"[{int(round(nationsLookup['spawn']['x'], 0))}, {int(round(nationsLookup['spawn']['z'], 0))}]({locationUrl})",
                inline=True
            )

            embed.add_field(name="Residents", value=nationsLookup["stats"]["numResidents"], inline=True)
            embed.add_field(name="Towns", value=nationsLookup["stats"]["numTowns"], inline=True)
            embed.add_field(
                name="Chunks",
                value=f"{nationsLookup['stats']['numTownBlocks']} ({nationsLookup['stats']['numTownBlocks'] * 16 + (48 * nationsLookup['stats']['numTowns'])}G)",
                inline=True
            )

            embed.add_field(name="Balance", value=f"{nationsLookup['stats']['balance']}G", inline=True)
            embed.add_field(
                name="Founded",
                value=f"<t:{round(nationsLookup['timestamps']['registered'] / 1000)}:R>",
                inline=True
            )
            embed.add_field(
                name="Status",
                value=f"• `Open` — {nationsLookup['status']['isOpen']}\n• `Public` — {nationsLookup['status']['isPublic']}\n• `Neutral` — {nationsLookup['status']['isNeutral']}",
                inline=True
            )

            await inter.edit_original_response(embed=embed)

        except Exception as e:
            embed = Utils.Embeds.error_embed(
                value="An error occurred while processing your request.",
                footer=commandString
            )

            await inter.edit_original_response(embed=embed)

    @nation.sub_command(description="View all the residents of a specified nation.")
    async def reslist(
            self,
            inter: disnake.ApplicationCommandInteraction,
            nation: str,
            server: str = "aurora"
    ):
        """Retrieve and display the list of residents in a nation."""
        commandString = f"/nation reslist nation: {nation} server: {server}"

        await inter.response.defer()

        try:
            nationsLookup = await Utils.Lookup.lookup(server, endpoint="nations", name=nation)

            embed = Utils.Embeds.embed_builder(
                title=f"`{nationsLookup['strings']['nation']}'s Residents`",
                footer=commandString,
                author=inter.author
            )

            residentsString = Utils.CommandTools.list_to_string(list=nationsLookup["residents"])

            embed.add_field(name="Residents", value=f"```{residentsString[:1018]}```", inline=True)

            await inter.edit_original_response(embed=embed)

        except Exception as e:
            embed = Utils.Embeds.error_embed(
                value="If it is not evident that the error was your fault, please report it",
                footer=commandString
            )

            await inter.edit_original_response(embed=embed, ephemeral=True)

    @nation.sub_command(description="Retrieve and display the list of ranked residents in a nation.")
    async def ranklist(
            self,
            inter: disnake.ApplicationCommandInteraction,
            nation: str,
            server: str = "aurora"
    ):
        """Retrieve and display the list of ranked residents in a nation."""
        commandString = f"/nation ranklist nation: {nation} server: {server}"

        await inter.response.defer()

        try:
            nationsLookup = await Utils.Lookup.lookup(server, endpoint="nations", name=nation)

            embed = Utils.Embeds.embed_builder(
                title=f"`{nationsLookup['strings']['nation']}'s Ranked Residents`",
                footer=commandString,
                author=inter.author
            )

            for rank in nationsLookup["ranks"]:
                if len(nationsLookup["ranks"][rank]) != 0:
                    rankString = Utils.CommandTools.list_to_string(list=nationsLookup["ranks"][rank])

                    embed.add_field(name=rank.capitalize(), value=f"`{rankString[:1022]}`", inline=True)

                else:
                    embed.add_field(name=rank.capitalize(), value="N/A", inline=True)

            await inter.edit_original_response(embed=embed)

        except Exception as e:
            embed = Utils.Embeds.error_embed(
                value="If it is not evident that the error was your fault, please report it",
                footer=commandString
            )

            await inter.edit_original_response(embed=embed, ephemeral=True)

# ... (previous code) ...

    @nation.sub_command(description="Retrieve and display the list of allies of a nation.")
    async def allylist(
            self,
            inter: disnake.ApplicationCommandInteraction,
            nation: str,
            server: str = "aurora"
    ):
        """Retrieve and display the list of allies of a nation."""
        commandString = f"/nation allylist nation: {nation} server: {server}"

        await inter.response.defer()

        try:
            nationsLookup = await Utils.Lookup.lookup(server, endpoint="nations", name=nation)

            embed = Utils.Embeds.embed_builder(
                title=f"`{nationsLookup['strings']['nation']}'s Allies`",
                footer=commandString,
                author=inter.author
            )

            if len(nationsLookup["allies"]) != 0:
                alliesString = Utils.CommandTools.list_to_string(list=nationsLookup["allies"])

                embed.add_field(name="Allies", value=f"```{alliesString[:1018]}```", inline=True)

            else:
                embed.add_field(
                    name="Allies",
                    value=f"{nationsLookup['strings']['nation']} has no allies :(",
                    inline=True
                )

            await inter.edit_original_response(embed=embed)

        except Exception as e:
            embed = Utils.Embeds.error_embed(
                value="If it is not evident that the error was your fault, please report it",
                footer=commandString
            )

            await inter.edit_original_response(embed=embed, ephemeral=True)

    @nation.sub_command(description="Retrieve and display the list of enemies of a nation.")
    async def enemylist(
            self,
            inter: disnake.ApplicationCommandInteraction,
            nation: str,
            server: str = "aurora"
    ):
        """Retrieve and display the list of enemies of a nation."""
        commandString = f"/nation enemylist nation: {nation} server: {server}"

        await inter.response.defer()

        try:
            nationsLookup = await Utils.Lookup.lookup(server, endpoint="nations", name=nation)

            embed = Utils.Embeds.embed_builder(
                title=f"`{nationsLookup['strings']['nation']}'s Enemies`",
                footer=commandString,
                author=inter.author
            )

            if len(nationsLookup["enemies"]) != 0:
                enemiesString = Utils.CommandTools.list_to_string(list=nationsLookup["enemies"])

                embed.add_field(name="Enemies", value=f"```{enemiesString[:1018]}```", inline=True)

            else:
                embed.add_field(
                    name="Enemies",
                    value=f"{nationsLookup['strings']['nation']} has no enemies :)",
                    inline=True
                )

            await inter.edit_original_response(embed=embed)

        except Exception as e:
            embed = Utils.Embeds.error_embed(
                value="If it is not evident that the error was your fault, please report it",
                footer=commandString
            )

            await inter.edit_original_response(embed=embed, ephemeral=True)

    @nation.sub_command(description="Retrieve and display the list of towns in a nation.")
    async def townlist(
            self,
            inter: disnake.ApplicationCommandInteraction,
            nation: str,
            server: str = "aurora"
    ):
        """Retrieve and display the list of towns in a nation."""
        commandString = f"/nation townlist nation: {nation} server: {server}"

        await inter.response.defer()

        try:
            nationsLookup = await Utils.Lookup.lookup(server, endpoint="nations", name=nation)

            embed = Utils.Embeds.embed_builder(
                title=f"`{nationsLookup['strings']['nation']}'s Towns`",
                footer=commandString,
                author=inter.author
            )

            townsString = Utils.CommandTools.list_to_string(list=nationsLookup["towns"])

            embed.add_field(name="Towns", value=f"```{townsString[:1018]}```", inline=True)

            await inter.edit_original_response(embed=embed)

        except Exception as e:
            embed = Utils.Embeds.error_embed(
                value="If it is not evident that the error was your fault, please report it",
                footer=commandString
            )

            await inter.edit_original_response(embed=embed, ephemeral=True)

    @nation.sub_command(description="Retrieve and display the list of nations that the specified nation hasn't allied yet.")
    async def unallied(
            self,
            inter: disnake.ApplicationCommandInteraction,
            nation: str,
            server: str = "aurora"
    ):
        """Retrieve and display the list of nations that the specified nation hasn't allied yet."""
        commandString = f"/nation unallied nation: {nation} server: {server}"

        await inter.response.defer()

        try:
            nationsLookup = await Utils.Lookup.lookup(server, endpoint="nations", name=nation)
            allNationsLookup = await Utils.Lookup.lookup(server, endpoint="nations")

            embed = Utils.Embeds.embed_builder(
                title=f"`{nationsLookup['strings']['nation']}'s Unallied Nations`",
                footer=commandString,
                author=inter.author
            )

            allyList = nationsLookup["allies"]
            allNations = allNationsLookup["allNations"]
            allNations.remove(nationsLookup["strings"]["nation"])

            unalliedList = list(set(allNations).difference(set(allyList)))
            if len(unalliedList) != 0:
                # Split unalliedList into multiple fields if needed
                for i in range(0, len(unalliedList), 15):  # Display 15 unallied nations per field
                    unalliedString = " ".join(unalliedList[i:i + 15])
                    embed.add_field(name=f"Unallied (Continued)" if i > 0 else "Unallied",
                                    value=f"```{unalliedString}```", inline=True)

            else:
                embed.add_field(
                    name="Unallied",
                    value=f"{nationsLookup['strings']['nation']} has allied everyone :)",
                    inline=True
                )

            await inter.edit_original_response(embed=embed)

        except Exception as e:
            embed = Utils.Embeds.error_embed(
                value="If it is not evident that the error was your fault, please report it",
                footer=commandString
            )

            await inter.edit_original_response(embed=embed, ephemeral=True)

        @nation.sub_command(description="Retrieve and display the list of nations that match the specified keywords.")
        async def list(
                self,
                inter: disnake.ApplicationCommandInteraction,
                keyword: str = "chunks",
                server: str = "aurora"
        ):

            commandString = f"/nation list keyword: {keyword} server: {server}"

            await inter.response.defer()

            try:
                if keyword.lower() == "balance":
                    nationsLookup = Utils.Lookup.lookup(server, endpoint="nations", sort="balance")
                elif keyword.lower() == "residents":
                    nationsLookup = Utils.Lookup.lookup(server, endpoint="nations", sort="residents")
                else:
                    nationsLookup = Utils.Lookup.lookup(server, endpoint="nations", sort="chunks")




                nation_names = [nation["name"] for nation in nationsLookup["allNations"]]
                nation_list = Utils.CommandTools.list_to_string(list=nation_names)

                embed = Utils.Embeds.embed_builder(
                    title=f"Nations Sorted by {keyword.capitalize()}",
                    description=f"```{nation_list}```",
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

        @nation.sub_command(
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
                nationsLookup = Utils.Lookup.lookup(server, endpoint="nations", name=nation)

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




def setup(bot):
    bot.add_cog(NationCommand(bot))
