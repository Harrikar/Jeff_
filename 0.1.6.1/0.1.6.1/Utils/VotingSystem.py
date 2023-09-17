import disnake
from disnake.ext import commands
import Utils as Utils
import Utils as Utils
from Utils import *
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
        options: str
    ):
        try:
            options_list = options.split(",")  # Split the options string into a list
            if not (2 <= len(options_list) <= 10):
                await inter.response.send_message(
                    "You need to provide at least 2 options and up to 10 options for the poll."
                )
                return

            option_emojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"]

            poll_embed = disnake.Embed(
                title=f"📊 Poll: {question}",
                color=disnake.Color.green(),
                author=disnake.EmbedAuthor(name=str(inter.author))
            )

            for i, option in enumerate(options_list):
                poll_embed.add_field(name=f"{option_emojis[i]}", value=option, inline=False)

            message = await inter.response.send_message(embed=poll_embed)

            for i in range(min(len(options_list), len(option_emojis))):
                await message.add_reaction(option_emojis[i])

        except disnake.NotFound:
            await inter.response.send_message("The interaction is not found or has expired. Please try again.")

    @vote.sub_command(name="tally", description="Tally the votes in a poll")
    async def tally(
        self,
        inter: disnake.ApplicationCommandInteraction,
        message: disnake.Message
    ):
        try:
            message = await message.channel.fetch_message(message.id)
            if not message:
                await inter.response.send_message("The provided message could not be found.")
                return

            if not message.embeds or not message.embeds[0].title.startswith("📊 Poll:"):
                await inter.response.send_message("The provided message is not a valid poll.")
                return

            poll_embed = message.embeds[0]
            options = [(field.name, field.value) for field in poll_embed.fields]
            tally_results = {}

            for option_emoji, _ in options:
                tally_results[option_emoji] = 0

            for reaction in message.reactions:
                emoji = str(reaction.emoji)
                if emoji in tally_results:
                    tally_results[emoji] = reaction.count - 1

            tally_embed = disnake.Embed(
                title="📊 Poll Tally",
                color=disnake.Color.dark_green(),
                author=disnake.EmbedAuthor(name=str(inter.author), icon_url=inter.author.avatar.url)
            )
            for emoji, option in options:
                tally_embed.add_field(name=f"{emoji} - {option}", value=f"Votes: {tally_results[emoji]}", inline=False)

            await inter.response.send_message(embed=tally_embed)

        except disnake.NotFound:
            await inter.response.send_message("The interaction is not found or has expired. Please try again.")

        except disnake.HTTPException:
            await inter.response.send_message(
                "An error occurred while fetching the poll message. Please make sure you provided the correct message ID."
            )

        except Exception as e:
            await inter.response.send_message(f"An unexpected error occurred: {e}")


def setup(bot):
    bot.add_cog(Vote(bot))
