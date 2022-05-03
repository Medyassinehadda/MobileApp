import React, {createContext} from "react";

import firebase from "firebase/compat/app"
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const FirebaseContext = createContext()

if (!firebase.apps.length) {
    firebase.initializeApp({
        //You must put here your firebase parameter
    })
}

const db = firebase.firestore()

const FireBase = {
    getCurrentUser: () => {
        return firebase.auth().currentUser
    },
    createUser: async (user) => {
        try {
            await firebase.auth().createUserWithEmailAndPassword(user.email,user.password);
            const uid = FireBase.getCurrentUser().uid;

            let  profilePhotoUrl = "default";

            await db.collection("users").doc(uid).set({
                username: user.username,
                email: user.email,
                profilePhotoUrl
            })

            if (user.profilePhoto) {
                profilePhotoUrl = await FireBase.uploadProfilePhoto(user.profilePhoto)
            }
            
            delete user.password;

            return { ...user, profilePhotoUrl, uid};
        } catch (error) {
            console.log("Error @createUser: ", error);
        }
    },

    uploadProfilePhoto: async (uri) => {
        const uid = FireBase.getCurrentUser().uid;

        try {
            const photo = await FireBase.getBlob(uri);

            const imagerRef = firebase.storage().ref("ProfilePhoto").child(uid);
            await imagerRef.put(photo);

            const url = await imagerRef.getDownloadURL();

            await db.collection("users").doc(uid).update({
                profilePhotoUrl: url,
            });

            return url;
        } catch (error) {
            console.log("Error @uploadProfilePhoto: ", error);
        }
    },

    getBlob : async (uri) => {
        return await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()

            xhr.onload = () => {
                resolve(xhr.response)
            }

            xhr.onerror = () => {
                reject(new TypeError("Network request failed."))
            }

            xhr.responseType = "blob"
            xhr.open("GET", uri,true)
            xhr.send(null);
        })
    },

    getUserInfo: async (uid) => {
        try {
            const user = await db.collection("users").doc(uid).get()

            if (user.exists) {
                return user.data();
            }
        } catch (error) {
            console.log("Error @getUserInfo: ", error)
        }
    },

    logOut: async () => {
        try {
            await firebase.auth().signOut();

            return true;
        } catch (error) {
            console.log("Error @logOut: ",error);
        }

        return false;
    },

    signIn: async (email,password) => {
        return firebase.auth().signInWithEmailAndPassword(email,password);
    }
};

const FireBaseProvider = (props) => {
    return <FirebaseContext.Provider value={FireBase}>{props.children}</FirebaseContext.Provider>
}

export {FirebaseContext, FireBaseProvider}
