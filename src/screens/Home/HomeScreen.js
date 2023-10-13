import React from 'react';
import { View, StyleSheet, Image, StatusBar, Text } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar
                barStyle={'dark-content'}
            />
            <Text>TRANG CHỦ</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F3CC',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default HomeScreen;