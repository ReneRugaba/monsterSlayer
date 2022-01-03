const buttonStart = document.querySelector(".startButton");
const buttonAttack = document.querySelector(".attackButton");
const buttonsGameStart = document.querySelector(".gameStart");
const barreMonster = document.querySelector(".barreMonster");
const barrePlayer = document.querySelector(".barrePlayer");
const specialAttack = document.querySelector(".specialAttack");
const healButton = document.querySelector(".heal");
const giveUpButton = document.querySelector(".giveUp");
let damagePlayer = 0;
let damageMonster = 0;
let lifePlayer = 100;
let monsterLife = 100;
let heal = 10;

function play(e){
    e.stopPropagation();
    buttonStart.style.display = "none";
    buttonsGameStart.style.display= "block";
}

function damageFunction(e){
    e.stopPropagation();
    damageMonster = Math.floor(Math.random()*(10-3)+3);
    damagePlayer = Math.floor(Math.random()*(10-5)+5);
    lifePlayer = lifePlayer - damagePlayer;
    monsterLife = monsterLife - damageMonster
    barrePlayer.style.width = `${lifePlayer}%`;
    barrePlayer.childNodes[1].innerText=`${lifePlayer} %`;
    barreMonster.style.width = `${monsterLife}%`;
    barreMonster.childNodes[1].innerText = `${monsterLife} %`

}

function specialDamageFunction(e){
    e.stopPropagation();
    damageMonster = Math.floor(Math.random()*(20-5)+5);
    damagePlayer = Math.floor(Math.random()*(10-5)+5);
    lifePlayer = lifePlayer - damagePlayer;
    monsterLife = monsterLife - damageMonster
    barrePlayer.style.width = `${lifePlayer}%`;
    barrePlayer.childNodes[1].innerText=`${lifePlayer} %`;
    barreMonster.style.width = `${monsterLife}%`;
    barreMonster.childNodes[1].innerText = `${monsterLife} %`
}

function healPlayer (e){
    e.stopPropagation();
    damagePlayer = Math.floor(Math.random()*(10-5)+5);
    lifePlayer = lifePlayer - damagePlayer;
    barrePlayer.style.width = `${lifePlayer}%`;
    lifePlayer = lifePlayer + heal
    barrePlayer.style.width = `${lifePlayer}%`;
    barrePlayer.childNodes[1].innerText=`${lifePlayer} %`;
   
}

function giveUp(){
    lifePlayer = 100;
    monsterLife = 100;
    barrePlayer.style.width = `${lifePlayer}%`;
    barrePlayer.childNodes[1].innerText=`${lifePlayer} %`;
    barreMonster.style.width = `${monsterLife}%`;
    barreMonster.childNodes[1].innerText = `${monsterLife} %`
    alert("GAME OVER");
}

giveUpButton.addEventListener("click", giveUp)

healButton.addEventListener("click",healPlayer)

specialAttack.addEventListener("click",specialDamageFunction)

buttonAttack.addEventListener("click",damageFunction)

buttonStart.addEventListener("click",play);