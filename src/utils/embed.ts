import { EmbedBuilder, User} from 'discord.js';

class Embeds {
  static embedBuilder(
    title: string,
    description: string | null = null,
    author: User | null = null,
    thumbnail: string | null = null,
    maintain_bot = true ,
    your_name: string | null = null,

  ): EmbedBuilder {
    const embed = new EmbedBuilder()
      .setTitle(title)
      .setDescription(description || '')
      .setColor(0x008000)
      .setTimestamp();

    if (author) {
      if (maintain_bot) {
        const bot_name = "Charis_k";  
        embed.setAuthor(`Queried by ${author.username} - Maintained by ${bot_name}`.toString);
      } else {
        if (your_name) {
          embed.setAuthor(`Queried by ${author.username} - Maintained by ${your_name}`.toString);
        } else {
          embed.setAuthor(`Queried by ${author.username}`.toString);
        }
      }
    }
    this.embedBuilder.arguments(title,description,author,thumbnail)

    if (thumbnail) {
      embed.setThumbnail(thumbnail);
    }

    return embed;
  }

  static errorEmbed(value: string, type: string | null = null, footer: string | null = null): EmbedBuilder {
    if (type !== "userError") {
      console.error(value); 
    }

    const embed = this.embedBuilder("`Error`", value, null, footer);

    embed.addFields(
      {name:"Error",value:value,inline:true}
    )

    return embed;
  }
}

export { Embeds };
