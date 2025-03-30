let xp = 0;
let health = 100;
let gold = 500;
let currentWeaponItem = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const text = document.querySelector("#text");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
console.log(button1, button2, button3, monsterStats, text); // Check if these are valid DOM elements
const weapons = [
    {
        name: "stick",
        damage: 5,
    },
    {
        name: "dagger",
        damage: 30
    },
    {
        name: "sword",
        damage: 50
    },
    {
        name: "A FCKNG GUN",
        damage: 100
    }
];

const monster = [
    {
        name: "slime",
        level: 2,
        health: 15
    },
    {
        name: "Iron fanged wolf",
        level: 8,
        health: 60
    },
    {
        name: "Dragon",
        level: 20,
        health: 300
    }
];

const locations = [
    {
      name: "town square",
      "button text": ["Go to store", "Go to cave", "Fight dragon"],
      "button functions": [goStore, goCave, fightDragon],
      text: "You are in the town square. You see a sign that says \"Store\"."
    },
    {
      name: "store",
      "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
      "button functions": [buyHealth, buyWeapon, goTown],
      text: "You enter the store."
    },
    {
      name: "cave",
      "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
      "button functions": [fightSlime, fightWolf, goTown],
      text: "You enter the cave. You see some monsters."
    },
    {
      name: "fight",
      "button text": ["Attack", "Dodge", "Run"],
      "button functions": [attack, dodge, goTown],
      text: "You are fighting a monster."
    },
    {
      name: "kill monster",
      "button text": ["Go back home", "Go back home", "Go back home"],
      "button functions": [goTown, goTown, goTown],
      text: "The monster screams \"Arg!\" as it dies. You gain experience points and find gold."
    },
    {
      name: "lose",
      "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
      "button functions": [restart, restart, restart],
      text: "You die. ☠"
    },
    {
      name: "win",
      "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
      "button functions": [restart, restart, restart],
      text: "You defeat the dragon! YOU WIN THE GAME! 🎉"
    }
];

function update(location) {
    monsterStats.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text;
}

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function goTown(){
    update(locations[0]);
}

function goStore(){
    update(locations[1]);
}

function goCave(){
    update(locations[2]);
}

function fightDragon(){
    update(locations[2]);
}

function buyHealth(){
  if(gold >= 10){
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  }else{
    text.innerText = "You broke Ass, Ugly Ass, a good for nothing peice of shit";
  }
}

function buyWeapon(){
  if(currentWeaponItem <= weapons.length - 1){
    if(gold >= 30){
      gold -= 30;
      goldText.innerText = gold;
      currentWeaponItem++;
      let newWeapon = weapons[currentWeaponItem].name;
      text.innerText = "You Bought a " + newWeapon + ", it's a pleasure doing business with you."
      inventory.push(newWeapon);
      text.innerText += "In your inventory you have accuired a " + newWeapon + ".";
      }else{
        text.innerText = "do you see me for a fool, i knew you had no money when i took a look at you!"
      }
  }else{
    text.innerText = "Brother you already bought everything in the shop, WHAT MORE DO YOU WANT";
    button2.innerText = "I will buy your weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon(){
  if(inventory.length > 1){
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "Hoho hehe.. thank you for the " + currentWeapon + ", Now go away shoo shoo."
    text.innerText += "in your inventory you have: " + inventory;
  }else{
    text.innerText = "yeah im not buying this junk, dont take me for a fool";
  }
}

function fightSlime(){
  fighting = 0;
  goFight();
}

function fightWolf(){
  fighting = 1;
  goFight();
}

function fightDragon(){
  fighting = 2;
  goFight();
}

function goFight(){
  update(locations[3]);
  monsterHealth = monster[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monster[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack(){
  text.innerText = "The " + monster[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeaponItem].name + ".";
  health -= monster[fighting].level;
  monsterHealth -=  weapons[currentWeaponItem].damage; 
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if(health <= 0){
    lose();
  }else if(monsterHealth <= 0){
    if(fighting === 2){
      winGame();
    }else{
      defeatMonster();
    }
  }
}

function dodge(){
  text.innerText = "You dodge the attack from the " + monster[fighting].name;
}

function defeatMonster(){
  gold += monster[fighting].health;
  xp += monster[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeaponIndex = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}