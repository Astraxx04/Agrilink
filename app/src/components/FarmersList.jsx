import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, ScrollView, Image, View } from 'react-native';
import axios from 'axios';

export default function FarmersList() {
    const [farmers, setFarmers] = useState([]);

    useEffect(() => {
        async function getFarmersList() {
            try {
                const response = await axios.get('http://localhost:5000/getUserData');
                setFarmers(response.data);
            } catch (error) {
                console.log('Error fetching farmers:', error);
            }
        }
        getFarmersList();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
                <View style={styles.pageScroll}>
                    <Text style={styles.text}>List of Farmers waitlisted</Text>
                    <View style={styles.section}>
                       
                            {farmers.map((item, index) => (
                                <View style={styles.card} key={index}>
                                    <Image source={{ uri: item.profile.url }} style={styles.image} />
                                    <View style={styles.textContainer}>
                                        <Text>{item.name}</Text>
                                        <Text>{item.address}</Text>
                                        <Text>{item.phone}</Text>
                                        
                                    </View>
                                    <View style={styles.imageCard}>
                                    <Image source={{ uri: item.aadhar.url }} style={styles.imagePic} />
                                    <Image source={{ uri: item.panCard.url }} style={styles.imagePic} />
                                    </View>
                                </View>
                            ))}
                        
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
    text: {
        fontSize: 20,
        paddingTop: 60,
        alignSelf: 'center',
    },
    section: {
        paddingTop: 20
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
        width: 250,
        marginLeft: 20,
        marginBottom:30
    },
    image: {
        width: '100%',
        height: 200,
    },
    imagePic: {
        width: '100%',
        height: 150,
        marginTop:20,
        width:140
    },
    textContainer: {
        padding: 10,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    imageCard:{
        display:'flex',
        flexDirection:'row',
    }
});
