import React from 'react'
import { useHistory } from 'react-router-dom';

import './Header.scss';

import { Bag, Heart, Person } from 'react-bootstrap-icons';
import Badge from '../../atoms/Badge/Badge';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

const Header = () :JSX.Element => {
    const history = useHistory();
    const numItemsInCart = useSelector<RootState, RootState["cartState"]>((state: RootState) => state.cartState).cartItems.length;
    const numItemsInWishlist = useSelector<RootState, RootState["wishlistState"]>((state: RootState) => state.wishlistState).wishlistItems.length;
    
    function renderLogo() {
        return(
            <div className="logoWrapper">
                <label className="logo" onClick= { (event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
                    event.preventDefault();
                    history.push("/");
                }}>
                    Style Zone
                </label>
            </div>
        )
    }

    function renderNavLinks() {
        return(
            <div className="navLinkContainer">
                <div className="navLinkWrapper">
                    <label className="navLink" onClick={ (event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
                        event.preventDefault();
                        history.push(`/list/${'men'}`);
                    }}>
                        Men
                    </label>
                </div>
                <div className="navLinkWrapper">
                    <label className="navLink" onClick={ (event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
                        event.preventDefault();
                        history.push(`/list/${'women'}`);
                    }}>
                        Women
                    </label>
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
                    <Heart onClick={(event: React.MouseEvent<SVGElement, MouseEvent>) => {
                            event.preventDefault();
                            history.push("/wishlist");
                        }
                    }/>
                    <Badge value={numItemsInWishlist} />
                </div>
                <div className="cartIcon">
                    <Bag onClick={(event: React.MouseEvent<SVGElement, MouseEvent>) => {
                            event.preventDefault();
                            history.push("/cart");
                        }
                    }  />
                    <Badge value={numItemsInCart} />
                </div>
                <div className="userAccountIcon">
                    <Person onClick={(event: React.MouseEvent<SVGElement, MouseEvent>) => {
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
