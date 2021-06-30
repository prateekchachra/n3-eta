import React from 'react'
import { useHistory } from 'react-router-dom';

import './Header.scss';

import { Bag, Heart, Person } from 'react-bootstrap-icons';
import Search from '../../atoms/search/Search';
import Badge from '../../atoms/Badge/Badge';

const Header = () :JSX.Element => {
    const history = useHistory();
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
                    <a href="/list" className="navLink">Men</a>
                </div>
                <div className="navLinkWrapper">
                    <a href="/list" className="navLink">Women</a>
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
                <div className="wishListIcon">
                    <Heart onClick={(event: any) => {
                            event.preventDefault();
                            history.push("/wishlist");
                        }
                    }/>
                    <Badge value={1} />
                </div>
                <div className="cartIcon">
                    <Bag onClick={(event: any) => {
                            event.preventDefault();
                            history.push("/cart");
                        }
                    }  />
                    <Badge value={1} />
                </div>
                <div className="userAccountIcon">
                    <Person onClick={(event: any) => {
                            event.preventDefault();
                            history.push("/profile");
                        }
                    }/>
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
