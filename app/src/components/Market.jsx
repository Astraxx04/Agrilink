import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, ScrollView, TextInput, TouchableOpacity, ImageBackground, View, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
const imageImg = require("../../assets/images/cropField2.jpg"); 

const Market = () => {
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
                                <View style={styles.card}>
                                    <Image source={imageImg} style={styles.image} />
                                    <View style={styles.textContainer}>
                                        <Text style={styles.title}>Killing Knife</Text>
                                        <Text style={styles.description}>Price: 000</Text>
                                        <Text style={styles.description}>Phone: 6969696969</Text>
                                    </View>
                                </View>
                                <View style={styles.card}>
                                    <Image source={imageImg} style={styles.image} />
                                    <View style={styles.textContainer}>
                                        <Text style={styles.title}>Killing Knife</Text>
                                        <Text style={styles.description}>Price: 000</Text>
                                        <Text style={styles.description}>Phone: 6969696969</Text>
                                    </View>
                                </View>
                                <View style={styles.card}>
                                    <Image source={imageImg} style={styles.image} />
                                    <View style={styles.textContainer}>
                                        <Text style={styles.title}>Killing Knife</Text>
                                        <Text style={styles.description}>Price: 000</Text>
                                        <Text style={styles.description}>Phone: 6969696969</Text>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.sectionText}>Crops</Text>
                        <View>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <View style={styles.card}>
                                    <Image source={imageImg} style={styles.image} />
                                    <View style={styles.textContainer}>
                                        <Text style={styles.title}>Killing Knife</Text>
                                        <Text style={styles.description}>Price: 000</Text>
                                        <Text style={styles.description}>Phone: 6969696969</Text>
                                    </View>
                                </View>
                                <View style={styles.card}>
                                    <Image source={imageImg} style={styles.image} />
                                    <View style={styles.textContainer}>
                                        <Text style={styles.title}>Killing Knife</Text>
                                        <Text style={styles.description}>Price: 000</Text>
                                        <Text style={styles.description}>Phone: 6969696969</Text>
                                    </View>
                                </View>
                                <View style={styles.card}>
                                    <Image source={imageImg} style={styles.image} />
                                    <View style={styles.textContainer}>
                                        <Text style={styles.title}>Killing Knife</Text>
                                        <Text style={styles.description}>Price: 000</Text>
                                        <Text style={styles.description}>Phone: 6969696969</Text>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.sectionText}>Fertilizers</Text>
                        <View>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <View style={styles.card}>
                                    <Image source={imageImg} style={styles.image} />
                                    <View style={styles.textContainer}>
                                        <Text style={styles.title}>Killing Knife</Text>
                                        <Text style={styles.description}>Price: 000</Text>
                                        <Text style={styles.description}>Phone: 6969696969</Text>
                                    </View>
                                </View>
                                <View style={styles.card}>
                                    <Image source={imageImg} style={styles.image} />
                                    <View style={styles.textContainer}>
                                        <Text style={styles.title}>Killing Knife</Text>
                                        <Text style={styles.description}>Price: 000</Text>
                                        <Text style={styles.description}>Phone: 6969696969</Text>
                                    </View>
                                </View>
                                <View style={styles.card}>
                                    <Image source={imageImg} style={styles.image} />
                                    <View style={styles.textContainer}>
                                        <Text style={styles.title}>Killing Knife</Text>
                                        <Text style={styles.description}>Price: 000</Text>
                                        <Text style={styles.description}>Phone: 6969696969</Text>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.sectionText}>Cattle</Text>
                        <View>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <View style={styles.card}>
                                    <Image source={imageImg} style={styles.image} />
                                    <View style={styles.textContainer}>
                                        <Text style={styles.title}>Killing Knife</Text>
                                        <Text style={styles.description}>Price: 000</Text>
                                        <Text style={styles.description}>Phone: 6969696969</Text>
                                    </View>
                                </View>
                                <View style={styles.card}>
                                    <Image source={imageImg} style={styles.image} />
                                    <View style={styles.textContainer}>
                                        <Text style={styles.title}>Killing Knife</Text>
                                        <Text style={styles.description}>Price: 000</Text>
                                        <Text style={styles.description}>Phone: 6969696969</Text>
                                    </View>
                                </View>
                                <View style={styles.card}>
                                    <Image source={imageImg} style={styles.image} />
                                    <View style={styles.textContainer}>
                                        <Text style={styles.title}>Killing Knife</Text>
                                        <Text style={styles.description}>Price: 000</Text>
                                        <Text style={styles.description}>Phone: 6969696969</Text>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.floatingButton} onPress={() => { alert('This will redirect to a new page') }} > 
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
        fontSize: 24,
        paddingTop: 25,
        fontWeight: 700,
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
        width: 160,
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
        fontWeight: 'bold',
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

export default Market;