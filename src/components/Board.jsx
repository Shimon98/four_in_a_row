import "./Board.css";

export default function Board(props) {


    const CELL = 60;
    const GAP = 8;
    const STEP = CELL + GAP;

    const cols = props.board[0].length;
    const gridStyle = {gridTemplateColumns: "repeat(" + cols + ", 60px)"};
    const lastMove = props.lastMove;

    return (
        <>

            <div className="arrow-row" style={gridStyle}>
                {props.board[0].map((_, c) => (
                    <div key={c} className="arrow-cell">
                        <div
                            className="preview-disc"
                            style={{
                                backgroundColor: props.courntPlayer.color,
                                visibility: props.hoverCol === c ? "visible" : "hidden"
                            }}
                        />
                    </div>
                ))}
            </div>


            <div
                className={"board-container " + (props.shake ? "shake" : "")}
                style={gridStyle}
                onMouseLeave={() => props.setHoverCol(null)}
            >
                {props.board.map((row, r) =>
                    row.map((col, c) => {
                        const isLast =
                            lastMove &&
                            lastMove.row === r &&
                            lastMove.col === c;

                        return (
                            <div
                                key={r + ":" + c}
                                className="board-cell"
                                onMouseEnter={() => props.setHoverCol(c)}
                                onMouseLeave={() => props.setHoverCol(null)}
                                onClick={() => props.onColumnClick(c)}
                            >
                                {col.value !== "" && (
                                    <div
                                        className={"disc" + (isLast ? " drop" : "")}
                                        style={{
                                            backgroundColor: col.color,
                                            "--dropY": (-(r + 1) * STEP) + "px"
                                        }}
                                    />
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </>
    );
}
