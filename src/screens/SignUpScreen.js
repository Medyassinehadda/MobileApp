import React,{useState, useContext} from 'react'
import {Image,View,StyleSheet,StatusBar,Text,TextInput,ActivityIndicator,ScrollView, TouchableOpacity,Platform} from 'react-native'
import {AntDesign} from '@expo/vector-icons'
import * as Permissions from "expo-permissions"
import * as ImagePicker from "expo-image-picker"
import {FirebaseContext} from "../context/FireBaseContext"
import {UserContext} from "../context/UserContext"


export default function SignUpScreen({navigation}) {

    const [username,setUsername] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [loading,setLoading]= useState(false);
    const [profilePhoto,setProfilePhoto] = useState();
    const firebase = useContext(FirebaseContext);
    const [_,setUser] = useContext(UserContext);


    const getPermission = async () => {
        if (Platform.OS !== "web") {
            const {status} = await Permissions.askAsync(Permissions.CAMERA)

            return status
        }
    }

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1,1],
                quality: 0.5,
            })
            
            if (!result.cancelled) {
                setProfilePhoto(result.uri)
            }
        } catch (error) {
            console.log("error puckimage: ",error)
        }
    }

    const addProfilePhoto = async () => {
        const status = await getPermission();
        if (status !== "granted") {
            alert("We need permission to access to your camera.")
        }
        pickImage();
    };

    const signUp = async () => {
        setLoading(true)

        const user = {username, email, password, profilePhoto};

        try {
            const createUser = await firebase.createUser(user);

            setUser({ ...createUser, isLoggedIn: true });
        } catch (error) {
            console.log("Error @signUp",error);
        } finally {
            setLoading(false);
        }

    };

    return (
        <View style={styles.container}>
            <ScrollView>
            <View style={styles.main}>
                <Text style={styles.welcome}>
                    Sign up to get started
                </Text>
            </View>
            
            <TouchableOpacity style={styles.profilePhotoContainer} onPress={addProfilePhoto}>
                {profilePhoto ? (
                    <Image
                        style={styles.profilephoto} 
                        source={{ uri:profilePhoto }}
                    />
                ) : (
                    <View style={styles.defaultProfilePhoto}>
                        <AntDesign name="plus" size={24} color="#fff" />
                    </View>
                )}
            </TouchableOpacity>

            <View style={styles.auth}>
                <View style={styles.authContainer}>
                   <Text style={styles.Text}>User name</Text>
                   <TextInput 
                        style={styles.input} 
                        autoCapitalize='none' 
                        autoCorrect={false} 
                        autoFocus={true}
                        onChangeText={username => setUsername(username.trim())}
                        value={username}
                    />
                     {/* trim(): removes whitespace from both ends of a string and returns a new string, without modifying the original string */}
                </View>
                <View style={styles.authContainer}>
                   <Text style={styles.Text}>Email Adress</Text>
                   <TextInput 
                        style={styles.input} 
                        autoCapitalize='none' 
                        autoComplete='email' 
                        autoCorrect={false} 
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
            
            <TouchableOpacity style={styles.SignInContainer} disabled={loading} >
                {loading ? (
                    <ActivityIndicator animating = {true} size="small" color="#fff"/>
                ) : (
                    <Text onPress={signUp} style={{ fontWeight: 'bold',color:"#ffffff",textAlign:"center" }}>
                        Sign up
                    </Text>
                )}
            </TouchableOpacity>
            
            <View style={styles.SignUp}>
                <Text style={{color:"#000"}}>
                    Already have an account?
                    <Text style={{ fontWeight: 'bold',color:"#8022d9"}}  
                        onPress={() => navigation.goBack()}>
                        {' Sign in'}
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
    profilePhotoContainer:{
        backgroundColor: "#e1e2e6",
        width: 80,
        height: 80,
        borderRadius: 40,
        alignSelf: 'center',
        marginTop: 10,
        overflow: 'hidden'
    },
    defaultProfilePhoto:{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    profilephoto:{
        flex:1
    },
    welcome:{
        fontSize:32,
        textAlign: 'center',
        fontWeight:'300',
        marginTop:160,
    },
    auth:{
        marginTop: 10,
        marginHorizontal: 32,
        marginBottom: 25
    },
    authContainer:{
        marginBottom:15
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
        alignItems:'center',
        marginBottom:20
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