import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; 
import { DataTable } from 'react-native-paper';
import axios from 'axios';

const LandDetail = ({route}) => {
    const navigation = useNavigation();

    const {area, markers} = route.params;
    const[importance, setImportance] = useState(0);
    const[rank, setRank] = useState(0);
    const[city, setCity] = useState('');
    const[district, setDistrict] = useState('');
    const[state, setState] = useState('');
    const[country, setCountry] = useState('');
    const[countrycode, setCountryCode] = useState('');
    const[type, setType] = useState('');
    const[price, setPrice] = useState(0);
    const[location, setLocation] = useState('');
 
    useEffect(()=>{
        async function DeterminePrice(){
            try {
                const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${markers[0].latitude}&lon=${markers[0].longitude}&zoom=10&format=json`);
                console.log(response.data.importance);
                setImportance(response.data.importance);
                setRank(response.data.place_rank);
                setCity(response.data.address.city);
                setDistrict(response.data.address.state_district);
                setState(response.data.address.state);
                setCountry(response.data.address.country);
                setCountryCode(response.data.address.country_code);
                setType(response.data.type);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        async function HandlePrice(){
            try{
                const getData = await axios.get('http://localhost:5000/api/v1/location',{params:{lat:markers[0].latitude,lon:markers[0].longitude}});
                setPrice(parseFloat(getData.data.price));
                setLocation(getData.data.location);
                setEnable(true);
            }
            catch(err){
               console.log(err.response);
            }
        }

        DeterminePrice();
        HandlePrice();
    },[])

    const repeatAgain = () => {
        navigation.navigate("Tabs");
    };

    const saveDetails = () => {
        navigation.navigate("Tabs");
    };
   
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.formContainer}>
                <View style={styles.table}>
                    <Text style={styles.text}>Details of Land</Text>
                    <DataTable>
                        {city ? <DataTable.Row> 
                            <DataTable.Cell>City:</DataTable.Cell> 
                            <DataTable.Cell>{city}</DataTable.Cell>
                        </DataTable.Row> :<></>}
                        {district ? <DataTable.Row> 
                            <DataTable.Cell>District:</DataTable.Cell> 
                            <DataTable.Cell>{district}</DataTable.Cell>
                        </DataTable.Row> :<></>}
                        {state ? <DataTable.Row> 
                            <DataTable.Cell>State:</DataTable.Cell> 
                            <DataTable.Cell>{state}</DataTable.Cell>
                        </DataTable.Row> :<></>}
                        {location ? <DataTable.Row> 
                            <DataTable.Cell>Location:</DataTable.Cell> 
                            <DataTable.Cell>Near {location}</DataTable.Cell>
                        </DataTable.Row> :<></>}
                        {country ? <DataTable.Row> 
                            <DataTable.Cell>Country:</DataTable.Cell> 
                            <DataTable.Cell>{country}</DataTable.Cell>
                        </DataTable.Row> :<></>}
                        {countrycode ? <DataTable.Row> 
                            <DataTable.Cell>Country Code:</DataTable.Cell> 
                            <DataTable.Cell>{countrycode}</DataTable.Cell>
                        </DataTable.Row> :<></>}
                        {rank ? <DataTable.Row> 
                            <DataTable.Cell>Rank:</DataTable.Cell> 
                            <DataTable.Cell>{rank}</DataTable.Cell>
                        </DataTable.Row> :<></>}
                        {importance ? <DataTable.Row> 
                            <DataTable.Cell>Importance:</DataTable.Cell> 
                            <DataTable.Cell>{importance.toFixed(3)}</DataTable.Cell> 
                        </DataTable.Row> :<></>}
                        {area ? <DataTable.Row> 
                            <DataTable.Cell>Area per sq feet:</DataTable.Cell> 
                            <DataTable.Cell>{area.toFixed(3)}</DataTable.Cell> 
                        </DataTable.Row> :<></>}
                        {type ? <DataTable.Row> 
                            <DataTable.Cell>Type:</DataTable.Cell> 
                            <DataTable.Cell>{type}</DataTable.Cell> 
                        </DataTable.Row> :<></>}
                    </DataTable> 
                </View>
            </View>
            <View>
                {price? <Text style={styles.price}>Estimate Cost : Rs {(price*(area.toFixed(2))).toFixed(0)}</Text>:<></>}
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
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    formContainer: {
        width: '80%',
        marginTop: 1,
    },
    text: {
        fontSize: 24,
        alignSelf: 'center',
        marginBottom:30,
        fontWeight: "600",
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
        marginBottom: 10,
        marginTop: 40,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    tableHeader: { 
        backgroundColor: '#DCDCDC', 
    }, 
    price:{
        marginTop: 10,
        borderWidth: 3,
        borderColor: 'tomato',
        borderStyle: 'solid',
        padding: 5,
        fontSize: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 'auto',
        marginBottom: 30,
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
});

export default LandDetail;