import React from "react";

function BuyCursor({ onClick, cost }) {
    let displayCost = parseFloat(cost.toFixed(0));

    return (
        <button className='BuyCursor' onClick={onClick}>Buy a cursor that clicks every second. Cost: {displayCost}</button>
    );
}

export default BuyCursor;