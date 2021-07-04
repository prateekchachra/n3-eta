import React, {useState, KeyboardEventHandler, ChangeEvent, MouseEventHandler} from 'react';

import './search.scss';

import { Search as Icon } from 'react-bootstrap-icons';

export type SearchProps = {
    placeholder: string,
    onEnterPress(query: string): void,
}


const Search = ({placeholder, onEnterPress} : SearchProps) : JSX.Element => {

    const [inputVal, setInputVal] = useState('');

    const onChangeText = (e : ChangeEvent) => {
        const {target} = e;
        if(target){
            setInputVal((target as HTMLInputElement).value)
        }
    }

    return (
    <div className="searchContainer">
        <input type="text" placeholder={placeholder} value={inputVal}
        onChange={onChangeText}/>
        <span className="searchIconWrapper" onClick={(event) => onEnterPress(inputVal)}>
            <Icon/>
        </span>
    </div>)
}
export default Search;