import React from 'react';
import Selector from '../../molecules/selector/Selector';

import './ColorSelector.scss';


export type ColorSelectorProps = {
    label: string,
    values: string[],
    onSelectedChange: (selected: string) => void,
}


const ColorSelector = ({label, values, onSelectedChange} : ColorSelectorProps) : JSX.Element => {

    const renderColor = (item: string) => (
        <span className="colorItem" style={{backgroundColor: item}}></span>
    )
    return (
    <Selector label={label} values={values} 
    onSelectedChange={onSelectedChange} renderItem={renderColor}/>
    )
}
export default ColorSelector;