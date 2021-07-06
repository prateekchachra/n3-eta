import React from 'react'
import { useHistory } from 'react-router-dom';

import './Header.scss';

import { Bag, Heart, Person } from 'react-bootstrap-icons';
import Search from '../../atoms/search/Search';
import Badge from '../../atoms/Badge/Badge';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import Button from '../button/Button';
import { showLoginModal } from '../../../redux/loginModal/LoginModalActions';
import { markUserAsLoggedOut } from '../../../redux/user/UserActions';
import { resetCart } from '../../../redux/cart/CartAction';
import { resetWishList } from '../../../redux/wishlist/WishlistActions';

const Header = () :JSX.Element => {
    const history = useHistory();
    const dispatch = useDispatch();
    const cartState = useSelector<RootState, RootState["cartState"]>((state: RootState) => state.cartState);
    const wishlistState = useSelector<RootState, RootState["wishlistState"]>((state: RootState) => state.wishlistState);
    const numItemsInCart = (cartState.cartItems) ? cartState.cartItems.length : 0;
    const numItemsInWishlist = (wishlistState.wishlistItems) ? wishlistState.wishlistItems.length : 0;
    const userState = useSelector<RootState, RootState["userState"]>((state: RootState) => state.userState);
    const {user} = userState;


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

    function onSearchBarEnterPressHandler(searchQuery: string) {
        if(searchQuery) {
            history.push(`/searchResult/${searchQuery}`);
        }
    }

    function renderSearchBar() {
        return (
            <div className="searchBarWrapper">
                <Search placeholder="Search by Product Name" 
                    onEnterPress={(query: string) => onSearchBarEnterPressHandler(query)}
                />
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
                            if(userState.isUserLoggedIn){
                                history.push("/cart");    
                            }
                            else {
                                history.push('/')
                                dispatch(showLoginModal(true));       
                            }
                            
                        }
                    }  />
                    <Badge value={numItemsInCart} />
                </div>
                { userState.isUserLoggedIn && 
                    (<div className="userAccountIcon">
                        <Person onClick={(event: React.MouseEvent<SVGElement, MouseEvent>) => {
                                event.preventDefault();
                                history.push("/profile");
                            }
                        }/>
                    </div>)
                }
                <div>
                    {renderAuthenticationButton()}
                </div>
            </div>
        );
    }

    function renderAuthenticationButton() {
        if(!userState.isUserLoggedIn) {
            return (
                <Button
                    label="Login"
                    type="contained"
                    onClick={() => dispatch(showLoginModal(true))}
                />
            )
        }

        return (
            <Button
                label="Log out"
                type="contained"
                onClick={() => onLogOutClickHandler()}
            />
        )

    }

    function onLogOutClickHandler() {
        localStorage.clear();
        dispatch(resetCart(userState.user.email));
        dispatch(resetWishList(userState.user.email));
        dispatch(markUserAsLoggedOut());
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
