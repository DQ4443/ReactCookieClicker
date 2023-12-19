import React from "react";

function AutoClickerManager({ autoClickerShop, autoClickersOwned, buyAutoClicker }) {
    return (
        <div>
            {autoClickerShop.map((item, index) => (
                <button className='BuyAC' key={index} onClick={() => buyAutoClicker(index)}>
                    AutoClicker{index}. Cost:{item.cost}. CPS:{item.CPS}
                </button>
            ))}
        </div>
        
    )
};

export default AutoClickerManager;