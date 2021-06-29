import React from 'react'

import './PageTemplate.scss'

import Header from '../molecules/Header/Header';

export type PageTemplateProps = {
    children: JSX.Element
}

const PageTemplate = ({children}: PageTemplateProps) :JSX.Element => {

    function renderHeader() {
        return (
            <Header />
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
            {children}
            {renderFooter()}
        </>
    )
}

export default PageTemplate;
