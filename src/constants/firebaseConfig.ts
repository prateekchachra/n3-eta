import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_ID
};


class Firebase {
  db: any;
  auth: any;
  googleAuthProvider: any;
  facebookAuthProvider: any;
  storage: any;

  constructor() {
    if(!firebase.apps.length){
      firebase.initializeApp(config);
    }
    this.db = firebase.database();
    this.auth = firebase.auth();
    this.storage = firebase.storage();
    this.googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    this.facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
   
  }

  doGoogleSignIn = () => this.auth.signInWithPopup(this.googleAuthProvider);

  doFacebookSignIn = () => this.auth.signInWithPopup(this.facebookAuthProvider);

  user = (uid: string) => this.db.ref(`/users/${uid}`);

  doSignOut = () => this.auth.signOut();

  onAuthChangeListener = (next: any, fallback:  () => void) => {
    return this.auth.onAuthStateChanged((authUser: any) => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then((snapshot: any) => {
            const dbUser = snapshot.val();
            const user = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              ...dbUser,
            };
            next(user);
          });
      } else {
        fallback();
      }
    });
  };
}

export default Firebase;