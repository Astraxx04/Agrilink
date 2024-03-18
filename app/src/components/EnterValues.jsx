import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Modal, Button, Text, ImageBackground, Alert, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; 

const EnterValues = () => {
    const navigation = useNavigation();

    const [inputValues, setInputValues] = useState({
        nitrogen: "",
        phosphorus: "",
        potassium: "",
        ph: "",
        temperature: "",
        humidity: "",
        rainfall: ""
    });
    
    const handleInputChange = (key, value) => {
        if (/^\d+$/.test(value) || value === "") {
            setInputValues(prevState => ({
                ...prevState,
                [key]: value
            }));
        }
    };

    const handlePredict = async() => {
        const mappedInputValues = {
            "N": inputValues.nitrogen,
            "P": inputValues.phosphorus,
            "K": inputValues.potassium,
            "temperature": inputValues.temperature,
            "humidity": inputValues.humidity,
            "ph": inputValues.ph,
            "rainfall": inputValues.rainfall
        };

        if (Object.values(inputValues).some(value => value === "")) {
            Alert.alert("Note", "Fill in all the fields!");
            return;
        }
        
        try {
            console.log(inputValues);
            const response = await axios.post("http://127.0.0.1:8000/predictionValues", mappedInputValues);
            const finalPredJson = JSON.parse(response.data.final_pred);
            resultValue = { final_pred: finalPredJson };
            console.log(resultValue);
            navigation.navigate("ResultsPage", { results: JSON.stringify(resultValue) });
        } catch (error) {
            console.error("Error:", error);
            Alert.alert("Error", "Failed to fetch prediction. Please try again later.");
        }
    };

    return(
        <KeyboardAwareScrollView>
        <SafeAreaView style={styles.container}>
            
            <View>
                <Text style={styles.titleText}>Enter the lab test results</Text>
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.label}>Nitrogen:</Text>
                <TextInput
                    style={styles.input}
                    value={inputValues.nitrogen}
                    onChangeText={(text) => handleInputChange('nitrogen', text)}
                    inputMode='numeric'
                />

                <Text style={styles.label}>Phosphorus:</Text>
                <TextInput
                    style={styles.input}
                    value={inputValues.phosphorus}
                    onChangeText={(text) => handleInputChange('phosphorus', text)}
                    inputMode='numeric'
                />

                <Text style={styles.label}>Potassium:</Text>
                <TextInput
                    style={styles.input}
                    value={inputValues.potassium}
                    onChangeText={(text) => handleInputChange('potassium', text)}
                    inputMode='numeric'
                />

                <Text style={styles.label}>pH:</Text>
                <TextInput
                    style={styles.input}
                    value={inputValues.ph}
                    onChangeText={(text) => handleInputChange('ph', text)}
                    inputMode='numeric'
                />

                <Text style={styles.label}>Temperature:</Text>
                <TextInput
                    style={styles.input}
                    value={inputValues.temperature}
                    onChangeText={(text) => handleInputChange('temperature', text)}
                    inputMode='numeric'
                />

                <Text style={styles.label}>Humidity:</Text>
                <TextInput
                    style={styles.input}
                    value={inputValues.humidity}
                    onChangeText={(text) => handleInputChange('humidity', text)}
                    inputMode='numeric'
                />

                <Text style={styles.label}>Rainfall:</Text>
                <TextInput
                    style={styles.input}
                    value={inputValues.rainfall}
                    onChangeText={(text) => handleInputChange('rainfall', text)}
                    inputMode='numeric'
                />

                <TouchableOpacity style={styles.button} onPress={handlePredict}>
                    <Text style={styles.buttonText}>Predict</Text>
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
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 40,
    }, 
});

export default EnterValues;