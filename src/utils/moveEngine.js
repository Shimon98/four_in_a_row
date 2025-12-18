import { isColumnFull, findLandingRow, draw, totalCells } from "./boardLogic.js";
import { checkWin } from "./checkWin.js";

export const doMove = (board, colIndex, currentPlayer, moveCount) => {
    if (isColumnFull(board, colIndex)) {
        return { didPlace: false };
    }
    const placedRow = findLandingRow(board, colIndex);
    const updatedBoard = draw(board, placedRow, colIndex, currentPlayer);
    const nextMoveCount = moveCount + 1;
    const didWin = nextMoveCount >= 7 &&
        checkWin(updatedBoard, placedRow, colIndex, currentPlayer.id);

    const winner = didWin ? currentPlayer.id : null;
    const isDraw = winner === null && nextMoveCount === totalCells(board);

    return {
        didPlace: true,
        updatedBoard,
        placedRow,
        nextMoveCount,
        winner,
        isDraw,
        lastMove: { row: placedRow, col: colIndex }
    };
};
