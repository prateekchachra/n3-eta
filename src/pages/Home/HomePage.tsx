import React from 'react'
import './HomePage.scss';

import PageTemplate from '../../components/templates/PageTemplate';

const HomePage = () => {

    function renderBody() {
        return (
            <div className="bodyComponent">
                <span>BODY COMPONENT</span>
            </div>
        )
    }


    return (
        <div>
            <PageTemplate bodyComponent={renderBody()}/>
        </div>
    )
}

export default HomePage;
