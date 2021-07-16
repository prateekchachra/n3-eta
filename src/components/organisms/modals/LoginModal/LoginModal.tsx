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

export type LoginModalProps = {
    show: boolean,
    onHide: () => void,
}

 
const LoginModal = ({show,onHide} : LoginModalProps) : JSX.Element => {

  const dispatch = useDispatch();
  const {formatMessage} = useIntl();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isRequiredPhone, setIsRequiredPhone] = useState(false);
  const [requiredPhoneOTP, setRequiredPhoneOTP] = useState(false);
  const [displayPhone, setdisplayPhone] = useState(true);
  const userState = useSelector<RootState , RootState["userState"]>((state: RootState) => state.userState);
  
  
  const facebookLocaleButton = userState && userState.selectedLocale === LANGUAGES.ENGLISH ? facebook_login_btn
  : facebook_login_btn_es;

  const googleLocaleButton = userState && userState.selectedLocale === LANGUAGES.ENGLISH ? google_login_btn
  : google_login_btn_es;

  const [errorMessage, setErrorMessage] = useState('');
  const firebase = new Firebase();

  const handleSendOTP = () => {
    if (phoneNumber) {
      const recaptchaVerifier = firebase.getRecaptcha();

      firebase.auth
        .signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
        .then((confirmationResult: any) => {
          setIsRequiredPhone(false);
          setdisplayPhone(false);
        });
    } else {
      setIsRequiredPhone(true);
    }
  };
  
  const handleLogin = () => {
    // if (mobileOTP) {
      // window.confirmationResult.confirm(mobileOTP).then((result: any) => {
      //   firebase.db
      //     .ref(`users/${result.user.uid}`)
      //     .once('value', (snap: any) => {
      //       const user = snap.val();

      //       if (user) {
      //         setUser(user);
      //         if (user.cartItems) {
      //           addItemsToCart(user.cartItems);
      //         }
      //         setrequireduserName(false);
      //         onHide();
      //       } else {
      //         setdisplayProfile(result.user.uid);
      //       }
      //       setrequiredMobileOTP(false);
      //     });
      // });
    // } else {
      // setErrorMessage(LOGIN_OTP_VALIDATION_TEXT);
      setRequiredPhoneOTP(true);
    // }
  };


  
  // const handleProfileSubmit = () => {
  //   if (userName && imageFileURL) {
  //     const uploadTask = firebase.storage
  //       .ref(`/images/${displayProfile}`)
  //       .put(imageFile);

  //     uploadTask.on('state_changed', console.log, console.error, () => {
  //       firebase.storage
  //         .ref('images')
  //         .child(displayProfile)
  //         .getDownloadURL()
  //         .then((url: any) => {
  //           const newUser = {
  //             uid: displayProfile,
  //             email: '',
  //             name: userName,
  //             phone: mobileNo,
  //             image: url,
  //             wishlist: [],
  //             orders: [],
  //             cartItems: [],
  //             addresses: [],
  //           };
  //           setUser(newUser);
  //           firebase.db
  //             .ref(`users/${displayProfile}`)
  //             .set(newUser)
  //             .then(() => {
  //               setrequireduserName(false);
  //               onHide();
  //             })
  //             .catch(console.log);
  //         });
  //     });
  //   } else {
  //     setErrorMessage(LOGIN_NAME_VALIDATION_TEXT);
  //     setrequireduserName(true);
  //   }
  // };



  const handleGoogleSignIn = () => {
    firebase
      .doGoogleSignIn()
      .then((authUser: any) => {

        fetchUser(authUser.user.email)
          .then ( response => {
            if(response.data.length) {
              const user = response.data[0];
              if ( !user ) {
                console.log("inside if");
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
                console.log("inside else");
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
        return firebase.user(authUser.user.uid).set({
          email: authUser.user.email,
          username: authUser.user.displayName,
          roles: {},
        });
      })
      .then(() => {
        onHide();
      })
      .catch((error: any) => {
        console.log({ errorMessage: error });
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
      console.log("USER EXISTS",response.data);
      return response;
    }

    const addUser = async (user: UserModel) => {
      const response = await axios.post("/users", user);
      console.log("ADDED NEW USER", response.data);
    }
    
    
    return (
    <Modal 
        title={formatMessage({id: 'login'})}
        show={show}
        onHide={onHide}>
            <div className="login-container">
              <input value={phoneNumber} onChange={handlePhoneChange} className="form-control phoneInput" placeholder={formatMessage({id: 'phone'})}/>

              <Button type="contained" secondary label={formatMessage({id: 'send_otp'})} onClick={onHide} />

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