

function inBounds(board, r, c) {
    return r >= 0 && r < board.length && c >= 0 && c < board[0].length;
}

function countDirection(board, row, col, dRow, dCol, player) {
    let count = 0;
    let r = row + dRow;
    let c = col + dCol;

    while (inBounds(board, r, c) && board[r][c].value === player) {
        count++;
        r += dRow;
        c += dCol;
    }

    return count;
}

function hasFourInLine(board, row, col, dRow, dCol, player) {
    const total =
        1 +
        countDirection(board, row, col, dRow, dCol, player) +
        countDirection(board, row, col, -dRow, -dCol, player);

    return total >= 4;
}

export function checkWin(board, row, col, player) {
    if (!board || row === null || col === null) return false;
    if (!inBounds(board, row, col)) return false;
    if (board[row][col].value !== player) return false;

    return (
        hasFourInLine(board, row, col, 0, 1, player) ||
        hasFourInLine(board, row, col, 1, 0, player) ||
        hasFourInLine(board, row, col, 1, 1, player) ||
        hasFourInLine(board, row, col, -1, 1, player)
    );
}
