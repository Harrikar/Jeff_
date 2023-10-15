import disnake
from disnake.ext import commands
import os

from disnake.ext.commands import InteractionBot

bot: InteractionBot = commands.InteractionBot()

@bot.event
async def on_ready():
    await bot.change_presence(activity=disnake.Game(name="play.earthmc.net"))
    print(f"Logged in as {bot.user}")
    print(f"Operating in {len(bot.guilds)} guild/s")
    print(f'Presence is playing : play.earthmc.net')
    print("Made by charis_k")

# bot.load_extension loads a file from another directory in this case the Commands directory it loads all the scripts

bot.load_extension("Commands.ServerCommand")
bot.load_extension("Commands.ResCommand")
bot.load_extension("Commands.TownCommand")
bot.load_extension("Commands.NationCommand")
bot.load_extension("Commands.ModerationCommands")
# bot.load_extension("Commands.RoleManaging")
# bot.load_extension("Commands.LevelingSystem")
# bot.load_extension("Commands.VotingSystem")
bot.load_extension("Commands.weather")
# bot.load_extension("Commands.AllianceCommand")
bot.load_extension("Commands.devcommands")

try:
    token = os.environ.get('TOKEN')
    bot.run(token)
except Exception as e:
    raise e
