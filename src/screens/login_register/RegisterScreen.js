import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, StatusBar, Text, TouchableOpacity, Keyboard, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInput } from 'react-native-paper';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDCYGX042P9tKjlXhoL_aV5bEHKpcSwRyg",
    authDomain: "thuctaponline-2af56.firebaseapp.com",
    projectId: "thuctaponline-2af56",
    storageBucket: "thuctaponline-2af56.appspot.com",
    messagingSenderId: "932770253310",
    appId: "1:932770253310:web:8d0c03bab3292454ce98af",
    measurementId: "G-K8XB5PR5GG"
};

const RegisterScreen = ({ navigation }) => {
    const [password, setPassword] = useState('');
    const [rePass, setRePass] = useState('');
    const [email, setEmail] = useState('');
    const [numberPhone, setNumberPhone] = useState('');
    const [userName, setUserName] = useState('');

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const database = getDatabase();

    const resetForm = () => {
        setPassword('');
        setRePass('');
        setEmail('');
    }

    function writeUserData(userId, userName, email, numberPhone, password ) {
        const db = getDatabase();
        set(ref(db, 'users/' + userId), {
          username: userName,
          email: email,
          numberPhone : numberPhone,
          password: password,
        });
      }

    const handleRegister = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('Thành công');
                const user = userCredential.user;
                resetForm();
                alert('đăng ký thành công'+ user );
            })
            .catch((error) => {
                if( password == '' || rePass == '' || email == '' || displayName ==''){
                    alert('Vui lòng điền đầy đủ thông tin');
                }else if( password != rePass){
                    alert('Nhập lại mật khẩu không đúng')
                }
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            });
            
    }

    return (
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}}>
            <KeyboardAvoidingView style={styles.container} behavior='padding'>
                <StatusBar
                    barStyle={'dark-content'}
                />
                <ScrollView contentContainerStyle={{ justifyContent: 'center' }}>
                    <Image style={{ marginTop: -64 }} source={require("../../../assets/MaskGroup.png")} />
                    <View style={styles.header}>
                        <Text style={styles.title}>Đăng kí</Text>
                        <Text style={{ fontSize: 14, color: '#7C7C7C' }}>Tạo tài khoản để nhận được nhiều ưu đãi hơn ngay từ hôm nay</Text>
                    </View>
                    <View style={styles.body}>
                        {/* <TextInput
                            mode='outlined'
                            style={styles.textInput}
                            label="Họ và tên"
                            value={userName}
                            outlineColor={'#E2E2E2'}
                            activeOutlineColor={'#53B175'}
                            onChangeText={(text) => setUserName(text)}
                        /> */}
                        <TextInput
                            mode='outlined'
                            style={styles.textInput}
                            label="Email"
                            value={email}
                            outlineColor={'#E2E2E2'}
                            activeOutlineColor={'#53B175'}
                            keyboardType='email-address'
                            onChangeText={(text) => setEmail(text)}
                        />
                        {/* <TextInput
                            mode='outlined'
                            style={styles.textInput}
                            label="Số điện thoại"
                            outlineColor={'#E2E2E2'}
                            value={numberPhone}
                            activeOutlineColor={'#53B175'}
                            keyboardType='phone-pad'
                            onChangeText={(text) => setNumberPhone(text)}
                        /> */}
                        <TextInput
                            mode='outlined'
                            style={styles.textInput}
                            label="Mật khẩu"
                            value={password}
                            outlineColor={'#E2E2E2'}
                            activeOutlineColor={'#53B175'}
                            onChangeText={(text) => setPassword(text)}
                        />
                        <TextInput
                            mode='outlined'
                            style={styles.textInput}
                            label="Nhập lại mật khẩu"
                            value={rePass}
                            outlineColor={'#E2E2E2'}
                            activeOutlineColor={'#53B175'}
                            onChangeText={(text) => setRePass(text)}
                        />
                    </View>
                    <TouchableOpacity style={{ backgroundColor: '#53B175', paddingVertical: 16, alignItems: 'center', borderRadius: 16, marginHorizontal: 24 }}
                    onPress={() => handleRegister()}>
                        <Text style={{ fontSize: 16, color: '#fff', fontWeight: '800' }}>Đăng kí</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 8 }}>
                        <Text style={{ fontSize: 12 }}>Bạn đã có tài khoản?</Text>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('LoginScreen')
                        }>
                            <Text style={{ color: '#53B175', fontStyle: 'italic', fontSize: 12 }}>Đăng nhập</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#FCFCFC'
    },
    header: {
        // marginTop: -48,
        marginHorizontal: 24,
        marginBottom: 28,
    },

    title: {
        color: '#53B175',
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 15,
    },

    body: {
        flexDirection: 'column',
        marginHorizontal: 24,
        marginBottom: 32,
    },

    textInput: {
        marginBottom: 16,
        backgroundColor: '#FCFCFC',
    }
});

export default RegisterScreen;