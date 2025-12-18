import "./Player.css";

export default function Player(props) {
    const playerId = props.id;
    const playerColor = props.color;
    const isBot=props.isBot

    return (
        <div className="player">
            <div
                className="player-token"
                style={{ backgroundColor: playerColor }}
            />
            <div className="player-name">
                {playerId}
            </div>
        </div>
    );
}
