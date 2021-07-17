import React, {ChangeEvent, useState} from 'react';
import Modal from '../../../molecules/modal/Modal';
import { FormGroup,Row,Col } from 'react-bootstrap';
import {
    google_login_btn,
    facebook_login_btn,
    google_login_btn_es,
    facebook_login_btn_es,
  } from '../../../../assets/images';
import Firebase from '../../../../constants/firebaseConfig';
import fb from 'firebase/app';
import 'firebase/auth';
import Button from '../../../molecules/button/Button';
import './LoginModal.scss';
import { FormattedMessage, useIntl } from 'react-intl';
import {STATIC_DATA} from '../../../../constants/staticData'
import { markUserAsLoggedIn } from '../../../../redux/user/UserActions';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../../../api/axios';
import { UserModel } from '../../../../redux/user/UserReducers';
import { wishlistInitialState } from '../../../../redux/wishlist/WishlistReducer';
import { cartInitialState } from '../../../../redux/cart/CartReducer';
import { RootState } from '../../../../store';
import { LANGUAGES } from '../../../../utils/multilang';
import { toast } from 'react-toastify';

export type LoginModalProps = {
    show: boolean,
    onHide: () => void,
}

 
const LoginModal = ({show,onHide} : LoginModalProps) : JSX.Element => {

  const dispatch = useDispatch();
  const {formatMessage} = useIntl();
  const [phoneNumber, setPhoneNumber] = useState('');
  const userState = useSelector<RootState , RootState["userState"]>((state: RootState) => state.userState);
  
  
  const facebookLocaleButton = userState && userState.selectedLocale === LANGUAGES.ENGLISH ? facebook_login_btn
  : facebook_login_btn_es;

  const googleLocaleButton = userState && userState.selectedLocale === LANGUAGES.ENGLISH ? google_login_btn
  : google_login_btn_es;

  const firebase = new Firebase();

  const handleSendOTP = () => {
    if (phoneNumber || phoneNumber.length === 10) {
      try{
        const recaptchaVerifier = new fb.auth.RecaptchaVerifier('recaptchaContainer');
        firebase.auth.signInWithPhoneNumber('+91' + phoneNumber, recaptchaVerifier)
        .then((confirmationResult: any) => {
          const code = prompt("Enter OTP");
          confirmationResult.confirm(code)
          .then((result: any) => {
            onHide();
          })
        }).catch((err:any) => console.log(err));
        
      }catch(err){
        console.log(err);
      }
    } else {
      toast(formatMessage({id: 'check_number'}), {type: 'error'})
    }
  };





  const handleGoogleSignIn = () => {
    firebase
      .doGoogleSignIn()
      .then((authUser: any) => {

        fetchUser(authUser.user.email)
          .then ( response => {
            if(response.data.length) {
              const user = response.data[0];
              if ( !user ) {
                const newUser: UserModel = {
                  id: authUser.user.id,
                  email: authUser.user.email,
                  name: authUser.user.displayName,
                  phone: authUser.user.phoneNumber,
                  profileImage: authUser.user.photoURL,
                  wishList: wishlistInitialState,
                  orders: [],
                  cart: cartInitialState,
                  addresses: [],
                  cards:[]
                };
                addUser(newUser);
                dispatch(markUserAsLoggedIn(newUser));
              } else {
                dispatch(markUserAsLoggedIn(user));
              }
            } else {
              const newUser: UserModel = {
                id: authUser.user.uid,
                email: authUser.user.email,
                name: authUser.user.displayName,
                phone: authUser.user.phoneNumber,
                profileImage: authUser.user.photoURL,
                wishList: wishlistInitialState,
                orders: [],
                cart: cartInitialState,
                addresses: [],
                cards: [],
              };
              addUser(newUser);
              dispatch(markUserAsLoggedIn(newUser));
            }
            localStorage.setItem("userToken", authUser.user.uid);
          }).catch ( (error) => console.error(error));
        // firebase.db
        // .ref(`users/${authUser.user.uid}`)
        // .once('value', (snap: any) => {
        //     const user = snap.val();
        
          // });
      })
      .then(() => {
        onHide();
      })
      .catch((error: any) => {
        onHide();
      });
  };

  const handleFacebookSignIn = () => {
    firebase
      .doFacebookSignIn()
      .then((authUser: any) => {
        
        fetchUser(authUser.user.email)
          .then ( response => {
            if(response.data.length) {
              const user = response.data[0];
              if ( !user ) {
                const newUser: UserModel = {
                  id: authUser.user.id,
                  email: authUser.user.email,
                  name: authUser.user.displayName,
                  phone: authUser.user.phoneNumber,
                  profileImage: authUser.user.photoURL,
                  wishList: wishlistInitialState,
                  orders: [],
                  cart: cartInitialState,
                  addresses: [],
                  cards:[]
                };
                addUser(newUser);
                dispatch(markUserAsLoggedIn(newUser));
              } else {
                dispatch(markUserAsLoggedIn(user));
              }
            } else {
              const newUser: UserModel = {
                id: authUser.user.uid,
                email: authUser.user.email,
                name: authUser.user.displayName,
                phone: authUser.user.phoneNumber,
                profileImage: authUser.user.photoURL,
                wishList: wishlistInitialState,
                orders: [],
                cart: cartInitialState,
                addresses: [],
                cards: [],
              };
              addUser(newUser);
              dispatch(markUserAsLoggedIn(newUser));
            }
            localStorage.setItem("userToken", authUser.user.uid);
          }).catch ( (error) => console.error(error));
        // firebase.db
        // .ref(`users/${authUser.user.uid}`)
        // .once('value', (snap: any) => {
        //     const user = snap.val();
        
          // });
      })
      .then(() => {
        onHide();
      })
      .catch((error: any) => {
        onHide();
      });
  };

    const {DEFAULT_IMAGE_ALT} = STATIC_DATA;
    const handlePhoneChange = (event:ChangeEvent) =>{
        const {target} = event;
        if(target){
            setPhoneNumber((target as HTMLInputElement).value);
        }
      };
    
    const fetchUser = async (userId: string) => {
      const response = await axios.get(`users/?email=${userId}`);
      return response;
    }

    const addUser = async (user: UserModel) => {
      await axios.post("/users", user);
    }
    
    
    return (
    <Modal 
        title={formatMessage({id: 'login'})}
        show={show}
        onHide={onHide}>
            <div className="login-container">
              <input type="tel" pattern="[0-9]{10}" value={phoneNumber} onChange={handlePhoneChange} className="form-control phoneInput" placeholder={formatMessage({id: 'phone'})}/>

              <Button type="contained" secondary label={formatMessage({id: 'send_otp'})} onClick={handleSendOTP} />
              <div id="recaptchaContainer"></div>
            <div className="social-signup">
                <span className="divider-or"><FormattedMessage id="or"/></span>
                <p><FormattedMessage id="signin_text"/></p>
                <Row>
                <Col xs={6}>
                <img
                className="login_img"
                src={googleLocaleButton}
                alt={DEFAULT_IMAGE_ALT}
                onClick={handleGoogleSignIn} />
                </Col>
                <Col xs={6}>
                <img
                className="login_img"
                src={facebookLocaleButton}
                alt={DEFAULT_IMAGE_ALT}
                onClick={handleFacebookSignIn} />
                </Col>
                </Row>
            </div>
        </div>
    </Modal>
    )
}
export default LoginModal;