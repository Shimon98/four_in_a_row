export const createBoard = (rows, cols) => {
    const newBoard = [];
    for (let row = 0; row < rows; row++) {
        const tempRow = [];
        for (let col = 0; col < cols; col++) {
            tempRow.push({value: "", color: ""});
        }
        newBoard.push(tempRow);
    }
    return newBoard;
};

export const copyBoard = (board) => {
    return board.map(row => row.map(cell => ({...cell})));
};

export const isColumnFull = (board, colIndex) => {
    return board[0][colIndex].value !== "";
};

export const findLandingRow = (board, colIndex) => {
    for (let i = 0; i < board.length; i++) {
        if (board[i][colIndex].value !== "") {
            return i - 1;
        }
    }
    return board.length - 1;
};

export const totalCells = (board) => {
    return board.length * board[0].length;
};

export const draw = (board, r, c, currentPlayer) => {
    const tempBoard = copyBoard(board);
    tempBoard[r][c].value = currentPlayer.id;
    tempBoard[r][c].color = currentPlayer.color;
    return tempBoard;
};
