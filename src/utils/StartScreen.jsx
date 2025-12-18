import {useState} from "react";
import ColorPicker from "../components/ColorPicker.jsx";


export default function StartScreen({onStart}) {
    const colors = ["red", "gold", "limegreen", "deepskyblue", "purple", "hotpink"];

    const [p1Color, setP1Color] = useState("red");
    const [p2Color, setP2Color] = useState("gold");
    const [vsBot, setVsBot] = useState(false);

    const sizes = [
        {label: "Small", rows: 4, cols: 5},
        {label: "Medium", rows: 6, cols: 7},
        {label: "Big", rows: 8, cols: 9}
    ];

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "10px" }}>
                <label>
                    <input
                        type="checkbox"
                        checked={vsBot}
                        onChange={(e) => setVsBot(e.target.checked)}
                    />
                    Player vs Bot
                </label>
            </div>


            <h2>Choose board size</h2>
            <div style={{display: "flex", gap: "10px", justifyContent: "center", marginBottom: "10px"}}>
                {sizes.map((s) => (
                    <button
                        key={s.label}
                        onClick={() => onStart(s.rows, s.cols, p1Color, p2Color, vsBot)}
                    >
                        {s.label}
                    </button>
                ))}
            </div>

            <h2>Choose colors</h2>

            <div style={{display: "flex", gap: "30px", justifyContent: "center"}}>
                <ColorPicker
                    label="Player 1"
                    value={p1Color}
                    onChange={setP1Color}
                    colors={colors}
                    disabledColor={p2Color}
                />

                <ColorPicker
                    label="Player 2"
                    value={p2Color}
                    onChange={setP2Color}
                    colors={colors}
                    disabledColor={p1Color}
                />
            </div>
        </div>
    );
}
