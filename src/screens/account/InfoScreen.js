import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, StatusBar, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, child, get } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDCYGX042P9tKjlXhoL_aV5bEHKpcSwRyg",
    authDomain: "thuctaponline-2af56.firebaseapp.com",
    projectId: "thuctaponline-2af56",
    storageBucket: "thuctaponline-2af56.appspot.com",
    messagingSenderId: "932770253310",
    appId: "1:932770253310:web:8d0c03bab3292454ce98af",
    measurementId: "G-K8XB5PR5GG"
};

const InfoScreen = ({ navigation }) => {
    const [userData, setUserData] = useState({
        numberPhone: '',
        userName: '',
        gender: '',
        dateOfBirth: '',
        email: '',
        imageUrl: 'https://ibb.co/SvXMSmS'
    });
    const [status, setStatus] = useState(false);

    // firebase 
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const user = auth.currentUser;
    const dbRef = ref(getDatabase());

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        if (user) {
            get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setUserData(data);
                    checkInfo(data);
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });
        }
    };

    const checkInfo = (data) => {
        if (data.numberPhone === "" || data.userName === "" || data.gender === "" || data.dateOfBirth === "" || data.email === "") {
            setStatus(false);
        } else {
            setStatus(true);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle={'light-content'}
            />
            <View style={styles.header}>
                <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.goBack()}>
                    <Icon name='chevron-back-outline' size={32} color={'#fff'} />
                </TouchableOpacity>
                <Text style={{ fontSize: 16, fontWeight: '500', color: '#ffffff' }}>Thông tin cá nhân</Text>
                <View style={{ flex: 1 }} />
            </View>

            <View style={styles.body}>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <View style={{ alignItems: 'center', marginBottom: 32 }}>
                        <Image style={styles.avatar} source={require('../../../assets/avatar.png')} />
                        <TouchableOpacity>
                            <Text style={{ fontSize: 12, color: '#53B175' }}>Thay đổi ảnh đại diện</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        {renderInfoRow("Họ và tên", userData.userName, status)}
                        {renderInfoRow("Giới tính", userData.gender, status)}
                        {renderInfoRow("Ngày sinh", userData.dateOfBirth, status)}
                        {renderInfoRow("Số điện thoại", userData.numberPhone, status)}
                        {renderInfoRow("Email", userData.email, status)}
                    </View>
                </View>
                <TouchableOpacity style={status ? styles.updateButton : styles.editButton}
                    onPress={() => navigation.navigate('EditInfoScreen')}>
                    <Text style={styles.buttonText}>
                        {status ? "Chỉnh sửa thông tin" : "Cập nhật thông tin"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
const renderInfoRow = (label, value, status) => {
    const displayValue = value ? value : (<Text style={{fontStyle:'italic', fontSize: 12, color: '#5383EC'}}>Còn thiếu</Text>);

    return (
        <View style={{ marginBottom: 24 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <Text style={styles.title}>{label}</Text>
                <Text style={status && !value ? styles.textFalse : styles.text}>{displayValue}</Text>
            </View>
            <View style={{ height: 1, backgroundColor: '#E2E2E2' }} />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fffffff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        backgroundColor: '#53B175',
        paddingBottom: 24,
        paddingTop: 64,
    },
    body: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginVertical: 16,
        marginHorizontal: 16
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#fff',
        marginBottom: 6,
    },
    text: {
        fontSize: 13,
    },
    textFalse: {
        fontSize: 12,
        fontStyle: 'italic',
    },
    title: {
        fontSize: 14,
        fontWeight: '500',
    },
    editButton: {
        backgroundColor: '#53B175',
        paddingVertical: 16,
        alignItems: 'center',
        borderRadius: 16
    },
    updateButton: {
        backgroundColor: '#53B175',
        paddingVertical: 16,
        alignItems: 'center',
        borderRadius: 16
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '800'
    }
});

export default InfoScreen;