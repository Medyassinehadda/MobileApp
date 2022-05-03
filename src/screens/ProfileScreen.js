import React, {useContext} from 'react'
import { Image, StyleSheet, View,Text, TouchableOpacity } from 'react-native'

import { FirebaseContext } from '../context/FireBaseContext'
import { UserContext } from "../context/UserContext"

export default function ProfileScreen() {
    const [user, setUser] = useContext(UserContext)
    const firebase = useContext(FirebaseContext)
    
    const logout = async () => {
        const loggedOut = await firebase.logOut()

        if (loggedOut) {
            setUser((state) => ({ ...state, isLoggedIn: false }));
        }
    }

    return (
        <View style={styles.container}>
            
            <View style={styles.photoContainer}>
                <Image 
                    style={styles.photo} 
                    source={ user.profilePhotoUrl === "default" 
                    ? require("../../assets/defaultProfilePhoto.jpg") 
                    : { uri: user.profilePhotoUrl } } 
                />
            </View>


            <Text style={styles.name}>{user.username}</Text>


            <View style={styles.statsContainer}>
                <View style={styles.statContainer}>
                    <Text style={ styles.textNum } >
                        21
                    </Text>
                    <Text style={ styles.textNom } >
                        Posts
                    </Text>
                </View>
                <View style={styles.statContainer}>
                    <Text style={ styles.textNum } >
                        981
                    </Text>
                    <Text style={ styles.textNom } >
                        Followers
                    </Text>
                </View>
                <View style={styles.statContainer}>
                    <Text style={ styles.textNum } >
                        66
                    </Text>
                    <Text style={ styles.textNom } >
                        Following
                    </Text>
                </View>
            </View>

            <TouchableOpacity 
                style={ styles.btn }
                onPress={logout}>
                <Text style={ styles.btnText }>Log out</Text>
            </TouchableOpacity>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1 ,
        alignItems: 'center',
        marginTop: 20
    },
    photoContainer:{
        shadowOpacity: 0.8,
        shadowRadius: 30,
        shadowColor: "#222222"
    },
    photo: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    name :{
        fontWeight: "bold",
        fontSize: 20,
        marginTop: 16,
        marginBottom: 32
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 32,
        flex: 1
    },
    statContainer: {
        alignItems: 'center',
        flex: 1
    },
    textNum: {
        fontSize: 25,
        color: "#4d4f5e"
    },
    textNom: {
        fontSize: 15,
        fontWeight: 'bold',
        color: "#c2c4cd"
    },
    btnText: {
        fontWeight: "bold",
        alignItems: 'center',
        color: "#23a8d9",
        fontSize: 20
    },
    btn: {
        marginBottom: -120,
        flex:1
    }
})
