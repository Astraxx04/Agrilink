import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Modal, Button, Text, ImageBackground, Alert, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; 
const yieldImg = require("../../assets/images/cropField2.jpg");

const EnterValues = () => {
    const navigation = useNavigation();

    const [inputValues, setInputValues] = useState({
        nitrogen: "",
        phosphorus: "",
        potassium: "",
        ph: "",

    });
    const [showResult, setShowResult] = useState(false);

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

    const handlePredict = () => {
        if (Object.values(inputValues).some(value => value === "")) {
            Alert.alert("Note", "Fill in all the fields!");
            return;
        }
        
        // Perform your prediction logic here
        // For demonstration purposes, I'm just displaying the input values
        setShowResult(true);
    };

    return(
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
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 'auto',
        marginBottom: 20,
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
});

export default EnterValues;