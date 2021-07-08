import React, { SyntheticEvent } from 'react'
import { useHistory } from 'react-router-dom';

import './Header.scss';

import { Bag, Heart, Person } from 'react-bootstrap-icons';
import Search from '../../atoms/search/Search';
import Badge from '../../atoms/Badge/Badge';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import Button from '../button/Button';
import { showLoginModal } from '../../../redux/loginModal/LoginModalActions';
import { markUserAsLoggedOut, setCurrentLocale } from '../../../redux/user/UserActions';
import { resetCart } from '../../../redux/cart/CartAction';
import { resetWishList } from '../../../redux/wishlist/WishlistActions';
import DropDown from '../dropdown/DropDown';
import { LANGUAGES_OPTIONS } from '../../../utils/multilang/languages';

const Header = () :JSX.Element => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {formatMessage} = useIntl();

    const cartState = useSelector<RootState, RootState["cartState"]>((state: RootState) => state.cartState);
    const wishlistState = useSelector<RootState, RootState["wishlistState"]>((state: RootState) => state.wishlistState);
    const numItemsInCart = (cartState.cartItems) ? cartState.cartItems.length : 0;
    const numItemsInWishlist = (wishlistState.wishlistItems) ? wishlistState.wishlistItems.length : 0;
    const userState = useSelector<RootState, RootState["userState"]>((state: RootState) => state.userState);

    const onLanguageSelect = (event: SyntheticEvent) => {
        const {target} = event;
        if(target){
            dispatch(setCurrentLocale((target as HTMLSelectElement).value))
        }
    }
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
                        <FormattedMessage id="men" />
                    </label>
                </div>
                <div className="navLinkWrapper">
                    <label className="navLink" onClick={ (event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
                        event.preventDefault();
                        history.push(`/list/${'women'}`);
                    }}>
                        <FormattedMessage id="women" />
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
                <Search placeholder={formatMessage({id: 'search_placeholder'})} 
                    onEnterPress={(query: string) => onSearchBarEnterPressHandler(query)}
                />
            </div>
        );
    }

    function renderQuickActionLinks() {
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
                <div className="cartIcon">
                    <DropDown onSelect={onLanguageSelect} options={LANGUAGES_OPTIONS}/>
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
                    label={formatMessage({id: "login"})}
                    type="contained"
                    onClick={() => dispatch(showLoginModal(true))}
                />
            )
        }

        return (
            <Button
                label={formatMessage({id: "logout"})}
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
            {renderQuickActionLinks()}
        </header>
    )
}

export default Header;
