import datetime
import disnake
from disnake.ext import commands
import subprocess
import aiohttp
import time
import Utils as Utils
from Utils import *
import sys
import pytz
class devcommand(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
        self.timezone = pytz.timezone('Europe/Athens')
        self.time = datetime.datetime.now(self.timezone)

    @commands.slash_command()
    async def restart(self, inter: disnake.ApplicationCommandInteraction):
        guild = inter.guild
        member = inter.author

        role_id = 1131896754070093954
        role = disnake.utils.get(guild.roles, id=role_id)

        if role in member.roles:
            embed = Utils.Embeds.embed_builder('Restarting', author=inter.author)
            embed.add_field(name='Program was run at', value=self.time, inline=True)
            await inter.edit_original_response(embed=embed)

            python = sys.executable
            subprocess.run([python] + sys.argv)
        else:
            await inter.send(f"{member.display_name}, you do not have the required role.")

    async def get_discord_api_latency(self):
        async with aiohttp.ClientSession() as session:
            start_time = time.time()
            async with session.get('https://discord.com/api/v10/gateway') as response:
                end_time = time.time()
                latency = (end_time - start_time) * 1000
                return latency

    @commands.slash_command()
    async def stop(self, inter: disnake.ApplicationCommandInteraction):
        await inter.response.defer()
        guild = inter.guild
        member = inter.author
        role_id = 1131896754070093954
        role = disnake.utils.get(guild.roles, id=role_id)

        if role in member.roles:
            embed = Utils.Embeds.embed_builder('Stopping', author=inter.author)
            embed.add_field(name='Program was run at', value=self.time, inline=True)
            await inter.edit_original_response(embed=embed)
            exit(code=2)
        else:
            await inter.send(f"{member.display_name}, you do not have the required role.")

    @commands.slash_command()
    async def ping(self, inter: disnake.ApplicationCommandInteraction):
        await inter.response.defer()

        bot_latency = self.bot.latency * 1000
        api_latency = await self.get_discord_api_latency()
        embed = Utils.Embeds.embed_builder('Pong!.', author=inter.author)
        embed.add_field(name='Bot latency is', value=f'{bot_latency:.2f} ms', inline=True)
        embed.add_field(name='Discord API latency is', value=f'{api_latency:.2f} ms', inline=True)
        embed.add_field(name=f'Program was run at', value=self.time, inline=True)

        await inter.edit_original_response(embed=embed)


def setup(bot):
    bot.add_cog(devcommand(bot))
