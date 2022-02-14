// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  doc,
  getDocs,
  setDoc,
  Timestamp,
  onSnapshot,
  where, 
  orderBy
} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6Cip4pZTVMZATL6pWKA37iANnHp0cP-g",
  authDomain: "modern-javascript-52c4a.firebaseapp.com",
  projectId: "modern-javascript-52c4a",
  storageBucket: "modern-javascript-52c4a.appspot.com",
  messagingSenderId: "355748458379",
  appId: "1:355748458379:web:58a1719c14603fa723898e",
  measurementId: "G-4479SWRFJZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//  *************************************************************

// adding new chat documents
// setting up a real time listener to get new chats
// updating the username
// updting the room

export class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chat = getDocs(collection(db, "chat"));
    this.unsub;
  }
  async addChat(message) {
    const now = new Date();
    // document is a object
    const chat = {
      message,
      username: this.username,
      room: this.room,
      created_at: Timestamp.fromDate(now),
    };

    // save the chat as a document
    await setDoc(doc(collection(db, "chat")), chat); 
  }
//   add realtime to get changes
  getChats(callback){  
    const q = query(collection(db, "chat"), where("room", "==", this.room), orderBy('created_at'));
    this.unsub = onSnapshot(q, (snapshot) => {    
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
         callback(change.doc.data());
        }
      });
    });
  }
  updateName (username){
    this.username = username;
    localStorage.setItem('username', username);
  }

  updateRoom(room){
    this.room = room;
    console.log('room updated');
    if(this.unsub){
    this.unsub();
  }
  }
}


