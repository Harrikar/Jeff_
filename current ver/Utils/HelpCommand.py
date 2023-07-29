import disnake
from disnake.ext import commands
import Utils
from Utils import *
import NationCommand
from NationCommand import NationCommand
import ResCommand
from ResCommand import ResCommand
import TownCommand
from TownCommand import TownCommand
import AllianceCommand
from AllianceCommand import AllianceCommand
import ServerCommand
from ServerCommand import ServerCommand
import VotingSystem
from VotingSystem import VoteCommand
import weather
from weather import WeatherCommand
import LevelingSystem
from LevelingSystem import LevelingSystem

import disnake
from disnake.ext import commands

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
