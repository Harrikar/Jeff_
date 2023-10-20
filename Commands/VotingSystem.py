import disnake
from disnake.ext import commands
import random
import Utils.Utils
from Utils import *
from disnake import reaction

class Vote(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.slash_command(description="Vote-related commands.")
    async def vote(self, inter: disnake.ApplicationCommandInteraction):
        pass

    @vote.sub_command(name="poll", description="Create a poll with multiple options")
    async def poll(
        self,
        inter: disnake.ApplicationCommandInteraction,
        question: str,
        options: str,
        ctx
    ):
        try:
            characters = ['a', 'A', 'b', 'B', 'c', 'C', 'd', 'D', 'e', 'E',
                          'f', 'F', 'g', 'G', 'h', 'H', 'i', 'I', 'j', 'J', 'k',
                          'K', 'l', 'L', 'm', 'M', 'n', 'N', 'o', 'O', 'p', 'P',
                        'q', 'Q', 'r', 'R', 's', 'S', 't', 'T', 'u', 'U', 'v',
                          'V', 'w', 'W', 'x', 'X', 'y', 'Y', 'z', 'Z','1','2','3',
                          '4','5','6','7','8','9','0'
                                                                                                                                                                                                                                                                                                                                 '']
            num_characters = 6
            random_characters = random.choices(characters, k=num_characters)
            random_string = ''.join(random_characters)

            options_list = options.split(",")  # Split the options string into a list
            if not (2 <= len(options_list) <= 10):
                await inter.response.send_message(
                    "You need to provide at least 2 options and up to 10 options for the poll."
                )
                pass
            await ctx.send(f'Hey {inter.author} {random_string} is your poll id you need it to see the results',epheral=True)
            option_emojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"]

            poll_embed = Utils.Utils.Embeds.embed_builder(
                title=f"📊 Poll: {question}",
                author=inter.author
            )

            for i, option in enumerate(options_list):
                poll_embed.add_field(name=f"{option_emojis[i]}", value=option, inline=False)

            message = await inter.response.send_message(embed=poll_embed)

            for i in range(min(len(options_list), len(option_emojis))):
                await message.add_reaction(option_emojis[i])

        except disnake.NotFound:
            await inter.response.send_message("The interaction is not found or has expired. Please try again.")

    async def finish(self,inter: disnake.ApplicationCommandInteraction):pass


def setup(bot):
    bot.add_cog(Vote(bot))
