import React from 'react'
import {FlatList, StatusBar, View, Text, StyleSheet, Image,ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'

import tempData from "../../tempData"

export default function HomeScreen() {

    const renderPost = ({item}) => (
        
            <View style={styles.postContainer}>
                
                <View style={styles.postHeaderContainer}>
                    
                    <Image style={styles.photoProfile} source={{ uri: item.user.profilePhotoUrl }} />
                    
                    <View tyle={styles.postInfoContainer}>
                        <Text style={styles.userName}>
                            {item.user.username}
                        </Text>
                        <Text style={styles.postedAt}>
                            {item.postedAt}
                        </Text>
                    </View>

                    <View style={styles.Entypo}>
                        <Entypo  
                            name={"dots-three-horizontal"} 
                            size={16} 
                            color="#73788b"
                        />
                    </View>
                </View>
                <View style={styles.post}>
                    <Text style={styles.textPost}>
                        {item.post}
                    </Text>
                    <Image 
                        style={styles.imagePost} 
                        source={{ uri: item.photoUrl }} />
                    <View style={styles.postDetails}>
                        <View style={styles.postLikes}>
                            <Ionicons name="ios-heart-outline" size={24} color="#73788b" />
                            <Text style={styles.textLikes}>
                                {item.likes}
                            </Text>
                        </View>
                        <View style={styles.postComments}>
                            <Ionicons name="ios-chatbubbles" size={24} color="#73788b" />
                            <Text style={styles.textComments}>
                                {item.comments}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
    )


    return (
        <View style={styles.container}>
            <View style={styles.feedContainer}>
                <Text style={styles.text}>
                        Feed
                </Text>
                <FlatList
                    data={tempData}
                    renderItem={renderPost}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={{
                        paddingBottom: 120,
                    }} 
                />
            </View>

            <StatusBar barStyle='dark-content'>

            </StatusBar>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1 ,
        backgroundColor: "#ebecf3",
        paddingTop: 20
    },
    feedContainer: {
    },
    text: {
        alignItems: 'center',
        color: "#23a8d9",
        fontSize: 32,
        color: "#4d4f5e",
        alignSelf: 'center',
        paddingBottom: 10
    },
    postContainer: {
    },
    postHeaderContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center'
    },
    postContainer: {
        marginTop: 16,
        marginRight: 16,
        marginBottom: 0,
        marginLeft: 16,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        padding: 8
    },
    photoProfile: {
        width: 48,
        height: 48,
        borderRadius: 24
    },
    postInfoContainer: {
        flex: 1,
        marginTop: 0,
        marginRight: 16
    },
    userName: {
        fontSize: 17,
        marginLeft: 10
    },
    postedAt: {
        color: "#c1c3cc",
        marginTop: 4,
        marginLeft: 10
    },
    post: {
        marginLeft: 64
    },
    imagePost: {
        width: "100%",
        height: 150,
        borderRadius: 6
    },
    postDetails: {
        flexDirection: 'row',
        marginTop: 6
    },
    postLikes: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    postComments: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 16

    },
    textLikes: {
        marginLeft: 8
    },
    textComments: {
        marginLeft: 8
    },
    Entypo: {
        marginLeft: 50
    },
    bottom: {
        paddingBottom: 10
    }
});