import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons';

const CustomButton = ({ title, onPress, icon, color }) => {
    return(
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Feather
                name={icon}
                size={24}
                color={color}
            />
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};
 
const styles = StyleSheet.create({
    button: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#f1f1f1',
        marginLeft: 10
    }
});

export default CustomButton;