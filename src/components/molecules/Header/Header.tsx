import React from 'react'

import './Header.scss';

import Search from '../../atoms/search/Search';
import { Bag, Heart, Person } from 'react-bootstrap-icons';

import { Link, useHistory } from 'react-router-dom';

const Header = () :JSX.Element => {
    const history = useHistory();
    function renderLogo() {
        return(
            <div className="logoWrapper">
                <span className="logo" onClick={() => history.push('/')}>Style Zone</span>
            </div>
        )
    }

    function renderNavLinks() {
        return(
            <div className="navLinkContainer">
                <div className="navLinkWrapper">
                    <Link to="list" className="navLink">Men</Link>
                </div>
                <div className="navLinkWrapper">
                    <Link to="list" className="navLink">Women</Link>
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
                        <Heart onClick={() => history.push('wishlist')}/>
                        <span className="quantityBadge">1</span>
                    </a>
                </div>
                <div>
                    <a href="" className="cartIcon">
                        <Bag onClick={() => history.push('cart')}/>
                        <span className="quantityBadge">1</span>
                    </a>
                </div>
                <div>
                    <a href="" className="userAccountIcon">
                        <Person onClick={() => history.push('profile')}/>
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
