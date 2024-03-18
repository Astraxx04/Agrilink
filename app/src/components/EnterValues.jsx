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
    const [showResult, setShowResult] = useState(false);
    const [responseData, setResponseData] = useState("");

    const handleInputChange = (key, value) => {
        if (/^\d+$/.test(value) || value === "") {
            setInputValues(prevState => ({
                ...prevState,
                [key]: value
            }));
        }
    };

    const handleResultsSave = () => {
        Alert.alert("Success", "The results were saved successfully.");
        navigation.navigate("Recommend")
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
            console.log(response.data);
            setResponseData(response.data);
            setShowResult(true);
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
            
            <Modal
                visible={showResult}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowResult(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Results</Text>
                        <Text>{JSON.stringify(inputValues)}</Text>
                        <Text style={styles.responseText}>You can grow: {responseData}</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={[styles.modalButton, styles.saveButton]} onPress={handleResultsSave}>
                                <Text style={styles.buttonText}>Save</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modalButton, styles.closeButton]} onPress={() => setShowResult(false)}>
                                <Text style={styles.buttonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 160,
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
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 'auto',
    },
    modalButton: {
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginHorizontal: 10,
    },
    saveButton: {
        backgroundColor: 'green',
        width: 100,
    },
    closeButton: {
        backgroundColor: 'red',
        width: 100,
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        width: '100%',
        paddingHorizontal: 40,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
        height: '50%',
    },
    modalText: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    responseText: {
        fontSize: 24,
        paddingTop: 60,
        textTransform: 'capitalize',
    },
});

export default EnterValues;