import React from "react";

function UpgradeButton({ onClick, cost }) {
    let displayCost = parseFloat(cost.toFixed(0));

    return (
        <button className='UpgradeButton' onClick={onClick}>Upgrade Click by 20%. Cost: {displayCost}</button>
    );
}

export default UpgradeButton;