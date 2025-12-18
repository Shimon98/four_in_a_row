import {findLandingRow, draw} from "./boardLogic.js";
import {checkWin} from "./checkWin.js";

export const chooseBotColumn = (board, botPlayer, humanPlayer) => {
    const cols = board[0].length;
    const validCols = [];
    for (let c = 0; c < cols; c++) {
        if (board[0][c].value === "") {
            validCols.push(c);
        }
    }
    if (validCols.length === 0) return null;
    for (let col of validCols) {
        const row = findLandingRow(board, col);
        const tempBoard = draw(board, row, col, botPlayer);

        if (checkWin(tempBoard, row, col, botPlayer.id)) {
            return col;
        }
    }
    for (let col of validCols) {
        const row = findLandingRow(board, col);
        const tempBoard = draw(board, row, col, humanPlayer);

        if (checkWin(tempBoard, row, col, humanPlayer.id)) {
            return col;
        }
    }
    const randomIndex = Math.floor(Math.random() * validCols.length);
    return validCols[randomIndex];
};
