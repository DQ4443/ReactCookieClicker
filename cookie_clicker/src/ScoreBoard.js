import React from "react";

function ScoreBoard({ score }) {
    let displayScore = parseFloat(score.toFixed(0));

    return (
        <h1>You currently have {(displayScore)} Cookies!</h1>
    );
}

export default ScoreBoard;