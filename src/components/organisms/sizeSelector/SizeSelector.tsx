import React from 'react';
import Selector from '../../molecules/selector/Selector';

import './SizeSelector.scss';


export type SizeSelectorProps = {
    label: string,
    values: string[],
    onSelectedChange: (selected: string) => void,
}


const SizeSelector = ({label, values, onSelectedChange} : SizeSelectorProps) : JSX.Element => {

    const renderColor = (item: string) => (
        <div className="sizeItemContainer">
            <span className="sizeItem">{item}</span>
        </div>
    )
    return (
    <Selector label={label} values={values} 
    onSelectedChange={onSelectedChange} renderItem={renderColor}/>
    )
}
export default SizeSelector;