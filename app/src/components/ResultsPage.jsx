import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text,ImageBackground, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; 
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useRoute } from '@react-navigation/native';

const ResultsPage = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const results = route.params?.results;
    result_object = JSON.parse(results);

    const repeatAgain = () => {
        navigation.navigate("CropRecommend1");
    };

    const saveDetails = () => {
        // Code to save data
        navigation.navigate("Tabs");
    };


    console.log(result_object["final_pred"]["Crops"]);

    return(
        <KeyboardAwareScrollView>
            <SafeAreaView style={styles.container}>
                <View style={styles.innerContainer}>
                    <Text style={styles.headingText}>Results</Text>
                </View>
                <View style={styles.results}>
                    <View style={styles.card}>
                        <View style={styles.cardContent}>
                            <Text style={styles.title}>Crop: </Text>
                            <Text style={styles.resultText}>{result_object["final_pred"]["Crops"]}</Text>
                        </View>
                        <Image source={require('../../assets/images/crop.png')} style={styles.cardImage} />
                    </View>
                    <View style={styles.card}>
                        <View style={styles.cardContent}>
                            <Text style={styles.title}>Fertilizers Required: </Text>
                            <Text style={styles.resultText}>{result_object["final_pred"]["Fertilisers required"]}</Text>
                        </View>
                        <Image source={require('../../assets/images/fertilizer.png')} style={styles.cardImage} />
                    </View>
                    <View style={styles.card}>
                        <View style={styles.cardContent}>
                            <Text style={styles.title}>Cost of cultivation: </Text>
                            <Text style={styles.resultText}>{result_object["final_pred"]["Cost of cultivation"]}</Text>
                        </View>
                        <Image source={require('../../assets/images/cul.png')} style={styles.cardImage} />
                    </View>
                    <View style={styles.card}>
                        <View style={styles.cardContent}>
                            <Text style={styles.title}>Expected revenues: </Text>
                            <Text style={styles.resultText}>{result_object["final_pred"]["Expected revenues"]}</Text>
                        </View>
                        <Image source={require('../../assets/images/revenue.png')} style={styles.cardImage} />
                    </View>
                    <View style={styles.card}>
                        <View style={styles.cardContent}>
                            <Text style={styles.title}>Quantity of seeds per hectare: </Text>
                            <Text style={styles.resultText}>{result_object["final_pred"]["Quantity of seeds per hectare"]}</Text>
                        </View>
                        <Image source={require('../../assets/images/seed.png')} style={styles.cardImage} />
                    </View>
                    <View style={styles.card}>
                        <View style={styles.cardContent}>
                            <Text style={styles.title}>Duration of cultivation: </Text>
                            <Text style={styles.resultText}>{result_object["final_pred"]["Duration of cultivation"]}</Text>
                        </View>
                        <Image source={require('../../assets/images/time.png')} style={styles.cardImage} />
                    </View>
                    <View style={styles.card}>
                        <View style={styles.cardContent}>
                            <Text style={styles.title}>Demand of crop: </Text>
                            <Text style={styles.resultText}>{result_object["final_pred"]["Demand of crop"]}</Text>
                        </View>
                        <Image source={require('../../assets/images/demand.png')} style={styles.cardImage} />
                    </View>
                    <View style={styles.card}>
                        <View style={styles.cardContent}>
                            <Text style={styles.title}>Crops for mixed cropping: </Text>
                            <Text style={styles.resultText}>{result_object["final_pred"]["Crops for mixed cropping"]}</Text>
                        </View>
                        <Image source={require('../../assets/images/mix.png')} style={styles.cardImage} />
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.modalButton, styles.saveButton]} onPress={saveDetails}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.modalButton, styles.closeButton]} onPress={repeatAgain}>
                        <Text style={styles.buttonText}>Retry</Text>
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
        marginTop: 100,
    },
    innerContainer: {
        width: '80%',
        paddingBottom: 40,
    },
    card: {
        backgroundColor: '#ffffff',
        shadowColor: '#000000',
        shadowOffset: {
          width: 2,
          height: 5,
        },
        overflow: 'hidden',
        shadowOpacity: 0.50,
        shadowRadius: 5.84,
        elevation: 5,
        width: '100%',
        height: 80,
        marginBottom: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 18,
        paddingTop: 10,
        paddingLeft: 10,
    },
    resultText: {
        paddingTop: 5,
        paddingLeft: 10,
    },
    headingText: {
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    results: {
        flex: 1,
        width: '90%',
        marginBottom: 20,
    },
    cardContent: {
        flex: 1,
    },
    cardImage: {
        width: "20%",
        aspectRatio: 1,
        resizeMode: 'contain',
        marginRight: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 'auto',
        marginBottom: 60,
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
        backgroundColor: 'blue',
        width: 120,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default ResultsPage;