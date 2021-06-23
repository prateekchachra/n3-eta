import React, { ReactNode } from 'react'

import './PageTemplate.scss'

import Header from '../molecules/Header/Header';

type PageTemplateProps = {
    bodyComponent: ReactNode
}

const PageTemplate = ({bodyComponent}: PageTemplateProps) :JSX.Element => {

    function renderHeader() {
        return (
            <Header />
        );
    }

    function renderBody(bodyComponent: ReactNode) {
        return (
            <>
                {bodyComponent}
            </>
        );
    }

    function renderFooter() {
        return (
            <div>
                <span>FOOTER</span>
            </div>
        )
    }


    return (
        <>
            {renderHeader()}
            {renderBody(bodyComponent)}
            {renderFooter()}
        </>
    )
}

export default PageTemplate;
