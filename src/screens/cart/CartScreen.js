import React, {useEffect, useState} from 'react';
import { View, StyleSheet, Image, StatusBar, Text, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDCYGX042P9tKjlXhoL_aV5bEHKpcSwRyg",
    authDomain: "thuctaponline-2af56.firebaseapp.com",
    projectId: "thuctaponline-2af56",
    storageBucket: "thuctaponline-2af56.appspot.com",
    messagingSenderId: "932770253310",
    appId: "1:932770253310:web:8d0c03bab3292454ce98af",
    measurementId: "G-K8XB5PR5GG"
};

const CartScreen = ({ navigation }) => {

    const [email, setEmail] = useState ('');

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const user = auth.currentUser;

    useEffect(() => {
        if (user) {
          setEmail(user.email);
          console.log(user.uid);
        }
      }, [user]);

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle={'light-content'}
            />
            <View style={styles.header}>
                <Text style={{ flex: 1, fontSize: 18, fontWeight: '800', color: '#ffffff' }}>Giỏ hàng của bạn</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity>
                        <Icon name='chatbox-ellipses-outline' size={28} color={'#ffffff'} style={{ marginEnd: 11 }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name='search' size={28} color={'#ffffff'} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.body}>
                <Text>
                    {email}
                </Text>
                <View style={[styles.bottom, styles.shadow]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, marginHorizontal: 16 }}>
                        <Text style={{ fontSize: 13 }}>Tổng tiền</Text>
                        <Text style={{ color: '#53B175', fontSize: 18, fontWeight: '700' }}>1.000.000 đ</Text>
                    </View>
                    <View style={{ height: 1, backgroundColor: '#E2E2E2' }} />
                    <TouchableOpacity style={styles.button}>
                        <Text style={{ fontSize: 16, color: '#fff', fontWeight: '600' }}>Tiến hành thanh toán</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

    shadow: {
        elevation: 5, // Độ bóng của đối tượng
        shadowColor: '#344356', // Màu của bóng
        shadowOffset: { width: 0, height: -5 }, // Kích thước đối tượng bóng
        shadowOpacity: 0.25, // Độ trong suốt của bóng
        shadowRadius: 3.84, // Bán kính của bóng
    },

    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ffffff',
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 22,
        backgroundColor: '#53B175',
        paddingBottom: 24,
        paddingTop: 64,
    },

    body: {
        flex: 1,
        flexDirection: 'column',
    },

    flatlist: {
        flex: 1,
    },

    bottom: {
        marginTop: 64,
        paddingTop: 20,
        backgroundColor: '#fff',
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        paddingBottom: 120,
    },

    button: {
        backgroundColor: '#53B175',
        paddingVertical: 14,
        alignItems: 'center',
        borderRadius: 50,
        marginTop: 14,
        marginHorizontal: 20,

    },
});

export default CartScreen;