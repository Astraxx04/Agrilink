import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; 
import { DataTable } from 'react-native-paper';
const userLogo = require("../../assets/images/user.png");

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const navigation = useNavigation();

    const fetchData = async () => {
        try {
            // const response = await fetch('API_ENDPOINT');
            // if (!response.ok) {
            //     throw new Error('Failed to fetch data');
            // }
            // const data = await response.json();
            setUserData({
                name: "Gagan",
                email: "astraxx2542@gmail.com",
                mobile: "9008243280"
            });
        } catch (error) {
            setError(error.message);
        }
    };

    const handleLogOut = async () => {
        navigation.navigate('Login');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.formContainer}>
                <Image source={userLogo} style={styles.logo} />
                {error && <Text style={styles.errorText}>{error}</Text>}
                {userData && (
                    <View style={styles.table}>
                        <DataTable>
                            <DataTable.Row> 
                                <DataTable.Cell>Name:</DataTable.Cell> 
                                <DataTable.Cell>Gagan S</DataTable.Cell>
                            </DataTable.Row> 
                        
                            <DataTable.Row> 
                                <DataTable.Cell>Email:</DataTable.Cell> 
                                <DataTable.Cell>astraxx25422gmail.com</DataTable.Cell> 
                            </DataTable.Row> 
                            <DataTable.Row> 
                                <DataTable.Cell>Mobile:</DataTable.Cell> 
                                <DataTable.Cell>9008243280</DataTable.Cell> 
                            </DataTable.Row> 
                        </DataTable> 
                    </View>
                    
                )}
                <TouchableOpacity style={styles.button} onPress={handleLogOut}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    formContainer: {
        width: '80%',
        marginTop: 60,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        flex: 1,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        borderStyle: 'solid',
    },
    data: {
        fontSize: 16,
        marginBottom: 5,
        flex: 2,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        borderStyle: 'solid',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    table: {
        marginBottom: 20,
        marginTop: 60,
    },
    button: {
        backgroundColor: 'tomato',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 20,
        width: 100,
        alignSelf: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain' ,
        alignSelf: 'center',
        marginTop: 50,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    tableHeader: { 
        backgroundColor: '#DCDCDC', 
    }, 
});

export default Profile;