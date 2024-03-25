import React, { useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, StyleSheet, Alert, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; 
const agriLinkLogo = require("../../assets/images/agriLinkLogo.png");
import i18n from '../services/i18n';
import { useTranslation } from 'react-i18next';
import { SelectList } from "react-native-dropdown-select-list";
import { Feather } from '@expo/vector-icons';

const Login = () => {
    const {t, i18n} = useTranslation();
    const [useremail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [selected, setSelected] = useState("");

    const navigation = useNavigation();

    const handleLogin = async () => {
        try {
            // const response = await axios.post('http://localhost:5000/api/v1/loginUser', {
            //     email: useremail,
            //     password: password
            // });
            // console.log(response.data);
            response = true;
            if (response) {
                console.log('Login successful', response.data);
                // await AsyncStorage.setItem('userData', JSON.stringify(response.data));
                // Alert.alert("Success", "You are logged in successfully!");
                navigation.navigate('Tabs');
            }
        } catch (error) {
            console.error('Login error', error);
            setError(t('login-error'));
        }
    };
    const toSignUpPage = () => {
        navigation.navigate('SignUp');
    };

    const languageOptions = [
        { key: 'en', value: 'English' },
        { key: 'hi', value: 'हिंदी' },
        { key: 'ka', value: 'ಕನ್ನಡ' },
        { key: 'ta', value: 'தமிழ்' },
        { key: 'te', value: 'తెలుగు' }
    ];

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

  return (
    <KeyboardAwareScrollView>
        <SafeAreaView style={styles.container}>
            <Image source={agriLinkLogo} style={styles.logo} />
            <View style={styles.langContainer}>
            <SelectList
                data={languageOptions} 
                search={false}
                setSelected={(val) => setSelected(val)} 
                placeholder={<Feather
                    name="globe"
                    size={20}
                    color="green"
                />}
                defaultOption={{ key: 'en', value: 'English' }}
                inputStyles={{ fontSize: 16 }}
                dropdownStyles={{ backgroundColor: "#e6e6e6" ,opacity: 100 }}
                onSelect={() => changeLanguage(selected)}
            />
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.label}>{t('email')}:</Text>
                <TextInput
                style={styles.input}
                value={useremail}
                placeholder={t('email-placeholder')}
                onChangeText={(text) => setUserEmail(text)}
                />

                <Text style={styles.label}>{t('password')}:</Text>
                <TextInput
                style={styles.input}
                value={password}
                placeholder={t('password-placeholder')}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
                />
                {error && <Text style={styles.errorText}>{error}</Text>}

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>{t('login')}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={toSignUpPage}>
                    <Text style={styles.signup}>{t('login-screen-message')}</Text>
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
        zIndex: -1,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        textTransform: 'capitalize'
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
    },
    langContainer: {
        alignSelf: "flex-end",
        top: 200,
        right: 39,
        position: 'absolute',
    },
    dropdownContainer: {
        backgroundColor: 'white',
        borderRadius: 5,
        elevation: 3, // Add elevation for shadow (Android)
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
});

export default Login;