import React,{useEffect} from 'react';
import './App.scss';

import {BrowserRouter, Switch, Route} from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import Profile from './pages/Profile/Profile';
import Cart from './pages/Cart/Cart';
import Wishlist from './pages/Wishlist/Wishlist';
import Payment from './pages/Payment/Payment';
import ProductList from './pages/ProductList/ProductList';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Checkout from './pages/Checkout/Checkout';
import LoginModal from './components/organisms/modals/LoginModal/LoginModal';
import { RootState } from './store';
import { connect, useDispatch, useSelector } from 'react-redux';
import { showLoginModal } from './redux/loginModal/LoginModalActions';
import { markUserAsLoggedOut } from './redux/user/UserActions';
import PrivateRoute from './components/hocs/PrivateRoute';
import { ToastContainer } from 'react-toastify';

import { I18nProvider, LANGUAGES } from './utils/multilang';
import { useState } from 'react';

import 'react-toastify/dist/ReactToastify.css';


function App ({userState } : any): JSX.Element {
  const dispatch = useDispatch();
  const userToken = localStorage.getItem("userToken");
  const showLoginModalFlag =  useSelector<RootState, RootState["loginModalState"]>((state) => state.loginModalState).showLoginModal;
  
  const selectedLocale = userState ? userState.selectedLocale : LANGUAGES.ENGLISH;
  const [locale, setLocale] = useState(selectedLocale);


  useEffect(() => {
    setLocale(userState.selectedLocale);
  }, [userState]);

  useEffect( () => {
    if(!userToken && userState.isUserLoggedIn) {
      dispatch(markUserAsLoggedOut(userState.user));
    }
  }, [userToken]);

  const hideLoginModalActionHandler = () => {
    dispatch(showLoginModal(false));
  }

  return (
    <div className="App">
       <I18nProvider locale={locale}>
        <BrowserRouter>
        <ToastContainer
            autoClose={3000}
          />
          <Switch>

              <Route exact path="/" component={HomePage} />
              <Route path="/list/:gender" component={ProductList} />
              <Route path="/searchResult/:queryParam" component={ProductList} />
              <Route path="/wishlist" component={Wishlist} />
              <Route path="/item/:productId" component={ProductDetail} />
                <Route path="/offers/list" component={ProductList} />
                  <Route path="/cart" component={Cart} />
                  <Route path="/profile" component={Profile} />
                  <Route path="/payment" component={Payment} />
                  <Route path="/checkout" component={Checkout} />
                  {/* <PrivateRoute path="/cart" component={Cart} />
                  <PrivateRoute path="/profile" component={Profile} />
                  <PrivateRoute path="/payment" component={Payment} />
                  <PrivateRoute path="/checkout" component={Checkout} /> */}

                  
          </Switch>
          <LoginModal
              show={showLoginModalFlag}
              onHide={hideLoginModalActionHandler}
          />
        </BrowserRouter>
      </I18nProvider>
    </div>
  );
}
const mapStateToProps = (state: any) => ({
  userState: state.userState,
})
export default connect(mapStateToProps, {})(App);
