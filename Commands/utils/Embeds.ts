import { Client,User,} from 'discord.js';
import {MessageEmbed} from 'discord.js'

class Embeds {
  static embedBuilder(
    title: string,
    description: string | null = null,
    author: User | null = null,
    footer: string | null = null,
    thumbnail: string | null = null,
    maintain_bot = false,
    your_name: string | null = null
  ): MessageEmbed {
    const embed = new MessageEmbed()
      .setTitle(title)
      .setDescription(description='')
      .setColor(0x008000)
      .setTimestamp();

    if (author) {
      if (maintain_bot) {
        const bot_name = "Charis_k";  
        embed.setAuthor(`Queried by ${author.username} - Maintained by ${bot_name}`, author.avatarURL() || undefined);
      } else {
        if (your_name) {
          embed.setAuthor(`Queried by ${author.username} - Maintained by ${your_name}`, author.avatarURL() || undefined);
        } else {
          embed.setAuthor(`Queried by ${author.username}`, author.avatarURL() || undefined);
        }
      }
    }

    if (footer) {
      embed.setFooter(footer, "https://cdn.discordapp.com/attachments/1102246811479060591/1151824495166898227/image_2023-09-14_131502197_upscaled_1.png");
    } else {
      embed.setFooter("Jeff_", "https://cdn.discordapp.com/avatars/1082118155528314892/7a83e01cbb11d4115d6cd1ae3f178eb0.webp");
    }

    if (thumbnail) {
      embed.setThumbnail(thumbnail);
    }

    return embed;
  }

  static errorEmbed(value: string, type: string | null = null, footer: string | null = null): MessageEmbed {
    if (type !== "userError") {
      console.error(value); 
    }

    const embed = this.embedBuilder("`Error`", footer);

    embed.addField("Something went wrong", value, true);

    return embed;
  }
  


}
export
 {Embeds} 
