import React from 'react';
import Loader from 'react-loader-spinner';

import './fullPageLoader.scss';

const FullPageLoader = () : JSX.Element => {
    return(
        <div className="loaderContainer">
            <Loader
                type="ThreeDots"
                color="#00BFFF"
                height={60}
                width={60}
            />    
        </div>
    );
}

export default FullPageLoader;