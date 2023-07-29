import disnake
from disnake.ext import commands
import AllianceCommand
import LevelingSystem
import NationCommand
import ResCommand
import ServerCommand
import TownCommand
from AllianceCommand import AllianceCommand
from LevelingSystem import LevelingSystem
from NationCommand import NationCommand
from ResCommand import ResCommand
from ServerCommand import ServerCommand
from TownCommand import TownCommand
from VotingSystem import VoteCommand
from weather import WeatherCommand


class HelpCog(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    def get_commands_embed(self):
        embed = disnake.Embed(title="Bot Commands", description="Here are all the available commands:")
        for command in self.bot.commands:
            embed.add_field(name=f"/{command.name}", value=command.description or "No description provided", inline=False)
        return embed

    @commands.slash_command(description="Display all the commands")
    async def help(self, ctx):
        embed = self.get_commands_embed()
        await ctx.send(embed=embed)


def register_commands(bot):
     # Register all subcommands of the `nation` command
    for subcommand in NationCommand.__cog_commands__:
        if isinstance(subcommand, commands.Group):
            for subcommand_option in subcommand.__cog_commands__:
                bot.add_command(subcommand_option)
        else:
            bot.add_command(subcommand)


    for subcommand in TownCommand.__cog_commands__:
        if isinstance(subcommand, commands.Group):
            for subcommand_option in subcommand.__cog_commands__:
                bot.add_command(subcommand_option)
        else:
            bot.add_command(subcommand)

    for subcommand in ResCommand.__cog_commands__:
        if isinstance(subcommand, commands.Group):
            for subcommand_option in subcommand.__cog_commands__:
                bot.add_command(subcommand_option)
        else:
            bot.add_command(subcommand)


    for subcommand in AllianceCommand.__cog_commands__:
        if isinstance(subcommand, commands.Group):
            for subcommand_option in subcommand.__cog_commands__:
                bot.add_command(subcommand_option)
        else:
            bot.add_command(subcommand)



    for subcommand in TownCommand.__cog_commands__:
        if isinstance(subcommand, commands.Group):
            for subcommand_option in subcommand.__cog_commands__:
                bot.add_command(subcommand_option)
        else:
            bot.add_command(subcommand)


    for subcommand in ServerCommand.__cog_commands__:
        if isinstance(subcommand, commands.Group):
            for subcommand_option in subcommand.__cog_commands__:
                bot.add_command(subcommand_option)
        else:
            bot.add_command(subcommand)


    for subcommand in VoteCommand.__cog_commands__:
        if isinstance(subcommand, commands.Group):
            for subcommand_option in subcommand.__cog_commands__:
                bot.add_command(subcommand_option)
        else:
            bot.add_command(subcommand)


    for subcommand in WeatherCommand.__cog_commands__:
        if isinstance(subcommand, commands.Group):
            for subcommand_option in subcommand.__cog_commands__:
                bot.add_command(subcommand_option)
        else:
            bot.add_command(subcommand)


    for subcommand in LevelingSystem.__cog_commands__:
        if isinstance(subcommand, commands.Group):
            for subcommand_option in subcommand.__cog_commands__:
                bot.add_command(subcommand_option)
        else:
            bot.add_command(subcommand)

def setup(bot):
    bot.add_cog(HelpCog(bot))
