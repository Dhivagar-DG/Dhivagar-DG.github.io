// GLOBAL REFERENCE VARIABLE
const board = document.querySelector('.board');
const cells = document.querySelectorAll('[data-cell]');
const winningMessage = document.getElementById("winningMessage");
const winningMsgTxt = document.querySelector('.winning-msg-txt');
const restartBtn = document.querySelector('#restart');
const indicatorForMbl = document.querySelector('.forMobile');

// Players Variable
const X_PLAYER = "x";
const O_PLAYER = "o";

// Winning Combinations Variable
const combinations = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

let currentTurn = false;

// Game Start function
function gameStart(){
    currentTurn = false;
    addBoardClass();
    winningMessage.style.display = "none";
    cells.forEach(cell=>{
        cell.classList.remove(X_PLAYER);
        cell.classList.remove(O_PLAYER);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, {once : true });
    });
}


//Game Restart
restartBtn.addEventListener('click', gameStart); 


// Game End Function
function gameEnd(win, currentPlayer){
    winningMsgTxt.textContent = win ? `${currentPlayer.toLocaleUpperCase()} player win.` : `Match Draw.`;
    winningMessage.style.display ="flex";
} 


// Handle Click Function
function handleClick(event){
    let currentDiv  = event.target;
    let currentPlayer = currentTurn ? O_PLAYER : X_PLAYER;
    currentDiv.classList.add(currentPlayer);

    if (isWin(currentPlayer)){
        gameEnd(true, currentPlayer);
    }else if( isDarw()){
        gameEnd(false);
    }else{
        currentTurn = !currentTurn;
        addBoardClass();
    }
}


// Add Board Class Display Currentplayer In Cells
let addBoardClass = ()=>{
    let currentPlayer = currentTurn ? O_PLAYER : X_PLAYER;
    board.classList.remove(X_PLAYER);
    board.classList.remove(O_PLAYER);
    board.classList.add(currentPlayer);
    indicatorForMbl.textContent = currentPlayer.toLocaleUpperCase();
    if (currentPlayer == O_PLAYER){
        indicatorForMbl.style.background = "#EEECEC";
        indicatorForMbl.style.color = "orangered";
    }else{
        indicatorForMbl.style.background = "orangered";
        indicatorForMbl.style.color = "#EEECEC"; 
    }
}


// Check Win
function isWin(currentPlayer){
    return combinations.some(combination=>{
        return combination.every(idx=>{
            return cells[idx].classList.contains(currentPlayer);
        });
    });
}


// Check Draw 
function isDarw(){
    return [...cells].every(cell=>{
        return cell.classList.contains(X_PLAYER) ||
                cell.classList.contains(O_PLAYER);
    });
}

// setInterval(()=>{
//     let headingList = document.querySelectorAll('.head');
//     ['orangered','blueviolet','yellowgreen'].forEach(color,)
// });

// Let's game start
gameStart();
