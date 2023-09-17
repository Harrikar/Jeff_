import { Client, Message,MessageEmbed } from 'discord.js';
import { send } from './utils/sends';
import * as admin from 'firebase-admin';
const serviceAccount = require('jeff-db-firebase-adminsdk-qekso-80d55b4f4c.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://console.firebase.google.com/u/1/project/jeff-db/database/jeff-db-default-rtdb/data/~2F' 
});


const db = admin.firestore(); 

class Level {
  private entity: Client;
  private Send: send
  constructor(entity: Client,Send:send) {
    this.entity = entity;
    this.Send = Send;
  }

  async level() {
    const usersCollection = db.collection('users');
    const usernamesCollection = db.collection('usernames'); // Collection for username mapping

    this.entity.on('message', async (message: Message) => {
      try {
        if (!message.author.bot) {
          const userId = message.author.id;
          const userRef = db.collection('users').doc(userId);

          const userSnapshot = await userRef.get();

          if (userSnapshot.exists) {
            const user = userSnapshot.data()!;
            const level_2exp = 100 + 20;
            const newlevel = level_2exp + 40;
            const xp_upd = {
              xp: user.xp + 1
            }

            await usersCollection.doc(userId).update(xp_upd);

            if (user.xp > newlevel) {
              const newlvl = {
                level: user.level + 1
              };

              // Update the level in the 'users' collection
              await usersCollection.doc(userId).update(newlvl);
            }
            
          } else {
            // If the user doesn't exist, add them to the 'users' collection
            const user_data = {
              id: userId,
              level: 1,
              xp: 0,
              name: message.author.username
            };  

            await usersCollection.doc(userId).set(user_data);

            // Associate the username with the user ID in the 'usernames' collection
            await usernamesCollection.doc(message.author.username).set({
              userId: userId
            });
          }
          
        }
        
      } catch (error) {
        this.Send.sendErrorEmbed(error);
      }
    });
  }

  async showlevel(username: string) {
    try {
 

      const usernameDoc = await db.collection('usernames').doc(username).get();

      if (usernameDoc.exists) {
        const { userId } = usernameDoc.data()!;
        const userDoc = await db.collection('users').doc(userId).get();
        const commandString = `Level of ${username}`;
        
        if (userDoc.exists) {
          const userData = userDoc.data()!;
          const embed = new MessageEmbed()
            .setTitle(`\`${commandString}\``)
            .setDescription('User level')
            .setFooter(commandString)
            .setAuthor(this.entity.user);

          embed.addFields(
            { name: 'Name', value: username, inline: true },
            { name: 'Level and XP', value: `${userData.level} (XP: ${userData.xp})`, inline: true }
          );
        
         

          await this.Send.sendUserEmbed(embed);
        } else {
          await this.Send.sendUserMessage('User data not found.');
        }
      } else {
        await this.Send.sendUserMessage('User isn\'t registered or you have an invalid or old username.');
      }
    } catch (error) {
      this.Send.sendErrorEmbed(error);
    }
  }


}
export {Level}