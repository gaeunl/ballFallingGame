function moveLeft(){
    var left = parseInt(window.getComputedStyle(character).getPropertyValue('left'));
    if(left > 0){
        character.style.left = left - 2 + 'px';
    }
}

function moveRight(){
    var left = parseInt(window.getComputedStyle(character).getPropertyValue('left'));
    if(left < 380){ // width - characterwidth
        character.style.left = left + 2 + 'px';
    }
}

var character = document.getElementById("character");
var game = document.getElementById("game");
var interval;
var both = 0;
var counter = 0;
var blockArray = [];
var score = 0;


document.addEventListener('keydown', event => {
    if(both !== 0){
        return;
    }
    both ++;
    if(event.key === "ArrowLeft"){
        interval = setInterval(moveLeft, 1);
    }
    if (event.key === "ArrowRight"){
        interval = setInterval(moveRight, 1);
    }
})

document.addEventListener('keyup', event => {
    clearInterval(interval);
    both = 0;
})

// blocks
var blocks = setInterval(function(){
    var blockLast = document.getElementById("block"+(counter - 1));
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue('top'));
    var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue('left'));
    var drop = 0;   

    if(counter > 0){
        var blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue('top'));
    }
    if(blockLastTop < 400 || counter == 0){
        var block = document.createElement("div");
        var hole = document.createElement("div");
        var random = Math.floor(Math.random() * 350); // width - hole width 
        hole.style.left = random + 'px';
        
        block.style.top = blockLastTop + 100 + 'px';
        hole.style.top = blockLastTop + 100 + 'px';

        block.setAttribute("class", "block");
        hole.setAttribute("class", "hole");
        block.setAttribute("id", "block" + counter);
        hole.setAttribute("id", "hole" + counter);
        game.appendChild(block);
        game.appendChild(hole);
        blockArray.push(counter);
        counter++;
    }
    for(var i = 0 ; i < blockArray.length; i++){
        let current = blockArray[i];
        let iblock = document.getElementById("block"+ current);
        let ihole = document.getElementById("hole"+ current);
        let iblockTop = parseFloat(window.getComputedStyle(iblock).getPropertyValue('top'));
        let iholeLeft = parseFloat(window.getComputedStyle(ihole).getPropertyValue('left'));

        iblock.style.top = iblockTop - 0.5 + "px"; // change speed
        ihole.style.top = iblockTop - 0.5 + "px"; // change speed
        if(iblockTop < -15){
            blockArray.shift();
            iblock.remove();
            ihole.remove();
            score ++;
        }
        if(iblockTop - 20 < characterTop && iblockTop > characterTop){
            drop ++;
            if(iholeLeft <= characterLeft && iholeLeft + 30 >= characterLeft){
                drop = 0;
            }
        }
    }
    if(drop == 0 && characterTop < 480){
        character.style.top = characterTop + 2 + "px";
    }else{
        character.style.top = characterTop - 2 + "px";
    }
    if(characterTop < 0){
        alert("Game Over. Score: " + score);
        clearInterval(blocks);
        location.reload();
    }
    // todo: combine block and hole together an treat them as one object
},1);



