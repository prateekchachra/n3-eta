import React from 'react'

import './Header.scss';

import Search from '../../atoms/search/Search';
import { Bag, Heart, Person } from 'react-bootstrap-icons';

const Header = () :JSX.Element => {

    function renderLogo() {
        return(
            <div className="logoWrapper">
                <span className="logo">Style Zone</span>
            </div>
        )
    }

    function renderNavLinks() {
        return(
            <div className="navLinkContainer">
                <div className="navLinkWrapper">
                    <a href="" className="navLink">Men</a>
                </div>
                <div className="navLinkWrapper">
                    <a href="" className="navLink">Women</a>
                </div>
            </div>
        );
    }

    function renderSearchBar() {
        return (
            <div className="searchBarWrapper">
            </div>
        );
    }

    function renderQuickQctionLinks() {
        return (
            <div className="quickActionLinkWrapper">
                <Heart/>
                <Bag/>
                <Person/>
            </div>
        );
    }


    return (
        <header className="headerContainer">
                {renderLogo()}
                {renderNavLinks()}
                {renderSearchBar()}
                {renderQuickQctionLinks()}
        </header>
    )
}

export default Header;
