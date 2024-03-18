


import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Modal, Button, Text, ImageBackground, Alert, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; 
export default function PostCattle(){
    const navigation=useNavigation();
    const [name,setName]=useState('');
    const[type,setType]=useState('');
    const [price,setPrice]=useState('');
    const[phone,setPhone]=useState('');
    function handleNameChange(name){
        setName(name);
    }
    function handleMaterialChange(material){
        setType(type);
    }
    function handlePriceChange(price){
        setPrice(price);
    }
    function handlePhoneChange(phone){
        setPhone(phone);
    }
   
    async function PostData(){

        try{
            const data=await axios.post('http://192.168.0.101:5000/postCattle', {
            name,
            type,
            price,
            phone
            
          })
          console.log('Inserted successfully',data.data);
          navigation.navigate('Market');
        }
        catch(err){
            console.log(err);
        }
       
    }
    return(
        <KeyboardAwareScrollView>
        <SafeAreaView style={styles.container}>
            
            <View>
                <Text style={styles.titleText}>Enter the Details</Text>
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.label}>Name : </Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={handleNameChange}
                    inputMode='text'
                />

                <Text style={styles.label}>Material Type : </Text>
                <TextInput
                    style={styles.input}
                    value={type}
                    onChangeText={handleMaterialChange}
                    inputMode='text'
                />

                <Text style={styles.label}>Price : </Text>
                <TextInput
                    style={styles.input}
                    value={price}
                    onChangeText={handlePriceChange}
                    inputMode='text'
                />
                <Text style={styles.label}>Phone : </Text>
                <TextInput
                    style={styles.input}
                    value={phone}
                    onChangeText={handlePhoneChange}
                    inputMode='text'
                />

            
                <TouchableOpacity style={styles.button} onPress={PostData}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 160,
    },
    formContainer: {
        width: '80%',
        marginBottom: 100
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: 'green',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 40,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 'auto',
    },
    modalButton: {
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginHorizontal: 10,
    },
    saveButton: {
        backgroundColor: 'green',
        width: 100,
    },
    closeButton: {
        backgroundColor: 'red',
        width: 100,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 40,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        width: '100%',
        paddingHorizontal: 40,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
        height: '50%',
    },
    modalText: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    responseText: {
        fontSize: 24,
        paddingTop: 60,
        textTransform: 'capitalize',
    },
});

