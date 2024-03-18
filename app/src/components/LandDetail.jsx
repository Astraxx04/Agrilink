
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; 
import { DataTable } from 'react-native-paper';
import userLogo from '../../assets/area.svg';
import axios from 'axios';
import { ScrollView } from 'react-native';


export default function LandDetail({route}){
    const {area,markers}=route.params;
    const[importance,setImportance]=useState(0);
    const[rank,setRank]=useState(0);
    const[city,setCity]=useState('');
    const[district,setDistrict]=useState('');
    const[state,setState]=useState('');
    const[country,setCountry]=useState('');
    const[countrycode,setCountryCode]=useState('');
    const[type,setType]=useState('');
    const[price,setPrice]=useState(0);
    const[location,setLocation]=useState('');
    const[enable,setEnable]=useState(false);
 
   
    

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
        DeterminePrice();

    },[])

    async function HandlePrice(){

        try{
            const getData=await axios.get('http://192.168.0.101:5000/api/locations',{params:{lat:markers[0].latitude,lon:markers[0].longitude}});
            console.log(getData.data.price);
            console.log(getData.data.location);
            setPrice(parseFloat(getData.data.price));
            setLocation(getData.data.location);
            setEnable(true);
        }
        catch(err){
           console.log(err.response.data);
        }

    }
   
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
                        {location ? <DataTable.Row style={{borderWidth:2,borderStyle:'solid',borderColor:'tomato',padding:2}}> 
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
        {!enable ? <TouchableOpacity style={styles.button} onPress={HandlePrice}>
                <Text style={styles.buttonText}>Price of Land</Text>
            </TouchableOpacity>:
            <View style={styles.price}>
            {price? <Text>Estimate Cost : Rs {(price*(area.toFixed(2))).toFixed(0)}</Text>:<></>}</View>}
        
    </SafeAreaView>
       
    )
}


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
        fontSize: 20,
        alignSelf: 'center',
        marginBottom:30
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
        width: 200,
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
    price:{
        marginTop:10,
        borderWidth:3,
        borderColor:'tomato',
        borderStyle:'solid',
        padding:5
    }
});
