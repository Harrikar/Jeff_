import disnake
from disnake.ext import commands
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
    # Register commands from custom command classes
    cogs = [AllianceCommand(), LevelingSystem(), NationCommand(), ResCommand(),
            ServerCommand(), TownCommand(), VoteCommand(), WeatherCommand(), HelpCog(bot)]

    for cog in cogs:
        bot.add_cog(cog)


def setup(bot):
    register_commands(bot)
