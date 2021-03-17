import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBpuIny1bfRepdDn3or9y1eSe7hcvkPG4Y",
    authDomain: "bt3103-week-6-f7753.firebaseapp.com",
    projectId: "bt3103-week-6-f7753",
    storageBucket: "bt3103-week-6-f7753.appspot.com",
    messagingSenderId: "304117394546",
    appId: "1:304117394546:web:8968accefd050cb7f366eb",
    measurementId: "G-E5MRR4GXYC"
  };

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;