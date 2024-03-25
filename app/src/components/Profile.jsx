import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView,ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; 
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const userLogo = require("../../assets/images/user.png");
import { Feather } from '@expo/vector-icons';
import axios from 'axios';

const Profile = () => {
    const [userDetails, setUserDetails] = useState({});
    const [originalUserDetails, setOriginalUserDetails] = useState({});
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getUserData = async() => {
            try {
                const storedData = await AsyncStorage.getItem('userData');
                if (storedData !== null) {
                    const parsedData = JSON.parse(storedData);
                    fetchUserDetails(parsedData.user.user_id);
                }
            } catch (error) {
                console.error('Error retrieving user data:', error);
            }
        };
        getUserData();
    }, []);

    const fetchUserDetails = async(user_id) => {
        try {
            const getUserDetailsResponse = await axios.get(`http://localhost:5000/api/v1/getUserDetails/${user_id}`);
            const userData = getUserDetailsResponse.data;
            setUserDetails(userData);
            setOriginalUserDetails(userData);
            setIsLoading(false);
        }
        catch (error) {
            console.error('Error fetching user details:', error);
            setIsLoading(false);
            setIsLoading(false);
        }
    };

    const navigation = useNavigation();

    const validateAadharNumber = (aadharNo) => {
        const aadharRegex = /^\d{12}$/;
        return aadharRegex.test(aadharNo);
    };
    
    const validatePanNumber = (panNo) => {
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
        return panRegex.test(panNo.toUpperCase());
    };

    const handleEdit = () => {
        if(editMode == true)
            setEditMode(false);
        else
            setEditMode(true);
    };

    const handleSave = async() => {
        try {
            if (!userDetails.name) {
                setError("Name is required.");
                return;
            }
            if (!userDetails.email) {
                setError("Email is required.");
                return;
            }
            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userDetails.email)) {
                setError("Please enter a valid email.");
                return;
            }
            if (!userDetails.mobile) {
                setError("Mobile is required.");
                return;
            }
            if (!/^\d{10}$/.test(userDetails.mobile)) {
                setError("Please enter a valid mobile number.");
                return;
            }
            if (userDetails.aadharNo && !validateAadharNumber(userDetails.aadharNo)) {
                setError("Invalid Aadhar number.");
                return;
            }
            if (userDetails.panNo && !validatePanNumber(userDetails.panNo)) {
                setError("Invalid PAN number.");
                return;
            }
            setError(null);
            // await axios.post(`http://localhost:5000/api/v1/updateUserDetails/${userDetails.user_id}`, userDetails);
            // setOriginalUserDetails(userDetails);
            setEditMode(false);
        } catch (error) {
            console.error('Error saving user data:', error);
        }
    };

    const handleCancel = () => {
        setUserDetails(originalUserDetails);
        setEditMode(false);
    };

    const handleLogOut = async () => {
        navigation.navigate('Login');
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="green" />
            </View>
        );
    }

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
                            onChangeText={(text) => setUserDetails({...userDetails, name: text})}
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
                            placeholder='Enter address'
                            value={userDetails.address}
                            onChangeText={(text) => setUserDetails({...userDetails, address: text})}
                            editable={editMode}
                            />

                            <Text style={styles.label}>Aadhar Number:</Text>
                            <TextInput
                            style={styles.input}
                            placeholder='Enter aadhar number'
                            value={userDetails.aadharNo}
                            onChangeText={(text) => setUserDetails({...userDetails, aadharNo: text})}
                            editable={editMode}
                            />

                            <Text style={styles.label}>Pan Number:</Text>
                            <TextInput
                            style={styles.input}
                            placeholder='Enter pan number'
                            value={userDetails.panNo}
                            onChangeText={(text) => setUserDetails({...userDetails, panNo: text})}
                            editable={editMode}
                            />
                            {error && editMode && <Text style={styles.errorText}>{error}</Text>}
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});

export default Profile;