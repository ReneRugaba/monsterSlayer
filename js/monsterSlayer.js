const buttonStart = document.querySelector(".startButton");
const buttonAttack = document.querySelector(".attackButton");
const buttonsGameStart = document.querySelector(".gameStart");
const barreMonster = document.querySelector(".barreMonster");
const barrePlayer = document.querySelector(".barrePlayer");
const specialAttack = document.querySelector(".specialAttack");
const healButton = document.querySelector(".heal");
const giveUpButton = document.querySelector(".giveUp");
const areaAction = document.querySelector(".actionGame");
let damagePlayer = 0;
let damageMonster = 0;
let lifePlayer = 100;
let monsterLife = 100;
let heal = 10;

/**
 * function start the game
 * @param {Event} e 
 */
function play(e){
    e.stopPropagation();
    buttonStart.style.display = "none";
    buttonsGameStart.style.display= "block";
}

/**
 * function damage button 
 * @param {Event} e 
 */
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
    setInActionArea(damageMonster,damagePlayer);
    if (lifePlayer<=1 || monsterLife<=1) {
        giveUp()
    }
}

/**
 * function for special damage button
 * @param {Event} e 
 */
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
    setInActionArea(damageMonster,damagePlayer);
    if (lifePlayer<=1 || monsterLife<=1) {
        giveUp()
    }

}

/**
 * function Heal button
 * @param {Event} e 
 */
function healPlayer (e){
    e.stopPropagation();
   if (monsterLife<100 && lifePlayer<100) {
    damagePlayer = Math.floor(Math.random()*(10-5)+5);
    lifePlayer = lifePlayer - damagePlayer;
    barrePlayer.style.width = `${lifePlayer}%`;
    lifePlayer = lifePlayer + heal
    barrePlayer.style.width =lifePlayer>=100?"100%": `${lifePlayer}%`;
    barrePlayer.childNodes[1].innerText=lifePlayer>=100?"100 %":`${lifePlayer} %`;
    setInActionArea(heal,damagePlayer,false,true);
   }
}

/**
 * function give up button
 */
function giveUp(){
    lifePlayer = 100;
    monsterLife = 100;
    barrePlayer.style.width = `${lifePlayer}%`;
    barrePlayer.childNodes[1].innerText=`${lifePlayer} %`;
    barreMonster.style.width = `${monsterLife}%`;
    barreMonster.childNodes[1].innerText = `${monsterLife} %`
    buttonStart.style.display = "block";
    buttonsGameStart.style.display= "none";
    alert("GAME OVER");
    setInActionArea(0,0,true)
}

/**
 * 
 * @param {Number} playerDamage 
 * @param {Number} monsterDamage 
 * @param {Boolean} end 
 */
function setInActionArea(playerDamage, monsterDamage,end=false,heal=false){
    if(!end){
        const pPlayer = document.createElement("p");
        const pMonster = document.createElement("p");
        pPlayer.innerText= !heal? `Le player a infligé au montre ${playerDamage} de dégats`:`Le player vient de se soigner de ${playerDamage} points!`;
        pPlayer.setAttribute("class",!heal?"playerAction":"playerHeal")
        pMonster.innerText=`Le monstre a infligé au player ${monsterDamage} de dégats`;
        pMonster.setAttribute("class","monsterAction")
        areaAction.appendChild(pPlayer)
        areaAction.appendChild(pMonster)
    }else{
        areaAction.innerHTML="";
    }
}


/* here all events listener in DOM that use all functions buttons */

giveUpButton.addEventListener("click", giveUp)

healButton.addEventListener("click",healPlayer)

specialAttack.addEventListener("click",specialDamageFunction)

buttonAttack.addEventListener("click",damageFunction)

buttonStart.addEventListener("click",play);