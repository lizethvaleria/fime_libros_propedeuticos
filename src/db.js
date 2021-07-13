import firebase from 'firebase/app'
import 'firebase/firestore'

export const db = firebase
.initializeApp({ 
	apiKey: "AIzaSyDzPh-Ur15fQzX8zkIg5xqBV6654wCmWts",
    authDomain: "uanl-fime.firebaseapp.com",
    databaseURL: "https://uanl-fime.firebaseio.com",
    projectId: "uanl-fime",
    storageBucket: "uanl-fime.appspot.com",
    messagingSenderId: "222645550493",
    appId: "1:222645550493:web:9e608f0aa654ca59a50374"
})
.firestore();

const { Timestamp, GeoPoint } = firebase.firestore;

export { Timestamp, GeoPoint };