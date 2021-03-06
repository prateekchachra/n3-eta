import React from 'react'

import './PageTemplate.scss'

import Header from '../molecules/Header/Header';
import Footer from '../molecules/Footer/Footer';

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
            <Footer />
        )
    }


    return (
        <div className="templateContainer">
            {renderHeader()}
            {children}
            {renderFooter()}
        </div>
    )
}

export default PageTemplate;
