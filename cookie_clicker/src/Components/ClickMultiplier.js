import React from "react";

function ClickMultiplier ({ clickMultiplier }) {
    let displayClickMultiplier = parseFloat(clickMultiplier.toFixed(2));

    return (
        <h1>Current Click Multiplier: {displayClickMultiplier}</h1>
    );
}

export default ClickMultiplier;