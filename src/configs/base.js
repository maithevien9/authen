import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyA-v6OPyZVm-2r7ie1HxzS8oOyz6kTJxOk',
  authDomain: 'voxo-955b1.firebaseapp.com',
  projectId: 'voxo-955b1',
  storageBucket: 'voxo-955b1.appspot.com',
  messagingSenderId: '707825104152',
  appId: '1:707825104152:web:e02c406eab224f7892da6d',
  measurementId: 'G-QS46E600SN',
};

const firebaseapp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();

export { auth, googleProvider, facebookProvider, firebaseConfig };
