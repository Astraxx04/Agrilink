import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text,ImageBackground, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; 
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTranslation } from 'react-i18next';
const yieldImg = require("../../assets/images/ai_bg.avif");

const CropRecommend1 = () => {
    const {t, i18n} = useTranslation();
    const navigation = useNavigation();

    const handleImagePress = () => {
        navigation.navigate('ImageCapture');
    };

    const handleValuesPress = () => {
        navigation.navigate('EnterValues');
    };

    return(
        <KeyboardAwareScrollView>
            <SafeAreaView style={styles.container}>
                <View style={styles.innerContainer}>
                    <TouchableOpacity style={styles.card} onPress={handleImagePress}>
                        <ImageBackground source={yieldImg} style={styles.imageBackground}>
                            <Text style={styles.title}>{t('select-image')}</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card} onPress={handleValuesPress}>
                        <ImageBackground source={yieldImg} style={styles.imageBackground}>
                            <Text style={styles.title}>{t('enter-values')}</Text>
                        </ImageBackground>
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
        marginTop: 200,
    },
    innerContainer: {
        width: '80%',
        marginTop: 60,
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
        width: '100%',
        height: '30%',
        marginBottom: 60,
        borderRadius: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'center',
        paddingTop: 25,
        color: '#ffffff'
    },
    imageBackground: {
        flex: 1,
        resizeMode: 'cover',
    }
});

export default CropRecommend1;