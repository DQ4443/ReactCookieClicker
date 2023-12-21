import React from "react";

function AutoClickerManager({ autoClickerShop, autoClickersOwned, buyAutoClicker }) {
    const displayText = autoClickersOwned.join(', ');

    return (
        <div >
            <div className='ACButtons'>
                {autoClickerShop.map((item, index) => (
                    <button className='BuyAC' key={index} onClick={() => buyAutoClicker(index)}>
                        AutoClicker {index} <br />
                        Cost:{Math.round(item.cost * 1.2 ** autoClickersOwned[index]/50) * 50}. <br />
                        Currently Owned: {autoClickersOwned[index]}  <br />
                        CPS:{item.CPS}
                    </button>    
                ))}
            </div>
        </div>
    )
};

export default AutoClickerManager;