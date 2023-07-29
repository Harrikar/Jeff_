import disnake
from disnake.ext import commands
import Utils
from Utils import *

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

def setup(bot):
    bot.add_cog(HelpCog(bot))
