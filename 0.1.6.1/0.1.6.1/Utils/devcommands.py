import disnake
from disnake.ext import commands
import sys
import os
import Utils
import datetime
from Utils import Embeds
class devcommand(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
        self.time = datetime.datetime.now()

    @commands.slash_command(name="restart command")
    async def restart(self, ctx,inter: disnake.ApplicationCommandInteraction,
):
        await inter.response.defer()

        guild = ctx.guild
        member = ctx.author

        role_id = 1131896754070093954
        role = disnake.utils.get(guild.roles, id=role_id)

        if role in member.roles:

            embed = Embeds.embed_builder(
                'Restarting',
                author=inter.author
            )
            embed.add_field(name='Program was run at',value=self.time,inline=True)
            embed.color(inter.author.accent_color)
            python = sys.executable
            os.execl(python, python, *sys.argv)

        else:
            await ctx.send(f"{member.display_name}, you do not have the required role.")