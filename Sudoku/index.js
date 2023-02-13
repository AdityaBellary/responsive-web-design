let selectedNumber = null
let selectedTile = null
document.getElementById("solve").addEventListener("click", solve)

curr_grid = [
    [3, 0, 6, 5, 0, 8, 4, 0, 0],
    [5, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 8, 7, 0, 0, 0, 0, 3, 1],
    [0, 0, 3, 0, 1, 0, 0, 8, 0],
    [9, 0, 0, 8, 6, 3, 0, 0, 5],
    [0, 5, 0, 0, 9, 0, 6, 0, 0],
    [1, 3, 0, 0, 0, 0, 2, 5, 0],
    [0, 0, 0, 0, 0, 0, 0, 7, 4],
    [0, 0, 5, 2, 0, 6, 3, 0, 0]
]

grid = [[3, 0, 6, 5, 0, 8, 4, 0, 0],
[5, 2, 0, 0, 0, 0, 0, 0, 0],
[0, 8, 7, 0, 0, 0, 0, 3, 1],
[0, 0, 3, 0, 1, 0, 0, 8, 0],
[9, 0, 0, 8, 6, 3, 0, 0, 5],
[0, 5, 0, 0, 9, 0, 6, 0, 0],
[1, 3, 0, 0, 0, 0, 2, 5, 0],
[0, 0, 0, 0, 0, 0, 0, 7, 4],
[0, 0, 5, 2, 0, 6, 3, 0, 0]]

function findLocation(l) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (curr_grid[i][j] == 0) {
                l[0] = i
                l[1] = j
                return true
            }
        }
    }
    return false
}
function used_in_row(curr_grid, row, num) {
    for (let c = 0; c < 9; c++) {
        if (curr_grid[row][c] == num) {
            return true
        }
    }
    return false
}

function used_in_col(curr_grid, col, num) {
    for (let r = 0; r < 9; r++) {
        if (curr_grid[r][col] == num) {
            return true
        }
    }
    return false
}

function used_in_box(curr_grid, r, c, num) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (curr_grid[i + r][j + c] == num) {
                return true
            }
        }
    }
    return false
}

function checkLocation(r, c, num) {
    return !used_in_row(curr_grid, r, num) && !used_in_col(curr_grid, c, num) && !used_in_box(curr_grid, r - r % 3, c - c % 3, num)
}

function startGame(solve = false) {
    //digits
    for (let i = 1; i <= 9; i++) {
        let number = document.createElement("div")
        number.id = i
        number.addEventListener("click", selectNumber)
        number.classList.add("number")
        number.innerText = i
        document.getElementById("digits").appendChild(number)
    }
    //board
    //<div id="1-1" class="tile"></div>
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div")
            tile.id = r.toString() + "-" + c.toString()
            tile.classList.add("tile")
            if (grid[r][c] != 0) {
                tile.innerText = grid[r][c]
                tile.classList.add("start-tile")
            }
            if (solve) {
                tile.innerText = curr_grid[r][c]
            }
            if (r == 2 || r == 5) {
                tile.style.borderBottom = "2px solid black"
            }
            if (c == 2 || c == 5) {
                tile.style.borderRight = "2px solid black"
            }
            tile.addEventListener("click", selectTile)
            document.getElementById("board").append(tile)
        }
    }
}
startGame();

function selectNumber() {
    if (selectedNumber != null) {
        selectedNumber.classList.remove("select-number")
    }
    selectedNumber = this
    selectedNumber.classList.add("select-number")
}

function selectTile() {
    selectedTile = this
    let coords = this.id.split("-"); //["0", "0"]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    if (this.classList.contains("start-tile")) {
        return
    }else{
        this.innerText = selectedNumber.id
        curr_grid[r][c] = parseInt(selectedNumber.id)
        console.log(curr_grid)
    }
}

function solve() {
    if (solveSudoku(grid)) {
        startGame(true)
    }
}