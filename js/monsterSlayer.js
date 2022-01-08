"use strict";

class CelecteurDom {
    
    static selecteur(celect){
        return document.querySelector(celect)
    }

    static createElement(element){
       return document.createElement(element) 
    }
}

class AreaAction {

    /**
     * 
     * @param {Number} playerDamage 
     * @param {Number} monsterDamage 
     * @param {Boolean} end 
     */
    setInActionArea(playerDamage, monsterDamage,end=false,heal=false){
    if(!end){
        const pPlayer = CelecteurDom.createElement("p");
        const pMonster = CelecteurDom.createElement("p");
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

    
}

class GiveUp extends AreaAction {
    
    /**
     * function give up button
     */
    giveUp(win=false, winner=undefined){
        lifePlayer = 100;
        monsterLife = 100;
        barrePlayer.style.width = `${lifePlayer}%`;
        barrePlayer.childNodes[1].innerText=`${lifePlayer} %`;
        barreMonster.style.width = `${monsterLife}%`;
        barreMonster.childNodes[1].innerText = `${monsterLife} %`
        buttonStart.style.display = "block";
        buttonsGameStart.style.display= "none";
        super.setInActionArea(0,0,true)
        
        if(!win){

            alert("GAME OVER");
        }else if(win && winner){
            alert(`The winner is ${winner}`)
        }

        
    
    }
}

class ActionGame extends GiveUp {

    /**
     * function start the game
     * @param {Event} e 
     */
    play(e){
    e.stopPropagation();
    buttonStart.style.display = "none";
    buttonsGameStart.style.display= "block";
}

    

    /**
     * function for special damage button
     * @param {Event} e 
     */
    specialDamageFunction(e){
        e.stopPropagation();
        damageMonster = Math.floor(Math.random()*(20-5)+5);
        damagePlayer = Math.floor(Math.random()*(10-5)+5);
        lifePlayer = lifePlayer - damagePlayer;
        monsterLife = monsterLife - damageMonster
        barrePlayer.style.width = `${lifePlayer}%`;
        barrePlayer.childNodes[1].innerText=`${lifePlayer} %`;
        barreMonster.style.width = `${monsterLife}%`;
        barreMonster.childNodes[1].innerText = `${monsterLife} %`
        super.setInActionArea(damageMonster,damagePlayer);
        if (lifePlayer<=0 || monsterLife<=0) {
            let winner = lifePlayer<=0? "Monster":"Player";
            super.giveUp(true, winner)
        }

    }

    /**
     * function Heal button
     * @param {Event} e 
     */
    healPlayer (e){
        e.stopPropagation();
        if (monsterLife<100 && lifePlayer<100) {
            damagePlayer = Math.floor(Math.random()*(10-5)+5);
            lifePlayer = lifePlayer - damagePlayer;
            barrePlayer.style.width = `${lifePlayer}%`;
            lifePlayer = lifePlayer + heal
            barrePlayer.style.width =lifePlayer>=100?"100%": `${lifePlayer}%`;
            barrePlayer.childNodes[1].innerText=lifePlayer>=100?"100 %":`${lifePlayer} %`;
            super.setInActionArea(heal,damagePlayer,false,true);
        }
    }

    

   
    /**
     * function damage button 
     * @param {Event} e 
     */
    damageFunction(e){
        e.stopPropagation();
        damageMonster = Math.floor(Math.random()*(10-3)+3);
        damagePlayer = Math.floor(Math.random()*(10-5)+5);
        lifePlayer = lifePlayer - damagePlayer;
        monsterLife = monsterLife - damageMonster
        barrePlayer.style.width = `${lifePlayer}%`;
        barrePlayer.childNodes[1].innerText=`${lifePlayer} %`;
        barreMonster.style.width = `${monsterLife}%`;
        barreMonster.childNodes[1].innerText = `${monsterLife} %`
        super.setInActionArea(damageMonster,damagePlayer);
        if (lifePlayer<=0 || monsterLife<=0) {
            let winner = lifePlayer<=0? "Monster":"Player";
            super.giveUp(true, winner)
        }
    }

    

}



const buttonStart = CelecteurDom.selecteur(".startButton");
const buttonAttack = CelecteurDom.selecteur(".attackButton");
const buttonsGameStart = CelecteurDom.selecteur(".gameStart");
const barreMonster = CelecteurDom.selecteur(".barreMonster");
const barrePlayer = CelecteurDom.selecteur(".barrePlayer");
const specialAttack = CelecteurDom.selecteur(".specialAttack");
const healButton = CelecteurDom.selecteur(".heal");
const giveUpButton = CelecteurDom.selecteur(".giveUp");
const areaAction = CelecteurDom.selecteur(".actionGame");
let damagePlayer = 0;
let damageMonster = 0;
let lifePlayer = 100;
let monsterLife = 100;
let heal = 10;
const actionGame = new ActionGame();





/* here all events listener in DOM that use all functions buttons */

giveUpButton.addEventListener("click", actionGame.giveUp)

healButton.addEventListener("click",actionGame.healPlayer)

specialAttack.addEventListener("click",actionGame.specialDamageFunction)

buttonAttack.addEventListener("click",actionGame.damageFunction)

buttonStart.addEventListener("click",actionGame.play);