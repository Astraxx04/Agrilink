
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, ScrollView, TouchableOpacity, ImageBackground, View, } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Options = () => {
    const navigation=useNavigation();
    return(
        <SafeAreaView style={styles.container}>
            <ScrollView scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
                <View style={styles.pageScroll}>
                    <Text style={styles.text}>What do you want to sell ?</Text>

                    <View style={styles.section}>
                        <TouchableOpacity onPress={() => {navigation.navigate('PostData'); }}>
                            <View style={styles.card}>
                                <ImageBackground source={require('../../assets/Equipment/equipment1.jpg')} style={styles.image} >
                                    <View style={styles.textContainer}>
                                        <Text style={styles.sectionText}>Equipments</Text>
                                    </View>
                                </ImageBackground>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.section}>
                        <TouchableOpacity onPress={() => {navigation.navigate('PostCrops'); }}>
                            <View style={styles.card}>
                                <ImageBackground source={require('../../assets/crop/crop2.jpg')} style={styles.image} >
                                    <View style={styles.textContainer}>
                                        <Text style={styles.sectionText}>Crops</Text>
                                    </View>
                                </ImageBackground>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.section}>
                        <TouchableOpacity onPress={() => {navigation.navigate('PostFertilizers'); }}>
                            <View style={styles.card}>
                                <ImageBackground source={require('../../assets/Fertlizers/Fertilizer2.jpg')} style={styles.image} >
                                    <View style={styles.textContainer}>
                                        <Text style={styles.sectionText}>Fertilizers</Text>
                                    </View>
                                </ImageBackground>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.section}>
                        <TouchableOpacity onPress={() => {navigation.navigate('PostCattle'); }}>
                            <View style={styles.card}>
                                <ImageBackground source={require('../../assets/cattle/cattle2.jpg')} style={styles.image} >
                                    <View style={styles.textContainer}>
                                        <Text style={styles.sectionText}>Cattle</Text>
                                    </View>
                                </ImageBackground>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.section}>
                        <TouchableOpacity onPress={() => {navigation.navigate('UserMarketItems'); }}>
                            <View style={styles.card}>
                                <ImageBackground source={require('../../assets/cattle/cattle2.jpg')} style={styles.image} >
                                    <View style={styles.textContainer}>
                                        <Text style={styles.sectionText}>Your Market Items</Text>
                                    </View>
                                </ImageBackground>
                            </View>
                        </TouchableOpacity>
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
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    section: {
        paddingTop: 20
    },
    sectionText: {
        fontSize: 20,
        color: 'white',
        fontWeight: '900',
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
        width: 320,
        height: 200,
    },
    image: {
        width: '100%',
        height: '100%',
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
});

export default Options;