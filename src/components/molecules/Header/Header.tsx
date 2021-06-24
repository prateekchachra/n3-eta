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
                <div>
                    <a href="" className="wishListIcon">
                        <Heart/>
                        <span className="quantityBadge">1</span>
                    </a>
                </div>
                <div>
                    <a href="" className="cartIcon">
                        <Bag/>
                        <span className="quantityBadge">1</span>
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
