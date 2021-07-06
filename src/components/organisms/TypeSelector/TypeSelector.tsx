import React from 'react';
import Selector from '../../molecules/selector/Selector';

import './TypeSelector.scss';


export type TypeSelectorProps = {
    label: string,
    values: string[],
    onSelectedChange: (selected: string) => void,
}


const TypeSelector = ({label, values, onSelectedChange} : TypeSelectorProps) : JSX.Element => {

    const renderType = (item: string) => (
        <span className="typeItem">{item}</span>
    )
    return (
    <Selector containerClass="typeSelectorContainer" itemClass="typeSelectorItem" label={label} values={values} customItemStyle
    onSelectedChange={onSelectedChange} renderItem={renderType}/>
    )
}
export default TypeSelector;