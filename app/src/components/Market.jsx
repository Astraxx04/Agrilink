import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, ScrollView, TouchableOpacity, View, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import cattleImage1 from '../../assets/cattle/cattle1.jpg';
import cattleImage2 from '../../assets/cattle/cattle2.jpg';
import cattleImage3 from '../../assets/cattle/cattle3.jpg';
import cattleImage4 from '../../assets/cattle/cattle4.jpg';
import Fertilizer1 from '../../assets/Fertlizers/Fertilizer1.jpg';
import Fertilizer2 from '../../assets/Fertlizers/Fertilizer2.jpg';
import Fertilizer3 from '../../assets/Fertlizers/Fertilizer3.jpg';
import crop1 from '../../assets/crop/crop1.jpg';
import crop2 from '../../assets/crop/crop2.jpg';
import crop3 from '../../assets/crop/crop3.jpg';
import equipment1 from '../../assets/Equipment/equipment1.jpg';
import equipment2 from '../../assets/Equipment/equipment2.jpg';
import equipment3 from '../../assets/Equipment/equipment3.jpg';

const cattleImages = [cattleImage1, cattleImage2, cattleImage3, cattleImage4];
const FertilizersImages = [Fertilizer1, Fertilizer2,Fertilizer3];
const CropImages = [crop1, crop2,crop3];
const EquipmentImages = [equipment1, equipment2,equipment3];

const Market = () => {
  
    const navigation = useNavigation();
    const[equipment,setEquipment]=useState([]);
    const[crop,setCrop]=useState([]);
    const[fertilizer,setFertilizer]=useState([]);
    const[cattle,setCattle]=useState([]);

    useEffect(()=>{
        async function FetchedData(){
            try{
                const getData=await axios.get('http://localhost:5000/api/v1/getCrop');
                setCrop(getData.data);
                console.log(getData.data[1]);
                console.log(crop);
            }
            catch(err){
                console.log('The error is',err);
            }
           
        }
        async function FetchedCropData(){
            try{
                const getData=await axios.get('http://localhost:5000/api/v1/getEquipment');
                setEquipment(getData.data);
                console.log(getData.data[1]);
                console.log(equipment);
            }
            catch(err){
                console.log('The error is',err);
            }
           
        }
        async function FetchedFertilizerData(){
            try{
                const getData=await axios.get('http://localhost:5000/api/v1/getFertilizer');
                setFertilizer(getData.data);
                console.log(getData.data[1]);
                console.log(fertilizer);
            }
            catch(err){
                console.log('The error is',err);
            }
           
        }
        async function FetchedCattleData(){
            try{
                const getData=await axios.get('http://localhost:5000/api/v1/getCattle');
                setCattle(getData.data);
                console.log(getData.data[1]);
                console.log(cattle);
            }
            catch(err){
                console.log('The error is',err);
            }
           
        }
        
        FetchedData();
        FetchedCropData();
        FetchedFertilizerData();
        FetchedCattleData();
    },[])
    return(
        <SafeAreaView style={styles.container}>
            <ScrollView scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
                <View style={styles.pageScroll}>
                    <Text style={styles.text}>
                            What can we help you find today?
                    </Text>
                    <View style={styles.section}>
                        <Text style={styles.sectionText}>Farming Equipments</Text>
                        <View>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                {equipment.map((item,index)=>{
                                    return(
                                        <View style={styles.card}>
                                        <Image source={EquipmentImages[index % 3]} style={styles.image} />
                                        <View style={styles.textContainer}>
                                            <Text style={styles.title}>Material : {item.material}</Text>
                                            <Text style={styles.description}>Owner : {item.name}</Text>
                                            <Text style={styles.description}>Price : {item.price}</Text>
                                            <Text style={styles.description}>Phone : {item.Phone}</Text>
                                        </View>
                                    </View>
                                    )
                                })}
                            </ScrollView>
                        </View>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.sectionText}>Crops</Text>
                        <View>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                {crop.map((item,index)=>{
                                    
                                    return(
                                        <View style={styles.card}>
                                        <Image source={CropImages[index % 3]} style={styles.image} />
                                        <View style={styles.textContainer}>
                                            <Text style={styles.title}>Crop : {item.material}</Text>
                                            <Text style={styles.description}>Owner : {item.name}</Text>
                                            <Text style={styles.description}>Price : {item.price}</Text>
                                            <Text style={styles.description}>Phone : {item.phone}</Text>
                                        </View>
                                    </View>
                                    )
                                })}
                            </ScrollView>
                        </View>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.sectionText}>Fertilizers</Text>
                        <View>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {fertilizer.map((item,index)=>{
                                    return(
                                        <View style={styles.card}>
                                        <Image source={FertilizersImages[index % 3]} style={styles.image} />
                                        <View style={styles.textContainer}>
                                            <Text style={styles.title}>Type : {item.material}</Text>
                                            <Text style={styles.description}>Owner : {item.name}</Text>
                                            <Text style={styles.description}>Price : {item.price}</Text>
                                            <Text style={styles.description}>Phone : {item.phone}</Text>
                                        </View>
                                    </View>
                                    )
                                })}
                            </ScrollView>
                        </View>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.sectionText}>Cattle</Text>
                        <View>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                {cattle.map((item,index)=>{
                                    
                                    return(
                                        <View style={styles.card}>
        
                                        <Image source={cattleImages[index % 4]}style={styles.image} />
                                        <View style={styles.textContainer}>
                                            <Text style={styles.title}>Breed : {item.type}</Text>
                                            <Text style={styles.description}>Owner : {item.name}</Text>
                                            <Text style={styles.description}>Price :  {item.price}</Text>
                                            <Text style={styles.description}>Phone : {item.phone}</Text>
                                        </View>
                                    </View>
                                    )
                                })}
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.floatingButton} onPress={() => {navigation.navigate('Options'); }} > 
                    <Feather
                        name={'plus'}
                        size={36}
                        color={'white'}
                    />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        paddingTop: 60,
        alignSelf: 'center',
    },
    section: {
        paddingTop: 20
    },
    sectionText: {
        marginLeft: 20,
        fontSize: 20,
        paddingVertical: 10,
    },
    pageScroll: {
        paddingBottom: 40,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        shadowColor: '#000000',
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 5,
        overflow: 'hidden',
        width: 190,
        marginLeft: 20,
    },
    image: {
        width: '100%',
        height: 100,
    },
    textContainer: {
        padding: 10,
    },
    title: {
        fontSize: 16,
        textTransform: 'capitalize',
    },
    description: {
        fontSize: 14,
        textTransform: 'capitalize',
    },
    floatingButton: {
        alignItems: 'center', 
        justifyContent: 'center', 
        width: 60,
        height: 60, 
        position: 'absolute', 
        bottom: 40, 
        right: 20, 
        backgroundColor: '#00ab41', 
        borderRadius: 200, 
    },
});

export default Market;