var board = []
var tilesClicked = 0
var rows = 8
var columns = 8
var minesCount = 10

var gameOver = false
var minesLocation = []
var flagEnabled = false

window.onload = () => {
    startGame()
}

function setMines(){
    let count =  minesCount

    while(count > 0){
        let r = Math.floor(Math.random() * rows)
        let c = Math.floor(Math.random() * columns)
        let id = r.toString()+ "-" + c.toString()
        if(!minesLocation.includes(id)){
            count -= 1
            minesLocation.push(id)
        }
    }
}

function startGame() {
    document.getElementById("mines-count").innerText = minesCount;
    document.getElementById("flag-button").addEventListener("click", setFlag);
    setMines();
    for (var r = 0; r < rows; r++) {
        let row = []
        for (var c = 0; c < columns; c++) {
            let tile = document.createElement("div")
            tile.id = r.toString() + "-" + c.toString()
            tile.classList.add("tile")
            tile.addEventListener("click", clickTile)
            document.getElementById("board").append(tile)
            row.push(tile)
        }
        board.push(row)
    }
    console.log(board)
}

function clickTile() {
    if (gameOver || this.classList.contains("tile-clicked")) {
        return
    }
    let tile = this
    if (flagEnabled) {
        if (tile.innerText == "") {
            tile.innerText = "🚩"
        } else if (tile.innerText = "🚩") {
            tile.innerText = ""
        }
        return
    }
    if (minesLocation.includes(tile.id)) {
        gameOver = true
        revealMines()
        return
    }
    let coords = tile.id.split("-")
    let r = parseInt(coords[0])
    let c = parseInt(coords[1])
    checkMine(r, c)
}

function revealMines(){
    for(let r = 0; r < rows; r++){
        for(let c = 0; c < columns; c++){
            let id = board[r][c].id
            if(minesLocation.includes(id)){
                board[r][c].innerText = "💣"
                board[r][c].style.backgroundColor = "red"
            }
        }
    }
}

function setFlag() {
    if (flagEnabled) {
        flagEnabled = false
        document.getElementById("flag-button").style.backgroundColor = "lightgray";
    } else {
        flagEnabled = true
        document.getElementById("flag-button").style.backgroundColor = "darkgray";
    }
}

function checkMine(r, c) {
    console.log(r,c)
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return
    }
    if (board[r][c].classList.contains("tile-clicked")){
        return
    }
    if (minesLocation.includes(board[r][c].id)){
        return
    }
    board[r][c].classList.add("tile-clicked")
    tilesClicked += 1
    let minesFound = 0
    //top
    minesFound += checkTile(r - 1, c - 1)
    minesFound += checkTile(r - 1, c)
    minesFound += checkTile(r - 1, c + 1)

    //sides
    minesFound += checkTile(r, c - 1)
    minesFound += checkTile(r, c + 1)

    //bottom
    minesFound += checkTile(r + 1, c - 1)
    minesFound += checkTile(r + 1, c)
    minesFound += checkTile(r + 1, c + 1)

    if (minesFound > 0) {
        board[r][c].innerText = minesFound
        board[r][c].classList.add("x" + minesFound)
    } else {
        checkMine(r - 1, c - 1)
        checkMine(r - 1, c)
        checkMine(r - 1, c + 1)

        checkMine(r, c - 1)
        checkMine(r, c + 1)

        checkMine(r + 1, c - 1)
        checkMine(r + 1, c)
        checkMine(r + 1, c + 1)
    }
    if (tilesClicked == rows * columns - minesCount){
        document.getElementById("mines-count").innerText = "Cleared"
        gameOver = true
    }
}

function checkTile(r, c){
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return
    }
    if (minesLocation.includes(r.toString() + "-" + c.toString())){
        return 1
    }
    return 0
}