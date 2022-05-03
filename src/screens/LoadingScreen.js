import React, {useContext, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'

import {UserContext} from "../context/UserContext"

import LottieView from "lottie-react-native"
import { FirebaseContext } from '../context/FireBaseContext';

export default function LoadingScreen() {

    const [_,setUser] = useContext(UserContext);
    const firebase = useContext(FirebaseContext)

    useEffect(() => {
        setTimeout(async() => {
            const user = firebase.getCurrentUser()

            if (user) {
                const userInfo = await firebase.getUserInfo(user.uid)

                setUser({
                    isLoggedIn: true,
                    email: userInfo.email,
                    uid: user.uid,
                    username: userInfo.username,
                    profilePhotoUrl: userInfo.profilePhotoUrl
                })
            } else {
                setUser((state) => ({ ...state, isLoggedIn:false}));
            }

        }, 500);
    })

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                SocialApp
            </Text>
            <LottieView 
                source={require("../../assets/890-loading-animation.json")} 
                autoPlay
                loop
                style={{ width:"100%" }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: '#222222',
    },
    text: {
        fontSize:48,
        color: '#fff'
    },
})
