import React, {useState, KeyboardEventHandler, ChangeEvent, MouseEventHandler} from 'react';

import './search.scss';


export type SearchProps = {
    placeholder: string,
    onEnterPress: MouseEventHandler,
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
        <span onClick={onEnterPress}></span>
    </div>)
}
export default Search;