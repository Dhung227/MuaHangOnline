import React, { useEffect } from 'react';
import { View, StyleSheet, Image, StatusBar } from 'react-native';

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('LoginScreen'); // Thay thế màn hình hiện tại bằng màn hình tiếp theo
        }, 3000); // 5 giây
        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle ={'light-content'}
            />
            <Image source={require('../../../assets/logo.png')}
                style={{width: '100%', height: 400 }} />
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#53B175',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

