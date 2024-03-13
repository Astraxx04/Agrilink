import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Alert, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; 
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; 
const agriLinkLogo = require("../../assets/images/agriLinkLogo.png");

const SignUp = () => {
    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState(null);

    const navigation = useNavigation();

    const updateUserDetails = (newDetails) => {
        setUserDetails(prevState => ({
            ...prevState,
            ...newDetails
        }));
    };

    const handleSignUp = async () => {
        if (userDetails.name.trim() === "") {
            setError("Please enter your name");
            return;
        }
    
        if (userDetails.email.trim() === "") {
            setError("Please enter your email");
            return;
        }
    
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userDetails.email)) {
            setError("Please enter a valid email address");
            return;
        }
    
        if (userDetails.mobile.trim() === "") {
            setError("Please enter your mobile number");
            return;
        }
    
        if (userDetails.password.trim() === "") {
            setError("Please enter a password");
            return;
        }
    
        if (userDetails.password !== userDetails.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            console.log(userDetails);
            // const response = await axios.post("", {

            // });
            response = " ";
            if (response) {
                console.log('SignUp successful', response.data);
                Alert.alert("Success", "You are signed up successfully!");
                navigation.navigate('Login');
            }
        } catch (error) {
            console.error('Login error', error);
            setError('*Something went wrong. Try again later!');
        }
    };

    const toLoginPage = () => {
        navigation.navigate('Login');
    };

  return (
    <KeyboardAwareScrollView>
        <SafeAreaView style={styles.container}>
            <Image source={agriLinkLogo} style={styles.logo} />
            <View style={styles.formContainer}>
                <Text style={styles.label}>Name:</Text>
                <TextInput
                style={styles.input}
                placeholder='Enter name'
                value={userDetails.name}
                onChangeText={(text) => updateUserDetails({...userDetails, name: text})}
                />

                <Text style={styles.label}>Email:</Text>
                <TextInput
                style={styles.input}
                placeholder='Enter email'
                value={userDetails.email}
                onChangeText={(text) => setUserDetails({...userDetails, email: text})}
                />

                <Text style={styles.label}>Mobile:</Text>
                <TextInput
                style={styles.input}
                placeholder='Enter moble'
                value={userDetails.mobile}
                onChangeText={(text) => setUserDetails({...userDetails, mobile: text})}
                />

                <Text style={styles.label}>Password:</Text>
                <TextInput
                style={styles.input}
                placeholder='Enter password'
                value={userDetails.password}
                onChangeText={(text) => setUserDetails({...userDetails, password: text})}
                secureTextEntry
                />

                <Text style={styles.label}>Confirm Password:</Text>
                <TextInput
                style={styles.input}
                placeholder='Enter confirm password'
                value={userDetails.confirmPassword}
                onChangeText={(text) => setUserDetails({...userDetails, confirmPassword: text})}
                secureTextEntry
                />

                {error && <Text style={styles.errorText}>{error}</Text>}

                <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={toLoginPage}>
                    <Text style={styles.login}>Existing User? Login here</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 60,
    },
    formContainer: {
        width: '80%',
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
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginTop: 30,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    login: {
        textAlign: 'center',
        paddingTop: 10,
        color: 'tomato',
    }
});

export default SignUp;