import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Alert, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; 
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; 
const agriLinkLogo = require("../../assets/images/agriLinkLogo.png");
import 'react-native-get-random-values';
const { v4: uuidv4 } = require('uuid');
import { useTranslation } from 'react-i18next';

const SignUp = () => {
    const {t, i18n} = useTranslation();
    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
        user_id: "",
    });
    const [error, setError] = useState(null);

    const navigation = useNavigation();

    const updateUserDetails = (newDetails) => {
        setUserDetails(prevState => ({
            ...prevState,
            ...newDetails
        }));
    };

    function generateUserId() {
        return uuidv4();
    }

    const handleSignUp = async () => {

        if (userDetails.name.trim() === "") {
            setError(t('name-error'));
            return;
        }
    
        if (userDetails.email.trim() === "") {
            setError(t('email-error1'));
            return;
        }
    
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userDetails.email)) {
            setError(t('email-error2'));
            return;
        }
    
        if (userDetails.mobile.trim() === "") {
            setError(t('mobile-error1'));
            return;
        }

        if (!/^\d{10}$/.test(userDetails.mobile)) {
            setError(t('mobile-error2'));
            return;
        }
    
        if (userDetails.password.trim() === "") {
            setError(t('password-error1'));
            return;
        }
    
        if (userDetails.password !== userDetails.confirmPassword) {
            setError(t('password-error2'));
            return;
        }

        try {
            const userId = generateUserId();
            userDetails.user_id = userId;
            const response = await axios.post("http://localhost:5000/api/v1/signupUser", {
                name: userDetails.name,
                email: userDetails.email,
                password: userDetails.password,
                mobile: userDetails.mobile,
                address: "",
                aadharNo: "",
                panNo: "",
                user_id: userDetails.user_id,
            });
            if (response) {
                console.log('SignUp successful', response.data);
                Alert.alert("Success", "Signup successfull!");
                navigation.navigate('Login');
            }
        } catch (error) {
            console.error('Login error', error);
            setError(t('signup-error'));
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
                <Text style={styles.label}>{t('name')}:</Text>
                <TextInput
                style={styles.input}
                placeholder={t('name-placeholder')}
                value={userDetails.name}
                onChangeText={(text) => updateUserDetails({...userDetails, name: text})}
                />

                <Text style={styles.label}>{t('email')}:</Text>
                <TextInput
                style={styles.input}
                placeholder={t('email-placeholder')}
                value={userDetails.email}
                onChangeText={(text) => setUserDetails({...userDetails, email: text})}
                />

                <Text style={styles.label}>{t('mobile')}:</Text>
                <TextInput
                style={styles.input}
                placeholder={t('mobile-placeholder')}
                value={userDetails.mobile}
                onChangeText={(text) => setUserDetails({...userDetails, mobile: text})}
                />

                <Text style={styles.label}>{t('password')}:</Text>
                <TextInput
                style={styles.input}
                placeholder={t('password-placeholder')}
                value={userDetails.password}
                onChangeText={(text) => setUserDetails({...userDetails, password: text})}
                secureTextEntry
                />

                <Text style={styles.label}>{t('confirm-password')}:</Text>
                <TextInput
                style={styles.input}
                placeholder={t('confirm-password-placeholder')}
                value={userDetails.confirmPassword}
                onChangeText={(text) => setUserDetails({...userDetails, confirmPassword: text})}
                secureTextEntry
                />

                {error && <Text style={styles.errorText}>{error}</Text>}

                <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                    <Text style={styles.buttonText}>{t('signup')}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={toLoginPage}>
                    <Text style={styles.login}>{t('signup-screen-message')}</Text>
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