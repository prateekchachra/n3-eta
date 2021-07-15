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
    
    const handleKeyDownEvent = (event: React.KeyboardEvent<HTMLInputElement>) => {
        console.log("From enter press");
        if(event.key === 'Enter') {
           onEnterPress(inputVal);
           setInputVal("");
        }
    }

    const handleSearchButtonClickEvent = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        onEnterPress(inputVal);
        setInputVal("");
    }

    return (
    <div className="searchContainer">
        <input type="text" placeholder={placeholder} value={inputVal}
        onChange={onChangeText} onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => handleKeyDownEvent(event)}/>
        <span className="searchIconWrapper" onClick={(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => handleSearchButtonClickEvent(event)}>
            <Icon/>
        </span>
    </div>)
}
export default Search;