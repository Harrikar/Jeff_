import datetime
import disnake
import aiohttp
import traceback
from cachetools import TTLCache

class CommandTools:
    def list_to_string(*args):
        return "\n".join(str(item) for item in args)

    @staticmethod
    def get_weather(serverLookup):
        if serverLookup["world"]["hasStorm"] and serverLookup["world"]["isThundering"]:
            weather = "Thundering"
        elif serverLookup["world"]["hasStorm"]:
            weather = "Raining"
        else:
            weather = "Clear"

        return weather

    @staticmethod
    def rnao_perms(json):
        rnaoPermsList = []
        permsKeyList = ["buildPerms", "destroyPerms", "switchPerms", "itemUsePerms"]

        count = 0
        for section in json["perms"]["rnaoPerms"]:
            try:
                resident = json["perms"]["rnaoPerms"][permsKeyList[count]]["resident"]
            except:
                friend = json["perms"]["rnaoPerms"][permsKeyList[count]]["friend"]
            try:
                nation = json["perms"]["rnaoPerms"][permsKeyList[count]]["nation"]
            except:
                town = json["perms"]["rnaoPerms"][permsKeyList[count]]["town"]
            ally = json["perms"]["rnaoPerms"][permsKeyList[count]]["ally"]
            outsider = json["perms"]["rnaoPerms"][permsKeyList[count]]["outsider"]

            rnaoString = "----"
            try:
                if resident:
                    rnaoString = "r" + rnaoString[1:]
            except:
                if friend:
                    rnaoString = "f" + rnaoString[1:]
            try:
                if nation:
                    rnaoString = rnaoString[:1] + "n" + rnaoString[2:]
            except:
                if town:
                    rnaoString = rnaoString[:1] + "t" + rnaoString[2:]
            if ally:
                rnaoString = rnaoString[:2] + "a" + rnaoString[3:]
            if outsider:
                rnaoString = rnaoString[:-1] + "o"

            rnaoPermsList.append(rnaoString)

            count = count + 1

        return rnaoPermsList


class Lookup:
    cache = TTLCache(maxsize=400, ttl=150)

    try:
        if len(cache) == cache.maxsize:
            cache.clear()

    except Exception as e:
        raise e

    @classmethod
    async def lookup(cls, server:str= 'aurora', endpoint=None, name=None):
        try:

            if endpoint is None:
                api_url = f"https://api.earthmc.net/v1/{server}/"
            elif name is None:
                api_url = f"https://api.earthmc.net/v1/{server}/{endpoint}"
            elif endpoint == 'alliance':
                api_url = f'https://emctoolkit.vercel.app/api/aurora/alliances/{name}'
            else:
                api_url = f"https://api.earthmc.net/v1/{server}/{endpoint}/{name}"


            # Check if the data is already cached
            if (server, endpoint, name) in cls.cache:
                return cls.cache[(server, endpoint, name)]
            async with aiohttp.ClientSession() as session:
                async with session.get(api_url) as response:
                    lookup = await response.json()

            cls.cache[(server, endpoint, name)] = lookup
            return lookup
        except Exception as e:
            raise e

class Embeds:

     @staticmethod
     def embed_builder(title,description=None, author=None, footer='Maintained by charis_k', thumbnail=None, maintain_bot=False,
                        your_name=None):
        embed = disnake.Embed(
            title=title,
            description=description,
            color=0x008000,
            timestamp=datetime.datetime.now()
         )

        if author is not None:
            if maintain_bot:
                bot_name = ""
                embed.set_author(
                    name=f"Queried by {author.display_name} - Maintained by {bot_name}",
                    icon_url=author.avatar.url if author.avatar else None
                )
            else:
                if your_name:
                    embed.set_author(
                        name=f"Queried by {author.display_name} - Maintained by {your_name}",
                        icon_url=author.avatar.url if author.avatar else None
                    )
                else:
                    embed.set_author(
                        name=f"Queried by {author.display_name}",
                        icon_url=author.avatar.url if author.avatar else None
                    )

        if footer is not None:
            embed.set_footer(
                icon_url="https://cdn.discordapp.com/attachments/1102246811479060591/1130793081432707092/Screenshot_2023-07-18_at_4.27.56_AM.png",
                text=footer
            )
        else:
            embed.set_footer(
                icon_url="https://cdn.discordapp.com/attachments/1102246811479060591/1130793081432707092/Screenshot_2023-07-18_at_4.27.56_AM.png",
                text="Jeff_"
            )

        if thumbnail is not None:
            embed.set_thumbnail(url=thumbnail)

            embed.set_image(
            url="https://cdn.discordapp.com/attachments/1050945545037951048/1099030835220467872/linebreak.png")

        return embed

     @staticmethod
     def error_embed(value,type=None, footer=None,):
        if type != "userError":
            traceback.print_exc()
        embed = Embeds.embed_builder(title="`Error`", footer=footer)

        embed.add_field(name="Something went wrong", value=value, inline=True)

        return embed

