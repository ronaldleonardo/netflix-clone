import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDU6Ok_DcB2MDMTeAK-9g0f2sIV5DZDNQs",
  authDomain: "netflix-clone-db-d5f27.firebaseapp.com",
  projectId: "netflix-clone-db-d5f27",
  storageBucket: "netflix-clone-db-d5f27.appspot.com",
  messagingSenderId: "459384336123",
  appId: "1:459384336123:web:7bdefe4f79ca34aadf8a5e"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

export { auth }; 
export default db;  