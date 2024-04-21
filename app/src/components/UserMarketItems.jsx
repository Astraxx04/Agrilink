import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const UserMarketItems = () => {
    return(
        <KeyboardAwareScrollView>
            <SafeAreaView style={styles.container}>
                <Text>Hii</Text>
            </SafeAreaView>
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
});

export default UserMarketItems;