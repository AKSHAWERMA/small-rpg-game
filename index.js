let xp = 0;
let health = 100;
let gold = 50;
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
const option1 = document.querySelector("#option1");
const option2 = document.querySelector("#option2");
const option3 = document.querySelector("#option3");

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
      "button functions": [fightSlime, fightBeast, goTown],
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
      "button text": ["Go to town square", "Go to town square", "Go to town square"],
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
    option1.innerText = location["button text"][0];
    option2.innerText = location["button text"][1];
    option3.innerText = location["button text"][2];
    option1.onclick = location["button functions"][0];
    option2.onclick = location["button functions"][1];
    option3.onclick = location["button functions"][2];
    text.innerText = location.text;
}

function goStore(){
    update(locations[1]);
}