
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, ScrollView, TextInput, TouchableOpacity, ImageBackground, View, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
const imageImg = require("../../assets/images/cropField2.jpg"); 
import { useNavigation, useFocusEffect } from '@react-navigation/native';
export default function Options(){
    const navigation=useNavigation();
    return(
        <SafeAreaView style={styles.container}>
        <ScrollView scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
            <View style={styles.pageScroll}>
                <Text style={styles.text}>
                        What do you want to sell ?
                </Text>
                <View style={styles.section}>
                    <Text style={styles.sectionText}>Equipments</Text>
                    <View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity onPress={() => {navigation.navigate('PostData'); }}>
                    <View style={styles.card}>
                                    <Image source={require('../../assets/Equipment/equipment1.jpg')} style={styles.image} />
                                    <View style={styles.textContainer}>
                                        
                                    </View>
                                </View>
                                </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionText}>Crops</Text>
                    <View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity onPress={() => {navigation.navigate('PostCrops'); }}>
                    <View style={styles.card}>
                                    <Image source={require('../../assets/crop/crop2.jpg')} style={styles.image} />
                                    <View style={styles.textContainer}>
                                        
                                    </View>
                                </View>
                                </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionText}>Fertilizers</Text>
                    <View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity onPress={() => {navigation.navigate('PostFertilizers'); }}>
                    <View style={styles.card}>
                                    <Image source={require('../../assets/Fertlizers/Fertilizer2.jpg')} style={styles.image} />
                                    <View style={styles.textContainer}>
                                        
                                    </View>
                                </View>
                                </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionText}>Cattle</Text>
                    <View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity onPress={() => {navigation.navigate('PostCattle'); }}>
                    <View style={styles.card}>
                                    <Image source={require('../../assets/cattle/cattle2.jpg')} style={styles.image} />
                                    <View style={styles.textContainer}>
                                        
                                    </View>
                                </View>
                                </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionText}>Camera</Text>
                    <View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity onPress={() => {navigation.navigate('MapViews'); }}>
                    <View style={styles.card}>
                                    <Image source={require('../../assets/area.jpg')} style={styles.image} />
                                    <View style={styles.textContainer}>
                                        
                                    </View>
                                </View>
                                </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        paddingTop: 60,
        alignSelf: 'center'
    },
    section: {
        paddingTop: 20
    },
    sectionText: {
        marginLeft: 120,
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
        width: 300,
        height:200,
        marginLeft: 7,
    },
    image: {
        width: '100%',
        height: 160,
    },
    textContainer: {
        padding: 10,
    },
    title: {
        fontSize: 16
    },
    description: {
        fontSize: 14,
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