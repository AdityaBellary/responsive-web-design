var board
var playerRed = "R"
var playerYellow = "Y"
var currPlayer = playerRed
var gameOver = false
var rows = 6
var columns = 7
var currColumns = [];

window.onload = function () {
    setGame();
}

function setWinner(r, c) {
    let winner = document.getElementById("winner")
    if (board[r][c] == playerRed) {
        winner.innerText = "Red Wins"
    } else {
        winner.innerText = "Yellow Wins"
    }
    gameOver = true
}

function checkWinner() {
    //horizontally
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != "") {
                if (board[r][c] == board[r][c + 1] && board[r][c + 1] == board[r][c + 2] && board[r][c + 2] == board[r][c + 3]) {
                    setWinner(r, c)
                    return
                }
            }
        }
    }
    //vertically
    for(let r = 0; r < rows - 3; r++ ){
        for (let c = 0; c < columns; c++){
            if(board[r][c] != ""){
                if(board[r][c] == board[r + 1][c] && board[r + 1][c] == board[r + 2][c] && board[r + 2][c] == board[r + 3][c]){
                    setWinner(r,c)
                    return
                }
            }
        }
    }
    //anti-diagonally
    for (let r = 0; r < rows - 3; r++){
        for(let c = 0; c < columns - 3 ; c++){
            if(board[r][c] != ""){
                if(board[r][c] == board[r + 1][c + 1] && board[r + 1][c + 1] == board[r + 2][c + 2] && board[r + 2][c + 2] == board[r + 3][c + 3]){
                    setWinner(r, c)
                    return
                }
            }
        }
    }
    for(let r = 3; r < rows; r++){
        for(let c = 0; c < columns - 3; c++){
            if(board[r][c] != ""){
                if (board[r][c] == board[r - 1][c + 1] && board[r - 1][c + 1] == board[r - 2][c + 2] && board[r - 2][c + 2] == board[r - 3][c + 3]){
                    setWinner(r, c)
                    return
                }
            }
        }
    }
}

function setGame() {
    board = []
    currColumns = [5, 5, 5, 5, 5, 5, 5]
    for (var r = 0; r < rows; r++) {
        let row = []
        for (var c = 0; c < columns; c++) {
            row.push("")

            let tile = document.createElement("div")
            tile.id = r.toString() + "-" + c.toString()
            tile.classList.add("tile")
            tile.addEventListener("click", setTile)
            document.getElementById("board").append(tile)
        }
        board.push(row)
    }
}

function setTile() {
    if (gameOver) {
        return
    }
    var coords = this.id.split("-")
    r = parseInt(coords[0])
    c = parseInt(coords[1])
    r = currColumns[c]
    if (r < 0) {
        return
    }
    board[r][c] = currPlayer
    let tile = document.getElementById(r.toString() + "-" + c.toString())
    if (currPlayer == playerRed) {
        tile.classList.add("red-color")
        currPlayer = playerYellow
    } else {
        tile.classList.add("yellow-color")
        currPlayer = playerRed
    }
    r -= 1
    currColumns[c] = r
    checkWinner()
}