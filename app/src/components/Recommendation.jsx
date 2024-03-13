import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, ImageBackground, View, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; 

const recommendationImg = require("../../assets/images/cropField2.jpg");
const yieldImg = require("../../assets/images/cropField1.jpg");
const loanImg = require("../../assets/images/loan.jpg");

const Recommendation = () => {
    const navigation = useNavigation();

    const handleRecommendationPress = () => {
        navigation.navigate('CropRecommend1');
    };

    const handleYieldPress = () => {
        navigation.navigate('ChatBot');
    };

    const handleLoanPress = () => {
        navigation.navigate('Profile');
    };

    return (
        <KeyboardAwareScrollView>
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.card} onPress={handleRecommendationPress}>
                <ImageBackground source={recommendationImg} style={styles.imageBackground}>
                    <Text style={styles.title}>Crop Recommendation</Text>
                    <Text style={styles.description}>All the best</Text>
                </ImageBackground>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.card} onPress={handleYieldPress}>
                <ImageBackground source={yieldImg} style={styles.imageBackground}>
                    <Text style={styles.title}>Yield Prediction</Text>
                    <Text style={styles.description}>All the best</Text>
                </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={handleLoanPress}>
                <ImageBackground source={loanImg} style={styles.imageBackground}>
                    <Text style={styles.title}>Loan Estimation</Text>
                    <Text style={styles.description}>All the best</Text>
                </ImageBackground>
            </TouchableOpacity>
        </SafeAreaView>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 60
    },
    card: {
        backgroundColor: 'tomato',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        overflow: 'hidden',
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: '80%',
        height: '45%',
        top: 40,
        marginTop: 40,
        borderRadius: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'center',
        paddingTop: 15,
    },
    description: {
        fontSize: 16,
        height: '100%',
        textAlign: 'center',
        paddingTop: 20,
    },
    imageBackground: {
        flex: 1,
        resizeMode: 'cover',
    }
});

export default Recommendation;