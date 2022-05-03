import React , {useState,useContext} from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native'
//import { GiftedChat } from 'react-native-gifted-chat';
import Task from '../../components/Task';
import { Ionicons } from '@expo/vector-icons'


import { FirebaseContext } from '../context/FireBaseContext'
import { UserContext } from "../context/UserContext"

export default function PostScreen() {

    const [user, setUser] = useContext(UserContext)
    const firebase = useContext(FirebaseContext)

    const [task, setTask] = useState();
    const [taskItems, setTaskItems] = useState([]);

    const handleAddTask = () => {
        Keyboard.dismiss();
        setTaskItems([...taskItems, task])
        setTask(null);
    }
    
    const completeTask = (index) => {
        let itemsCopy = [...taskItems];
        itemsCopy.splice(index, 1);
        console.log(index);
        setTaskItems(itemsCopy)
    }
    

    return (
        <View style={styles.container}>

        <ScrollView
            contentContainerStyle={{
            flexGrow: 1,
            paddingBottom:110
            }}
            keyboardShouldPersistTaps='handled'
        >

        <View style={styles.tasksWrapper}>
            <Text style={styles.sectionTitle}>Today's tasks</Text>
            <View style={styles.items}>
            {
                taskItems.map((item, index) => {
                return (
                    <TouchableOpacity key={index}  onPress={() => completeTask(index)}>
                    <Task text={item} /> 
                    </TouchableOpacity>
                )
                })
            }
            </View>
        </View>
            
        </ScrollView>

            <View style={styles.writeTaskWrapper}>
                <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)} />
                <TouchableOpacity onPress={() => handleAddTask()}>
                <View style={styles.addWrapper}>
                    <Ionicons 
                      name="add"
                      size={30}
                      style={styles.ionicstyle}
                    ></Ionicons>
                </View>
                </TouchableOpacity>
            </View>
        
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E8EAED',
    },
    tasksWrapper: {
      paddingTop: 20,
      paddingHorizontal: 20,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: 'bold'
    },
    items: {
      marginTop: 30,
    },
    writeTaskWrapper: {
      position: 'absolute',
      bottom: 60,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    input: {
      paddingVertical: 15,
      paddingHorizontal: 15,
      backgroundColor: '#FFF',
      borderRadius: 60,
      borderColor: '#C0C0C0',
      borderWidth: 1,
      width: 250,
    },
    addWrapper: {
      width: 60,
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 60,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#C0C0C0',
      borderWidth: 1,
    },
    ionicstyle: {
      color: '#000',
      marginLeft: 2.5,
      marginTop: 2
    },
  });