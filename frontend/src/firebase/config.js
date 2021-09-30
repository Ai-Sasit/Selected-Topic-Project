import firebase from "firebase/app";
import "firebase/storage";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD_Aq4IM1ZEqB2GUBMSMEVOonaQVn8kSco",
    authDomain: "likestream-42add.firebaseapp.com",
    projectId: "likestream-42add",
    storageBucket: "likestream-42add.appspot.com",
    messagingSenderId: "37019108240",
    appId: "1:37019108240:web:158319198a70c86c40e915",
    measurementId: "G-3ZQ24F4EM5"
  };

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {storage, firebase as default};