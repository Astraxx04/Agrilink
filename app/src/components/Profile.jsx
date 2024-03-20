import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; 
import { DataTable } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const userLogo = require("../../assets/images/user.png");
import { Feather } from '@expo/vector-icons';

const Profile = () => {
    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);

    const updateUserDetails = (newDetails) => {
        setUserDetails(prevState => ({
            ...prevState,
            ...newDetails
        }));
    };

    useEffect(() => {
        fetchData();
    }, []);

    const navigation = useNavigation();

    const fetchData = async () => {
        try {
            // const response = await fetch('API_ENDPOINT');
            // if (!response.ok) {
            //     throw new Error('Failed to fetch data');
            // }
            // const data = await response.json();
            setUserData({
                name: "Gagan",
                email: "astraxx2542@gmail.com",
                mobile: "9008243280"
            });
        } catch (error) {
            setError(error.message);
        }
    };

    const handleEdit = () => {
        if(editMode == true)
            setEditMode(false);
        else
            setEditMode(true);
    };

    const handleSave = () => {
        setEditMode(false);
    };

    const handleCancel = () => {
        setEditMode(false);
    };

    const handleLogOut = async () => {
        navigation.navigate('Login');
    };

    return (
        <KeyboardAwareScrollView>
            <SafeAreaView style={styles.container}>
                <View style={styles.innerContainer}>
                    <Image source={userLogo} style={styles.logo} />
                    <View style={styles.detailBox}>
                        <Text style={styles.headingText}>Personal Details:</Text>
                        <View style={styles.formContainer}>
                            <TouchableOpacity style={styles.iconContainer} onPress={handleEdit}>
                                <Feather
                                    name="edit"
                                    size={24}
                                    color="black"
                                    style={styles.editIcon}
                                />
                            </TouchableOpacity>
                            <Text style={styles.label}>Name:</Text>
                            <TextInput
                            style={styles.input}
                            placeholder='Enter name'
                            value={userDetails.name}
                            onChangeText={(text) => updateUserDetails({...userDetails, name: text})}
                            editable={editMode}
                            />

                            <Text style={styles.label}>Email:</Text>
                            <TextInput
                            style={styles.input}
                            placeholder='Enter email'
                            value={userDetails.email}
                            onChangeText={(text) => setUserDetails({...userDetails, email: text})}
                            editable={editMode}
                            />

                            <Text style={styles.label}>Mobile:</Text>
                            <TextInput
                            style={styles.input}
                            placeholder='Enter moble'
                            value={userDetails.mobile}
                            onChangeText={(text) => setUserDetails({...userDetails, mobile: text})}
                            editable={editMode}
                            />

                            <Text style={styles.label}>Address:</Text>
                            <TextInput
                            style={styles.input}
                            placeholder='Enter password'
                            value={userDetails.password}
                            onChangeText={(text) => setUserDetails({...userDetails, password: text})}
                            editable={editMode}
                            />

                            <Text style={styles.label}>Aadhar Number:</Text>
                            <TextInput
                            style={styles.input}
                            placeholder='Enter password'
                            value={userDetails.password}
                            onChangeText={(text) => setUserDetails({...userDetails, password: text})}
                            editable={editMode}
                            />

                            <Text style={styles.label}>Pan Number:</Text>
                            <TextInput
                            style={styles.input}
                            placeholder='Enter confirm password'
                            value={userDetails.confirmPassword}
                            onChangeText={(text) => setUserDetails({...userDetails, confirmPassword: text})}
                            editable={editMode}
                            />

                            {editMode && (
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity style={[styles.modalButton, styles.saveButton]} onPress={handleSave}>
                                        <Text style={styles.buttonText}>Save</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.modalButton, styles.closeButton]} onPress={handleCancel}>
                                        <Text style={styles.buttonText}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </View>
                    
                    <TouchableOpacity style={styles.button} onPress={handleLogOut}>
                        <Text style={styles.buttonText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain' ,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    innerContainer: {
        width: '100%',
        alignItems: 'center',
    },
    headingText: {
        fontSize: 16,
        alignSelf: 'flex-start',
        marginLeft: '10%',
    },
    formContainer: {
        width: '80%',
        marginTop: 2,
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 1,
        padding: 20
    },
    button: {
        backgroundColor: 'tomato',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 20,
        width: 100,
        alignSelf: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        alignSelf: 'flex-start',
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    detailBox: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 30,
    },
    editIcon: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    iconContainer: {
        position: 'absolute',
        top: 5,
        right: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 'auto',
        marginTop: 10,
    },
    modalButton: {
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginHorizontal: 10,
    },
    saveButton: {
        backgroundColor: 'green',
        width: 120,
    },
    closeButton: {
        backgroundColor: 'red',
        width: 120,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default Profile;