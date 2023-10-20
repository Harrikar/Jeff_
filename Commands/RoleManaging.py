import disnake
from disnake.ext import commands
import Utils.Utils as Utils
from Utils.Utils import *
class RoleManaging(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.slash_command(name="rolemanager", description="Manage roles for a member")
    async def rolemanager(self, inter: disnake.ApplicationCommandInteraction):
        await inter.response.defer()  # Defer the initial response
        await self.process_rolemanager(inter)

    async def process_rolemanager(self, inter: disnake.ApplicationCommandInteraction):
        try:
            await inter.followup.send(f"Role manager command executed!", ephemeral=True)
        except disnake.Forbidden:
            await inter.response.send_message("I don't have permissions to manage roles.")

    @rolemanager.sub_command(description="Add roles to a member")
    @commands.has_permissions(manage_roles=True)
    async def addrole(self, inter: disnake.ApplicationCommandInteraction, member: disnake.Member, role: disnake.Role):
        await inter.response.defer()  # Defer the initial response
        await self.process_addrole(inter, member, role)

    async def process_addrole(self, inter: disnake.ApplicationCommandInteraction, member: disnake.Member, role: disnake.Role):
        try:
            await member.add_roles(role)
            await inter.followup.send(f'{member.mention} has been given the {role.name} role.', ephemeral=True)
        except disnake.Forbidden:
            await inter.followup.send("I don't have permissions to manage roles.")

    @rolemanager.sub_command(description="Remove roles from a member")
    @commands.has_permissions(manage_roles=True)
    async def removerole(self, inter: disnake.ApplicationCommandInteraction, member: disnake.Member, role: disnake.Role):
        await inter.response.defer()  # Defer the initial response
        await self.process_removerole(inter, member, role)

    async def process_removerole(self, inter: disnake.ApplicationCommandInteraction, member: disnake.Member, role: disnake.Role):
        try:
            await member.remove_roles(role)
            await inter.followup.send(f'{member.mention} has been removed from the {role.name} role.', ephemeral=True)
        except disnake.Forbidden:
            await inter.followup.send("I don't have permissions to manage roles.")

    @addrole.error
    @removerole.error
    async def command_error(self, inter: disnake.ApplicationCommandInteraction, error):
        if isinstance(error, commands.MissingPermissions):
            await inter.followup.send("You don't have the necessary permissions to use this command.", ephemeral=True)
        elif isinstance(error, commands.BadArgument):
            await inter.followup.send("Invalid argument. Please provide the correct input.", ephemeral=True)
        else:
            await inter.followup.send("An error occurred while executing the command.", ephemeral=True)

def setup(bot):
    bot.add_cog(RoleManaging(bot))

