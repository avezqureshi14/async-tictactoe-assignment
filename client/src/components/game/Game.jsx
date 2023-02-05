import React, { useState } from 'react'
import Board from './Board';
import Navbar from '../Navbar';
const Game = ({ channel }) => {
        const handleClick = () => {
            window.location.reload();
        };

        const [playersJoined, setPlayersJoined] = useState(
            channel.state.watcher_count === 2
        );

        const [result, setResult] = useState({ winner: "none", state: "none" });
        channel.on("user.watching.start", (event) => {
            setPlayersJoined(event.watcher_count === 2);
        });
        if (!playersJoined)
            return <div class="waiting" > Waiting for other player to join...</div>;
        return <div class='gameContainer' >
            <Navbar/>
            <div class="boardingContainer">
                <Board result={result} setResult={setResult} />
                {result.winner !== 'none' && <div class="winnerBack" >Winner: {result.winner}</div>}
                {result.winner === 'none' && result.state === 'tied' && <div>Tied</div>}
                <div class="newGame hover_shadow" onClick={handleClick} >Start New Game</div>

            </div>
        </div>
    }

    export default Game