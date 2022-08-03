const X_PLAYER = "x";
const CIRCLE_PLAYER = "o";
const combinations = [
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
];
const board = document.getElementById("board");
const cells = document.querySelectorAll("[data-cell]");
const winningMessage = document.getElementById("winningMessage");
const winningMessageTxt = document.querySelector("[data-winning-msg]");
const restartBtn = document.getElementById("restartButton");
const indicatorForMbl = document.querySelector(".forMobile");

let circleTurn = false;


// LET'S GAME START
stratGame();


// START GAME
function stratGame(){
    board.classList.add(X_PLAYER);
    circleTurn = false;
    indicatorForMbl.textContent = `${X_PLAYER}`.toLocaleUpperCase();
    cells.forEach(cell=>{
        cell.classList.remove(X_PLAYER)
        cell.classList.remove(CIRCLE_PLAYER);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, {once : true});
    });
    winningMessage.classList.remove("show")
}



// Restart Game
restartBtn.addEventListener('click', stratGame);



// Handle CLick Function
function handleClick(event){
    const cell = event.target;
    let currentPlayer = circleTurn ? CIRCLE_PLAYER : X_PLAYER;
    cell.classList.add(currentPlayer);
    if(checkWin(currentPlayer)){
        endGame(false, currentPlayer);
    }else if( isDarw()){
        endGame(true);
    }else{
        circleTurn = !circleTurn;
        board.classList.remove(X_PLAYER);
        board.classList.remove(CIRCLE_PLAYER);
        board.classList.add(circleTurn ? CIRCLE_PLAYER : X_PLAYER);
        indicatorForMbl.textContent = circleTurn ? CIRCLE_PLAYER.toLocaleUpperCase() : X_PLAYER.toLocaleUpperCase();
    }
}


// EndGame
function endGame( isDraw , currentPlayer){
    if (isDraw)
        winningMessageTxt.textContent = "Match Draw";
    else
        winningMessageTxt.textContent = `${currentPlayer.toUpperCase()} player win.`;
    
    winningMessage.classList.add("show"); 

}

// Check Win
function checkWin(currentPlayer){
    return combinations.some((combination)=>{
        return combination.every((indexValue)=>{
            return cells[indexValue].classList.contains(currentPlayer);
        });
    });
}


// Check Draw
function isDarw(){
    return [...cells].every(cell=>
        cell.classList.contains(X_PLAYER) || cell.classList.contains(CIRCLE_PLAYER));
}