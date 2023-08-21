import disnake
from disnake.ext import commands
import aiohttp


class ModerationCommands(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    users_to_ban = [788324758390964255]

    @commands.slash_command(description="Moderation commands.")
    async def moderation(self, inter: disnake.ApplicationCommandInteraction):
        pass

    @moderation.sub_command(description="Kick a member from the server")
    @commands.has_permissions(kick_members=True)
    async def kick(self, inter: disnake.ApplicationCommandInteraction, member: disnake.Member, reason: str):
        await inter.response.defer()

        if not inter.guild.me.guild_permissions.kick_members:
            await inter.edit_original_message(content="I don't have permissions to kick members.")
            return

        try:
            await member.kick(reason=reason)
        except disnake.Forbidden:
            await inter.edit_original_message(content="An error occurred while trying to kick the member.")
            return

        kick_embed = disnake.Embed(
            title="Member Kicked",
            description=f"{member.mention} has been kicked from the server.",
            color=disnake.Color.red()
        )
        kick_embed.add_field(name="Reason", value=reason)

        await inter.edit_original_response(embed=kick_embed)

    @moderation.sub_command(description="Ban a member from the server")
    @commands.has_permissions(ban_members=True)
    async def ban(self, inter: disnake.ApplicationCommandInteraction, member: disnake.Member, *, reason="No reason provided"):
        await inter.response.defer()

        try:
            await member.ban(reason=reason)
            await inter.response.send_message(f'{member.mention} has been banned. Reason: {reason}')
        except disnake.Forbidden:
            await inter.response.send_message("I don't have permissions to ban members.")

    @moderation.sub_command(description="Delete a message from a member")
    @commands.has_permissions(manage_messages=True)
    async def clear(self, inter: disnake.ApplicationCommandInteraction, amount: int):
        await inter.response.defer()

        try:
            await inter.channel.purge(limit=amount + 1)
            await inter.response.send_message(f'{amount} messages deleted.')
        except disnake.Forbidden:
            await inter.response.send_message("I don't have permissions to manage messages.")

    @moderation.sub_command(description="Warn a member")
    @commands.has_permissions(kick_members=True)
    async def warn(self, inter: disnake.ApplicationCommandInteraction, member: disnake.Member, *, reason="No reason provided"):
        await inter.response.defer()

        try:
            await member.send(f"You have been warned in {inter.guild.name}. Reason: {reason}")
            await member.send(f"If you get 2 more warnings in {inter.guild.name}, you will get banned.")
            await inter.response.send_message(f'{member.mention} has been warned. Reason: {reason}')
        except disnake.Forbidden:
            await inter.response.send_message("I don't have permissions to warn members.")

    @commands.Cog.listener()
    async def on_connect(self):
        for guild in self.bot.guilds:
            for user_id in self.users_to_ban:
                user = guild.get_member(user_id)
                if user:
                    try:
                        await user.ban(reason="You are banned from this server.")
                        print(f"Banned user {user_id} from server {guild.name}")
                    except disnake.Forbidden:
                        print(f"Bot does not have permission to ban in server {guild.name}")
                    except disnake.NotFound:
                        print(f"User {user_id} not found in server {guild.name}")

    @kick.error
    @ban.error
    @clear.error
    @warn.error
    async def command_error(self, inter, error):
        if isinstance(error, commands.MissingPermissions):
            await inter.response.send_message("You don't have the necessary permissions to use this command.")
        elif isinstance(error, commands.BadArgument):
            await inter.response.send_message("Invalid argument. Please provide the correct input.")
        else:
            await inter.response.send_message("An error occurred while executing the command.")

    async def make_http_request(self, url, method='GET', **kwargs):
        async with aiohttp.ClientSession() as session:
            async with session.request(method, url, **kwargs) as response:
                return await response.json()

def setup(bot):
    bot.add_cog(ModerationCommands(bot))
