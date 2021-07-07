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
import LoginModal from './components/organisms/LoginModal/LoginModal';
import { RootState } from './store';
import { useDispatch, useSelector } from 'react-redux';
import { showLoginModal } from './redux/loginModal/LoginModalActions';
import { markUserAsLoggedOut } from './redux/user/UserActions';
import PrivateRoute from './components/hocs/PrivateRoute';


function App (): JSX.Element {
  const dispatch = useDispatch();
  const showLoginModalFlag =  useSelector<RootState, RootState["loginModalState"]>((state) => state.loginModalState).showLoginModal;
  const userToken = localStorage.getItem("userToken");

    
  useEffect( () => {
    if(!userToken) {
      dispatch(markUserAsLoggedOut());
    }
  }, [userToken]);

  const hideLoginModalActionHandler = () => {
    dispatch(showLoginModal(false));
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/offers/list" component={ProductList} />
                <Route path="/list/:gender" component={ProductList} />
                <Route path="/searchResult/:queryParam" component={ProductList} />
                <Route path="/wishlist" component={Wishlist} />
                <Route path="/item/:productId" component={ProductDetail} />

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
   
    </div>
  );
}

export default App;
