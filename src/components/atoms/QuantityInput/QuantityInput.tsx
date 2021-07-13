import React, { useState }from 'react';

import './QuantityInput.scss';

export type QuantityInputProps = {
    sendBackQuantity: (value: number) => void,
}

const QuantityInput = ({sendBackQuantity} : QuantityInputProps): JSX.Element => {


      const [value, setValue] = useState(1);

    
    const increment = () => {
        const netValue = value + 1;
        setValue(netValue);
        sendBackQuantity(netValue);
    }
    
    const decrement = () =>  {
        const netValue = value > 1 ? value - 1 : 1;
        setValue(netValue);
        sendBackQuantity(netValue);
    }
    
      return (
        <div className="quantityInput">
          <button className="quantityInput__modifier quantityInput__modifier--left" disabled={value === 1} onClick={decrement}>
            &mdash;
          </button>
          <input className="quantityInput__screen" type="text" value={value} readOnly />
          <button className="quantityInput__modifier quantityInput__modifier--right" onClick={increment}>
            &#xff0b;
          </button>  
        </div>  
      );
  }
  
export default QuantityInput;