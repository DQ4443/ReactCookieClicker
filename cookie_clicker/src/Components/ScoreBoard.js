import React from "react";

function ScoreBoard({ score, totalCPS }) {
    let displayScore = parseFloat(score.toFixed(0));

    return (
        <div>
            <h1>You currently have {(displayScore)} Cookies!</h1>
            <h2>Current Cookies / Second: {totalCPS}</h2>
        </div>
    );
}

export default ScoreBoard;