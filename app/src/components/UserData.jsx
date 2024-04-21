import React, { useState, useEffect } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; 
import { DataTable } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import axios from 'axios';

const UserData = () => {
    const [cropResults, setCropResults] = useState([]);
    const [landResults, setLandResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    async function getAllCropResults() {
        const response = await axios.get('http://localhost:5000/api/v1/getAllCropResults');
        setCropResults(response.data);
        setIsLoading(false);
    };

    async function getAllLandResults() {
        const response = await axios.get('http://localhost:5000/api/v1/getAllLandResults');
        setLandResults(response.data);
        setIsLoading(false);
    };

    useEffect(() => {
        getAllCropResults();
        getAllLandResults()
    }, []);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="green" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
                <View style={styles.pageScroll}>
                    <View style={styles.historyContainer}>
                        <Text style={styles.text}>History</Text>
                        <TouchableOpacity style={styles.icon} onPress={() => {
                            getAllCropResults;
                            getAllLandResults;
                            }}>
                            <Feather
                                name="rotate-ccw"
                                size={24}
                                color="black"
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.sectionText}>Crop Recommendations</Text>
                        <View>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                {cropResults.map((cropResult, index) => {
                                    return(
                                    <View style={styles.card} key={index}>
                                        <DataTable>
                                            <DataTable.Header>
                                                <DataTable.Title style={styles.cellTitle}><Text style={styles.cellTitleText}>Time Stamp: {cropResult.createdAt}</Text></DataTable.Title>
                                            </DataTable.Header>
                                            <DataTable.Row> 
                                                <DataTable.Cell style={styles.cell}><Text>Crop:</Text></DataTable.Cell> 
                                                <DataTable.Cell style={styles.cell}><Text>{cropResult.crop}</Text></DataTable.Cell>
                                            </DataTable.Row> 
                                            <DataTable.Row> 
                                                <DataTable.Cell style={styles.cell}><Text>Fertilisers required:</Text></DataTable.Cell> 
                                                <DataTable.Cell style={styles.cell}><Text>{cropResult.fertilizer}</Text></DataTable.Cell>
                                            </DataTable.Row> 
                                            <DataTable.Row> 
                                                <DataTable.Cell style={styles.cell}><Text>Cost of cultivation:</Text></DataTable.Cell> 
                                                <DataTable.Cell style={styles.cell}><Text>{cropResult.cost}</Text></DataTable.Cell>
                                            </DataTable.Row> 
                                            <DataTable.Row> 
                                                <DataTable.Cell style={styles.cell}><Text>Expected revenues:</Text></DataTable.Cell> 
                                                <DataTable.Cell style={styles.cell}><Text>{cropResult.revenue}</Text></DataTable.Cell>
                                            </DataTable.Row> 
                                            <DataTable.Row> 
                                                <DataTable.Cell style={styles.cell}><Text>Quantity of seeds per hectare:</Text></DataTable.Cell> 
                                                <DataTable.Cell style={styles.cell}><Text>{cropResult.quantity}</Text></DataTable.Cell>
                                            </DataTable.Row> 
                                            <DataTable.Row> 
                                                <DataTable.Cell style={styles.cell}><Text>Duration of cultivation:</Text></DataTable.Cell> 
                                                <DataTable.Cell style={styles.cell}><Text>{cropResult.duration}</Text></DataTable.Cell>
                                            </DataTable.Row> 
                                            <DataTable.Row> 
                                                <DataTable.Cell style={styles.cell}><Text>Demand of crop:</Text></DataTable.Cell> 
                                                <DataTable.Cell style={styles.cell}><Text>{cropResult.demand}</Text></DataTable.Cell>
                                            </DataTable.Row> 
                                            <DataTable.Row> 
                                                <DataTable.Cell style={styles.cell}><Text>Crops for mixed cropping:</Text></DataTable.Cell> 
                                                <DataTable.Cell style={styles.cell}><Text>{cropResult.mixedcrop}</Text></DataTable.Cell>
                                            </DataTable.Row> 
                                        </DataTable>
                                    </View>
                                )})}
                            </ScrollView>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionText}>Area Price Estimation</Text>
                        <View>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                {landResults.map((landResult, index) => {
                                    return(
                                    <View style={styles.card} key={index}>
                                        <DataTable>
                                            <DataTable.Header>
                                                <DataTable.Title style={styles.cellTitle}><Text style={styles.cellTitleText}>Time Stamp: {landResult.createdAt}</Text></DataTable.Title>
                                            </DataTable.Header>
                                            <DataTable.Row> 
                                                <DataTable.Cell style={styles.cell}><Text>Location:</Text></DataTable.Cell> 
                                                <DataTable.Cell style={styles.cell}><Text>{landResult.location}</Text></DataTable.Cell>
                                            </DataTable.Row> 
                                            <DataTable.Row> 
                                                <DataTable.Cell style={styles.cell}><Text>District:</Text></DataTable.Cell> 
                                                <DataTable.Cell style={styles.cell}><Text>{landResult.district}</Text></DataTable.Cell>
                                            </DataTable.Row> 
                                            <DataTable.Row> 
                                                <DataTable.Cell style={styles.cell}><Text>State:</Text></DataTable.Cell> 
                                                <DataTable.Cell style={styles.cell}><Text>{landResult.state}</Text></DataTable.Cell>
                                            </DataTable.Row> 
                                            <DataTable.Row> 
                                                <DataTable.Cell style={styles.cell}><Text>Total Area:</Text></DataTable.Cell> 
                                                <DataTable.Cell style={styles.cell}><Text>{landResult.area}</Text></DataTable.Cell>
                                            </DataTable.Row> 
                                            <DataTable.Row> 
                                                <DataTable.Cell style={styles.cell}><Text>Type:</Text></DataTable.Cell> 
                                                <DataTable.Cell style={styles.cell}><Text>{landResult.type}</Text></DataTable.Cell>
                                            </DataTable.Row> 
                                            <DataTable.Row> 
                                                <DataTable.Cell style={styles.cell}><Text>Total Estimate:</Text></DataTable.Cell> 
                                                <DataTable.Cell style={styles.cell}><Text>{landResult.estimate}</Text></DataTable.Cell>
                                            </DataTable.Row>
                                        </DataTable>
                                    </View>
                                )})}
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#39ad48',
        shadowColor: '#000',
        shadowOffset: {
          width: 2,
          height: 2,
        },
        overflow: 'hidden',
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: 300,
        height: 'auto',
        marginLeft: 20,
    },
    cell: {
        flex: 1,
        width: 60,
    },
    cellTitle: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    cellTitleText: {
        fontWeight: 'bold',
        fontSize: 12
    },
    text: {
        alignSelf: 'center',
        fontSize: 32,
        marginTop: 10,
    },
    sectionText: {
        fontSize: 16,
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: 20,
    },
    section: {
        marginBottom: 20,
    },
    historyContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});

export default UserData;