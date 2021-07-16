import React, {useState} from 'react';

import './Selector.scss';


export type SelectorProps = {
    label: string,
    values: string[],
    onSelectedChange: (selected: string) => void,
    customItemStyle?: boolean,
    containerClass?: string,
    itemClass?: string,
    renderItem: (item: string, selected: string) => JSX.Element  
}


const Selector = ({label, values, containerClass = '', itemClass='', onSelectedChange, renderItem, customItemStyle} : SelectorProps) : JSX.Element => {

    const [selected, setSelected] = useState('');

    const onItemClick = (item: string) => {
        if(item !== selected) {
            setSelected(item);
            onSelectedChange(item);
        }
    }
    const renderValues = () => (
        <div className={customItemStyle ? containerClass :  "selectorList"}>
        {values.map(item => (
            <div key={item} onClick={() => onItemClick(item)} className={`${customItemStyle ? itemClass : 'selectorItem'} ${selected === item ? 'selected' : ''}`}>
                {renderItem(item, selected)}
            </div>
            ))}
        </div>
    )
    return (
    <div className="selectorContainer">
          <label>{label}</label>
            {renderValues()}
    </div>)
}
export default Selector;