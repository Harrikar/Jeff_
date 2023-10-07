import disnake
from disnake.ext import commands
import sys
import os
import datetime
import Utils as Utils
from Utils import *
import subprocess


class devcommand(commands.Cog):


    def __init__(self, bot):
        self.bot = bot
        self.time = datetime.datetime.now()

    @commands.slash_command()
    async def restart(self, inter: disnake.ApplicationCommandInteraction):
        await inter.response.defer()

        guild = inter.guild
        member = inter.author

        role_id = 1131896754070093954
        role = disnake.utils.get(guild.roles, id=role_id)

        if role in member.roles:

            embed = Utils.Embeds.embed_builder(
                'Restarting',
                author=inter.author
            )
            embed.add_field(name='Program was run at',value=self.time,inline=True)
            await inter.edit_original_response(embed=embed)

            python = sys.executable
            subprocess.Popen([python] + sys.argv)


        else:
            await inter.send(f"{member.display_name}, you do not have the required role.")



    @commands.slash_command()
    async def stop(self, inter: disnake.ApplicationCommandInteraction):
        await inter.response.defer()

        guild = inter.guild
        member = inter.author

        role_id = 1131896754070093954
        role = disnake.utils.get(guild.roles, id=role_id)

        if role in member.roles:

            embed = Utils.Embeds.embed_builder(
                'Stopping',
                author=inter.author
            )
            embed.add_field(name='Program was run at', value=self.time, inline=True)
            await inter.edit_original_response(embed=embed)
            sys.exit()

        else:
            await inter.send(f"{member.display_name}, you do not have the required role.")

def setup(bot):

    bot.add_cog(devcommand(bot))
