import disnake
from disnake.ext import commands
import json
import os
import Utils.Utils as Utils
from Utils.Utils import *
class LevelingSystem(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
        self.user_levels = {}  # In-memory storage for user levels
        self.data_file = "user_levels.json"

        # Load user levels from the JSON file on bot startup
        self.load_data()

    def save_data(self):
        # Save the user levels to the JSON file
        with open(self.data_file, "w") as f:
            json.dump(self.user_levels, f)

    def load_data(self):
        # Load user levels from the JSON file
        if os.path.exists(self.data_file):
            with open(self.data_file, "r") as f:
                self.user_levels = json.load(f)

    @commands.slash_command(description="Leveling system command.")
    async def leveling(self, inter: disnake.ApplicationCommandInteraction):
        await inter.response.send_message("Leveling system command executed!")

    @leveling.sub_command(description="Show user level.")
    async def showlevel(self, inter: disnake.ApplicationCommandInteraction):
        user_id = inter.author.id
        user_level = self.get_user_level(user_id)
        await inter.response.send_message(f"Your current level is: {user_level}")

    @leveling.sub_command(description="Give XP to a user.")
    async def givexp(self, inter: disnake.ApplicationCommandInteraction, xp: int):
        user_id = inter.author.id
        self.give_xp_to_user(user_id, xp)
        await inter.response.send_message(f"Gave {xp} XP to you.")

    @leveling.sub_command(description="Reset user level.")
    @commands.has_permissions(administrator=True)
    async def resetlevel(self, inter: disnake.ApplicationCommandInteraction, member: disnake.Member):
        user_id = member.id
        self.reset_user_level(user_id)
        await inter.response.send_message(f"Reset the level for {member.mention}.")

    def get_user_level(self, user_id):
        # Implement the logic to fetch the user's level from the in-memory storage
        user_level = self.user_levels.get(str(user_id), 0)
        return user_level

    def give_xp_to_user(self, user_id, xp):
        # Implement the logic to give XP to the user and update their level if needed
        user_level = self.user_levels.get(str(user_id), 0)
        user_level += xp
        self.user_levels[str(user_id)] = user_level
        self.save_data()  # Save the updated data

    def reset_user_level(self, user_id):
        # Implement the logic to reset the user's level to the default value
        self.user_levels[str(user_id)] = 0
        self.save_data()  # Save the updated data

def setup(bot):
    bot.add_cog(LevelingSystem(bot))
