var playerO = 'O'
var playerX = "X"
var currPlayer = playerO
var gameOver = false
var board = [["", "", ""],
["", "", ""],
["", "", ""]]

function checkWinner(){
    //horizontally
    for (let r = 0; r < 3; r++){
        if(board[r][0] == board[r][1] && board[r][1] == board[r][2] && board[r][0] != ""){
            for (let i = 0; i < 3; i++){
                let tile = document.getElementById(r.toString() + "-" + i.toString())
                tile.classList.add("winner")
            }
            gameOver = true
            return
        }
    }
    //vertically
    for(let c = 0; c < 3; c++ ){
        if (board[0][c] == board[1][c] && board[1][c] == board[2][c] && board[0][c] != ""){
            for (let i = 0; i < 3; i++){
                let tile = document.getElementById(i.toString() + "-" + c.toString())
                tile.classList.add("winner")
            }
            gameOver = true
            return
        }
    }
    //diagonally
    if(board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ""){
        let tile = document.getElementById("0-0")
        tile.classList.add("winner")
        tile = document.getElementById("1-1")
        tile.classList.add("winner")
        tile = document.getElementById("2-2")
        tile.classList.add("winner")
    }
    if(board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != ""){
        let tile = document.getElementById("0-2")
        tile.classList.add("winner")
        tile = document.getElementById("1-1")
        tile.classList.add("winner")
        tile = document.getElementById("2-0")
        tile.classList.add("winner")
    }
}

function setGame() {
    //board
    for (var r = 0; r < 3; r++) {
        for (var c = 0; c < 3; c++) {
            var tile = document.createElement("div")
            tile.id = r.toString() + "-" + c.toString()
            tile.addEventListener("click", setTile)
            tile.classList.add("tile")
            if (r == 0 || r == 1) {
                tile.classList.add("horizontal-line")
            }
            if (c == 0 || c == 1) {
                tile.classList.add("vertical-line")
            }
            document.getElementById("board").append(tile)
        }
    }
}

function checkDraw(){
    for(var i = 0; i < 3; i++){
        for(var j = 0; j < 3; j++){
            if(board[i][j] == "")
            return false
        }
    }
    return true
}

function setTile() {
    if (gameOver){
        return
    }
    selectedTile = this
    coords = this.id.split("-")
    row = parseInt(coords[0])
    col = parseInt(coords[1])
    if(board[row][col] == ""){
        this.innerText = currPlayer
        board[row][col] = currPlayer
    }else{
        return
    }
    if(currPlayer == playerO){
        currPlayer = playerX
    }else{
        currPlayer = playerO
    }
    checkWinner()
    if(gameOver == false && checkDraw()){
        const draw = document.getElementById("draw")
        draw.style.display = "block"
    }
}
setGame();
