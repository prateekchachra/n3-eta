import React, {useState} from 'react';

import './search.scss';


type searchProps = {
    placeholder: string,
    onEnterPress: (value: string) => void,
}


const Search = ({placeholder, onEnterPress} : searchProps) => {

    const [inputVal, setInputVal] = useState('');


    return (
    <div className="searchContainer">
        <input type="text" placeholder={placeholder} value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}/>
    </div>)
}
export default Search;