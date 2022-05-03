import React,{useState,useContext} from 'react'
import {View,StyleSheet,StatusBar,Text,TextInput,ActivityIndicator,ScrollView,TouchableOpacity} from 'react-native'

import {FirebaseContext} from "../context/FireBaseContext"
import { UserContext } from "../context/UserContext"

export default function SignInScreen({navigation}) {

    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [loading,setLoading]= useState(false);
    
    const firebase = useContext(FirebaseContext)
    const [_, setUser] = useContext(UserContext)

    const signin = async () => {
        setLoading(true)
        try {
            await firebase.signIn(email,password);

            const uid = firebase.getCurrentUser().uid;

            const userInfo = await firebase.getUserInfo(uid);

            setUser({
                username: userInfo.username,
                email: userInfo.email,
                uid,
                profilePhotoUrl: userInfo.profilePhotoUrl,
                isLoggedIn: true,
            })
        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false);
        }
        const loggedOut = await firebase.signin()

        if (loggedOut) {
            setUser((state) => ({ ...state, isLoggedIn: false }))
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView>
            <View style={styles.main}>
                <Text style={styles.welcome}>
                    Welcome back.
                </Text>
            </View>

            <View style={styles.auth}>
                <View style={styles.authContainer}>
                   <Text style={styles.Text}>Email Adress</Text>
                   <TextInput 
                        style={styles.input} 
                        autoCapitalize='none' 
                        autoComplete='email' 
                        autoCorrect={false} 
                        autoFocus={true}
                        keyboardType='email-address'
                        onChangeText={email => setEmail(email.trim())}
                        value={email}
                    />
                     {/* trim(): removes whitespace from both ends of a string and returns a new string, without modifying the original string */}
                </View>
                <View style={styles.authContainer}>
                    <Text style={styles.Text}>Password</Text>
                    <TextInput 
                        style={styles.input} 
                        autoCapitalize='none' 
                        autoComplete='password' 
                        autoCorrect={false} 
                        secureTextEntry={true}
                        onChangeText={password => setPassword(password.trim())}
                        value={password}
                    />
                </View>
            </View>
            
            <TouchableOpacity 
                style={styles.SignInContainer} 
                disabled={loading}
                onPress={signin}>
                {loading ? (
                    <ActivityIndicator animating = {true} size="small" color="#fff"/>
                ) : (
                    <Text style={{ fontWeight: 'bold',color:"#ffffff",textAlign:"center" }}>
                        Sign in
                    </Text>
                )}
                
            </TouchableOpacity>

            <View style={styles.SignUp}>
                <Text style={{color:"#000"}}>
                    New to SocialApp?
                    <Text style={{ fontWeight: 'bold',color:"#8022d9"}}  
                        onPress={() => navigation.navigate("SignUp")}>
                        {' Sign up'}
                    </Text>
                </Text>
            </View>

            <View style={styles.headerGraphic}>
                <View style={styles.rightCercle}></View>
                <View style={styles.leftCercle}></View>
            </View>
            <StatusBar barStyle='light-content' style={styles.statusBar}/>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    main:{

    },
    welcome:{
        fontSize:32,
        textAlign: 'center',
        fontWeight:'300',
        marginTop:160,
    },
    auth:{
        marginTop: 64,
        marginHorizontal: 32,
        marginBottom: 32
    },
    authContainer:{
        marginBottom:10
    },
    SignInContainer:{
        marginVertical: 0,
        marginHorizontal: 32,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#8022d9",
        borderRadius: 6
    },
    SignUp:{
        marginTop:12,
        alignItems:'center'
    },
    Text:{
        color:"#8e93a1",
        fontSize: 12,
        textTransform: "uppercase",
        fontWeight: '300'
    },
    input:{
        borderBottomColor: "#8e93a1",
        borderBottomWidth: 0.5,
        height: 48
    },
    rightCercle:{
        backgroundColor: "#8022d9",
        position:'absolute',
        width: 400,
        height: 400,
        borderRadius: 200,
        right: -100,
        top: -210
    },
    leftCercle:{
        backgroundColor: "#23a6d5",
        position:'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        left: -50,
        top: -50
    },
    headerGraphic:{
        position:'absolute',
        width:'100%',
        top: -50,
        zIndex: -100
    },
    statusBar:{

    }
});