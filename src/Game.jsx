import Board from "./components/Board.jsx";
import Player from "./components/Player.jsx";
import StartScreen from "./utils/StartScreen.jsx";
import "./Game.css";
import {createBoard} from "./utils/boardLogic.js";
import {doMove} from "./utils/moveEngine.js";
import {useEffect, useState} from "react";
import {chooseBotColumn} from "./utils/botLogic.js";

export default function Game() {
    const [players, setPlayers] = useState([
        {id: "Player 1", color: "red", isBot: false},
        {id: "Player 2", color: "gold", isBot: false}
    ]);

    const [size, setSize] = useState(null);
    const [board, setBoard] = useState(null);
    const [currentPlayer, setCurrentPlayer] = useState(players[0])
    const [winner, setWinner] = useState(null)
    const [isDraw, setIsDraw] = useState(false);
    const [shake, setShake] = useState(false);
    const [moveCount, setMoveCount] = useState(0);
    const [hoverCol, setHoverCol] = useState(null)
    const [lastMove, setLastMove] = useState(null);
    const [isBotThinking, setIsBotThinking] = useState(false);


    const resetState = () => {
        setWinner(null);
        setIsDraw(false);
        setMoveCount(0);
        setShake(false);
        setHoverCol(null);
        setLastMove(null);
        setIsBotThinking(false);
    };

    const startGame = (rows, cols, p1Color, p2Color, vsBot) => {
        const newPlayers = [
            {id: "Player 1", color: p1Color, isBot: false},
            {id: "Player 2", color: p2Color, isBot: vsBot}
        ];
        setPlayers(newPlayers);
        setSize({rows, cols});
        setBoard(createBoard(rows, cols));
        setCurrentPlayer(newPlayers[0]);
        resetState()
    };

    const restartGame = () => {
        setBoard(createBoard(size.rows, size.cols));
        setCurrentPlayer(players[0]);
        resetState()
    };

    const returnToMenu = () => {
        setBoard(null);
        setSize(null);
        setCurrentPlayer(players[0]);
        resetState()
    };

    const triggerShake = () => {
        setShake(true);
        setTimeout(() => setShake(false), 350);
    };

    const switchPlayer = () => {
        setCurrentPlayer(currentPlayer.id === players[0].id ? players[1] : players[0]);
        if (currentPlayer.isBot) {
        }
    };


    const handleColumnClick = (colIndex, fromBot = false) => {
        if (winner !== null || isDraw) return;
        if (isBotThinking && !fromBot) {
            triggerShake();
            return;
        }
        const result = doMove(board, colIndex, currentPlayer, moveCount);
        if (!result.didPlace) {
            triggerShake();
            return;
        }
        setLastMove(result.lastMove);
        setBoard(result.updatedBoard);
        setMoveCount(result.nextMoveCount);

        if (result.winner !== null) {
            setWinner(result.winner);
            return;
        }

        if (result.isDraw) {
            setIsDraw(true);
            return;
        }
        switchPlayer();
    };

    useEffect(() => {
        if (!board) return;
        if (!players[1].isBot) return;
        if (winner !== null || isDraw) return;
        if (!currentPlayer.isBot) return;
        const thinkingId = setTimeout(() => setIsBotThinking(true), 0);
        const timerId = setTimeout(() => {
            const human = players.find((p) => !p.isBot);
            const botCol = chooseBotColumn(board, currentPlayer, human, moveCount);
            setIsBotThinking(false);
            if (botCol === null) return;
            handleColumnClick(botCol, true);
        }, 3000);
        return () => {
            clearTimeout(thinkingId);
            clearTimeout(timerId);
        };
    }, [board, currentPlayer, winner, isDraw, players, moveCount]);

    return (
        <div className="game-fit">
            <div className="game-background">

                {board === null && (
                    <h1 className="game-title">Four in a Row</h1>
                )}

                <div className="game-panel">
                    {board === null ? (
                        <StartScreen onStart={startGame}/>
                    ) : (
                        <>
                            {winner !== null && <p>The winner is {winner}</p>}
                            {isDraw && <p>It's a draw!</p>}

                            {winner === null && !isDraw && (
                                <p>Current turn: {currentPlayer.id}</p>
                            )}

                            <Player id={currentPlayer.id} color={currentPlayer.color}/>

                            <Board
                                board={board}
                                shake={shake}
                                onColumnClick={handleColumnClick}
                                hoverCol={hoverCol}
                                setHoverCol={setHoverCol}
                                courntPlayer={currentPlayer}
                                lastMove={lastMove}
                            />

                            <div style={{display: "flex", gap: "10px", justifyContent: "center", marginBottom: "10px"}}>
                                <button onClick={restartGame}>Restart</button>
                                <button onClick={returnToMenu}>Return to Menu</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}