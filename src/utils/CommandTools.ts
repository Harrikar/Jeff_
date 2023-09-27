

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

  static splitOnChanges(inputList: string[]): string[][] {
    const result: string[][] = [];
    let currentSublist: string[] = [];

    for (let i = 0; i < inputList.length; i++) {
        const currentValue = inputList[i];

        if (i === 0 || currentValue !== inputList[i - 1]) {
            // Start a new sublist when the value changes
            if (currentSublist.length > 0) {
                result.push([...currentSublist]);
                currentSublist = [];
            }
        }

        currentSublist.push(currentValue);
    }

    if (currentSublist.length > 0) {
        result.push([...currentSublist]);
    }

    return result;
}
static varnew(inputList: string[][]) {
  const arrayOfVars: string[][] = [];
  for (const sublist of inputList) {
      arrayOfVars.push(sublist);
  }
  return arrayOfVars;
}
}


export 
  {CommandTools}

