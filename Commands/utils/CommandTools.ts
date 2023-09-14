

class CommandTools {
  static listToString(...args: any[]): string {
    return args.map(item => String(item)).join('\n');
  }


  static rnaoPerms(json: any): string[] {
    const rnaoPermsList: string[] = [];
    const permsKeyList: string[] = ["buildPerms", "destroyPerms", "switchPerms", "itemUsePerms"];

    for (let count = 0; count < json.perms.rnaoPerms.length; count++) {
      try {
        const resident = json.perms.rnaoPerms[permsKeyList[count]].resident;
        if (resident) {
          rnaoPermsList.push("r----");
        }
      } catch (error) {
        const friend = json.perms.rnaoPerms[permsKeyList[count]].friend;
        if (friend) {
          rnaoPermsList.push("f----");
        }
      }
    }

    return rnaoPermsList;
  }

  static random_choice(list:[]){
    let randomIndex: number = Math.floor(Math.random() * list.length);
    let randomoutput: string = list[randomIndex];
  }


}

export 
  {CommandTools}

