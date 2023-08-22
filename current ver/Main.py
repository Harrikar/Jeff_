import disnake
from disnake.ext import commands
import os
from disnake.ext.commands import InteractionBot
import datetime
bot: InteractionBot = commands.InteractionBot()


dt = datetime.datetime.now()
@bot.event
async def on_ready():

    await bot.change_presence(activity=disnake.Game(name="play.earthmc.net"))
    print(f"Logged in as {bot.user}")
    print(f"Operating in {len(bot.guilds)} guild/s")
    print(f"Run at {dt}")
    print("Made by charis_k")

# bot.load_extension loads a file from another directory in this case the commands directory it loads all the scripts

#bot.load_extension("commands.ServerCommand")
bot.load_extension("commands.ResCommand")
bot.load_extension("commands.TownCommand")
bot.load_extension("commands.NationCommand")
bot.load_extension("commands.ModerationCommands")
bot.load_extension("commands.RoleManaging")
bot.load_extension("commands.LevelingSystem")
bot.load_extension("commands.VotingSystem")
bot.load_extension("commands.weather")
bot.load_extension("commands.AllianceCommand")


token = " MTEyMTc1MTQwMDI5NzI3OTU0OQ.GQC2YE.Wkh7RKdZj6MDtm73pseXD1oE__JFLfqCXpk8_U"


if token:
    bot.run(token)
else:
    print("Failed to retrieve bot token.")
