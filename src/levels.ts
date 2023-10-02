'ignore'
import { Client, Message } from 'discord.js';
import * as admin from 'firebase-admin';
import { Embeds } from './utils/embed';
const serviceAccount = require("./jeff-db-firebase-adminsdk-qekso-80d55b4f4c.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://console.firebase.google.com/u/1/project/jeff-db/database/jeff-db-default-rtdb/data/~2F' 
});


const db = admin.firestore()

class Level {
  private entity: Client;
  constructor(entity: Client) {
    this.entity = entity;
  }
 footer = 'made by charis_k'
  async level() {
    const usersCollection = db.collection('users');
    const usernamesCollection = db.collection('usernames'); // Collection for username mapping

    this.entity.on('message', async (message) => {
      try {
        if (!message.author.bot) {
          const userId = message.author.id;
          const userRef = db.collection('users').doc(userId);

          const userSnapshot = await userRef.get();

          if (userSnapshot.exists) {
            const user = userSnapshot.data()!;
   
            const xp_upd = {
              xp: user.xp + 1
            }
            let Level = 100;
            function level(){
              Level =+ 20
            }

            await usersCollection.doc(userId).update(xp_upd);
            
            if (user.xp > Level) {
              const newlvl = {
                level,
                Level: user.level + 1
              };

              // Update the level in the 'users' collection
              await usersCollection.doc(userId).update(newlvl);
            }
            
          } else {
            // If the user doesn't exist, add them to the 'users' collection
            const user_data = {
              id: userId,
              Level: 0,
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
        this.entity.on("messasge" ,async (message) =>  {
          if(message){
              const user = message.author
              const embed = Embeds.errorEmbed(error,this.footer)
              user.send({embed})
          }
      })      }
    });
  }

  async showlevel(username: string) {
    this.entity.on('message', async (message) => {
      try {
    
          const usernameDoc = await db.collection('usernames').doc(username).get();

          if (usernameDoc.exists) {
            const { userId } = usernameDoc.data()!;
            const userDoc = await db.collection('users').doc(userId).get();
            const commandString = `Level of ${username}`;
            
            if (userDoc.exists) {
              const userData = userDoc.data()!;
              const response = `User level: ${userData.level} (XP: ${userData.xp})`;

              await message.send(response)
            } else {
              await message.user.send('User not found')
            }
      }catch (error) {
        this.send.sendErrorEmbed(error);
      
    }
 }

  async onUserUpdate(oldUser, newUser) {
    try {
      const oldUsername = oldUser.username;
      const newUsername = newUser.username;

      // Check if the username has changed
      if (oldUsername !== newUsername) {
        // Update the associated username in the database
        const usernameDoc = await db.collection('usernames').doc(oldUsername).get();
        if (usernameDoc.exists) {
          const userId = usernameDoc.data()!.userId;
          await db.collection('usernames').doc(oldUsername).update(newUsername)          
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  } 
}

export {Level}
