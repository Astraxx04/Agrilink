import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Alert, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; 
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; 
const agriLinkLogo = require("../../assets/images/agriLinkLogo.png");

const Login = () => {
    const [useremail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const navigation = useNavigation();

    const handleLogin = async () => {
    try {
        console.log(useremail, password);
        // const response = await axios.post('https://pokemon-ash.up.railway.app/api/v1/login', {

        // });
        response = true;
        if (response) {
            console.log('Login successful', response.data);
            Alert.alert("Success", "You are logged in successfully!");
            navigation.navigate('Tabs');
        }
    } catch (error) {
        console.error('Login error', error);
        setError('*Incorrect User Email or Password');
    }
  };
    const toSignUpPage = () => {
        navigation.navigate('SignUp'); // Assuming 'SignUp' is the name of your signup screen
    };

  return (
    <KeyboardAwareScrollView>
        <SafeAreaView style={styles.container}>
            <Image source={agriLinkLogo} style={styles.logo} />
            <View style={styles.formContainer}>
                <Text style={styles.label}>Email:</Text>
                <TextInput
                style={styles.input}
                value={useremail}
                onChangeText={(text) => setUserEmail(text)}
                />

                <Text style={styles.label}>Password:</Text>
                <TextInput
                style={styles.input}
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
                />
                {error && <Text style={styles.errorText}>{error}</Text>}

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={toSignUpPage}>
                    <Text style={styles.signup}>New User? Sign Up here</Text>
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
        marginTop: 140,
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
        width: 250,
        height: 250,
        resizeMode: 'contain',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    signup: {
        textAlign: 'center',
        paddingTop: 10,
        color: 'tomato',
    }
});

export default Login;