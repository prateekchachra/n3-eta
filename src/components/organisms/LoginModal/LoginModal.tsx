import React, {ChangeEvent, useState} from 'react';
import Modal from '../../molecules/modal/Modal';
import { FormGroup,Row,Col } from 'react-bootstrap';
import {
    google_login_btn,
    facebook_login_btn,
  } from '../../../assets/images';
import Firebase from '../../../constants/firebaseConfig';
import Button from '../../molecules/button/Button';
import './LoginModal.scss';

import {STATIC_DATA} from '../../../constants/staticData'
import { markUserAsLoggedIn } from '../../../redux/user/UserActions';
import { useDispatch } from 'react-redux';
import axios from '../../../api/axios';
import { UserModel } from '../../../redux/user/UserReducers';

export type LoginModalProps = {
    show: boolean,
    onHide: () => void,
}

 
const LoginModal = ({show,onHide} : LoginModalProps) : JSX.Element => {

    const dispatch = useDispatch();

    const [phoneNumber, setPhoneNumber] = useState('');
    const [isRequiredPhone, setIsRequiredPhone] = useState(false);
    const [requiredPhoneOTP, setRequiredPhoneOTP] = useState(false);
    const [displayPhone, setdisplayPhone] = useState(true);
    
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
          .then ( user => {
            if (!user) {
              const newUser: UserModel = {
                email: authUser.user.email,
                name: authUser.user.displayName,
                phone: authUser.user.phoneNumber,
                profileImage: authUser.user.photoURL,
                wishList: [],
                orders: [],
                cartItems: [],
                addresses: [],
              };
              addUser(newUser);
              dispatch(markUserAsLoggedIn(newUser));
            } else {
              dispatch(markUserAsLoggedIn(user));
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
      return response.data;
    }

    const addUser = async (user: UserModel) => {
      const response = await axios.post("/users", user);
      console.log("ADDED NEW USER", response.data);
    }
    
      
    const renderFooterComponent = () => {
        return(<>
            <Button type="contained" secondary label="Close" onClick={onHide} />
          </>)
    }
    return (
    <Modal 
        title="Login"
        show={show}
        footer={renderFooterComponent()}
        onHide={onHide}>
            <div className="login-container">
              <input value={phoneNumber} onChange={handlePhoneChange} className="form-control phoneInput" placeholder="Phone"/>

              <Button type="contained" secondary label="Send OTP" onClick={onHide} />

            <div className="social-signup">
                <span className="divider-or">OR</span>
                <p>
                Sign in with social account
                </p>
                <Row>
                <Col xs={6}>
                <img
                className="login_img"
                src={google_login_btn}
                alt={DEFAULT_IMAGE_ALT}
                onClick={handleGoogleSignIn} />
                </Col>
                <Col xs={6}>
                <img
                className="login_img"
                src={facebook_login_btn}
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