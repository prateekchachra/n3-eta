import React from 'react'

import './Header.scss';

import { Bag, Heart, Person } from 'react-bootstrap-icons';
import Search from '../../atoms/search/Search';
import Badge from '../../atoms/Badge/Badge';

const Header = () :JSX.Element => {

    function renderLogo() {
        return(
            <div className="logoWrapper">
                <a href="/" className="logo">Style Zone</a>
            </div>
        )
    }

    function renderNavLinks() {
        return(
            <div className="navLinkContainer">
                <div className="navLinkWrapper">
                    <a href="/mens" className="navLink">Men</a>
                </div>
                <div className="navLinkWrapper">
                    <a href="/womens" className="navLink">Women</a>
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
                <div>
                    <a href="" className="wishListIcon">
                        <Heart/>
                        <Badge value={1} />
                    </a>
                </div>
                <div>
                    <a href="" className="cartIcon">
                        <Bag/>
                        <Badge value={1} />
                    </a>
                </div>
                <div>
                    <a href="" className="userAccountIcon">
                        <Person/>
                    </a>
                </div>
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
