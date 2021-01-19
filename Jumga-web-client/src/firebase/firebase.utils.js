import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/functions";
import "firebase/storage";
import { eventChannel } from "redux-saga";

const config = {
  apiKey: "AIzaSyBZaTbviUZyrC2gsyqOufDivGPrHvRcAYo",
  authDomain: "jumga-web.firebaseapp.com",
  projectId: "jumga-web",
  storageBucket: "jumga-web.appspot.com",
  messagingSenderId: "474859791179",
  appId: "1:474859791179:web:ad66447233277c31cabece",
  measurementId: "G-Z4S2DZ39CF"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = db.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const createProductStoreChannel = (ref) => {
  const listener = eventChannel((emit) => {
    const unsubscribe = ref.onSnapshot(function (querySnapshot) {
      const data = [];
      querySnapshot.forEach(function (doc) {
        data.push({ ...doc.data(), id: doc.id });
      });
      console.log(data,44444)
      emit(data);
    });

    return () => unsubscribe;
  });

  return listener;
};

export const createUserEventChannel = (ref) => {
  const listener = eventChannel((emit) => {
    const unsubscribe = ref.onSnapshot(function (doc) {
      // const data = [];
      // querySnapshot.forEach(function (doc) {
      //   data.push({ ...doc.data(), id: doc.id });
      // });
      console.log({ ...doc.data(), id: doc.id })
      emit({ ...doc.data(), id: doc.id });
    });

    return () => unsubscribe;
  });

  return listener;
};


export function uploadFileChannel(file) {
  return eventChannel((emit) => {
    const modifiedName = new Date().getTime() + file.name
    const uploadTask = storage.ref(`images/${modifiedName}`).put(file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(progress);
        emit({ progress });
      },
      (error) => {
        console.log(error);
        emit({ error });
      },
      () => {
        storage
          .ref("images")
          .child(modifiedName)
          .getDownloadURL()
          .then((url) => {
            emit({ url });
          });
      }
    );
    return () => {
      uploadTask.off("state_changed");
    };
  });
}

export const auth = firebase.auth();
export const db = firebase.firestore();
export const functions = firebase.functions();
export const storage = firebase.storage();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);
