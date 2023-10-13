import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, StatusBar, Text, Keyboard, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInput } from 'react-native-paper';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDCYGX042P9tKjlXhoL_aV5bEHKpcSwRyg",
    authDomain: "thuctaponline-2af56.firebaseapp.com",
    projectId: "thuctaponline-2af56",
    storageBucket: "thuctaponline-2af56.appspot.com",
    messagingSenderId: "932770253310",
    appId: "1:932770253310:web:8d0c03bab3292454ce98af",
    measurementId: "G-K8XB5PR5GG"
};

const LoginScreen = ({ navigation }) => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                alert('Đăng nhập thành công' + user.email);
                navigation.replace('BottomTab');
            })
            .catch((error) => {
                alert('Vui lòng kiểm tra lại thông tin đăng nhập');
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            });
    }

    dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <TouchableWithoutFeedback onPress={this.dismissKeyboard}>
            <View style={styles.container} behavior='padding'>
                <StatusBar
                    barStyle={'dark-content'}
                />
                <Image style={{ marginTop: -64 }} source={require("../../../assets/MaskGroup.png")} />
                <View style={styles.header}>
                    <Text style={styles.title}>Đăng nhập</Text>
                    <Text style={{ fontSize: 14, color: '#7C7C7C' }}>Nhập thông tin tài khoản để tiếp tục</Text>
                </View>
                <View style={styles.body}>
                    <View>
                        <TextInput
                            mode='outlined'
                            style={styles.textInput}
                            label="Email"
                            outlineColor={'#E2E2E2'}
                            activeOutlineColor={'#53B175'}
                            keyboardType='email-address'
                            onChangeText={(text) => setEmail(text)}
                        />
                        <TextInput
                            mode='outlined'
                            style={styles.textInput}
                            label="Mật khẩu"
                            outlineColor={'#E2E2E2'}
                            secureTextEntry={true}
                            activeOutlineColor={'#53B175'}
                            onChangeText={(text) => setPassword(text)}
                        />
                        <View style={{ marginTop: -16, flexDirection: 'row' }}>
                            <View style={{ flex: 1 }} />
                            <TouchableOpacity>
                                <Text style={{ fontStyle: 'italic', fontSize: 12, color: '#53B175' }}>
                                    Quên mật khẩu?
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ bottom: 24 }}>
                        <View>
                            {/* Đang nhap */}
                            <TouchableOpacity style={{ backgroundColor: '#53B175', paddingVertical: 16, alignItems: 'center', borderRadius: 16 }}
                                onPress={() => navigation.navigate('BottomTab')}>
                                <Text style={{ fontSize: 16, color: '#fff', fontWeight: '800' }}>Tiếp tục với mà không đăng nhập</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ backgroundColor: '#53B175', paddingVertical: 16, alignItems: 'center', borderRadius: 16, marginTop: 16, }}
                                onPress={() => handleLogin()}>
                                <Text style={{ fontSize: 16, color: '#fff', fontWeight: '800' }}>Đăng nhập</Text>
                            </TouchableOpacity>

                            {/* Đăng ký */}
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 8 }}>
                                <Text style={{ fontSize: 12 }}>Bạn không có tài khoản?</Text>
                                <TouchableOpacity onPress={() =>
                                    navigation.navigate('RegisterScreen')
                                }>
                                    <Text style={{ color: '#53B175', fontStyle: 'italic', fontSize: 12 }}>Đăng kí</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
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
        marginHorizontal: 24,
        marginBottom: 32,
    },

    title: {
        color: '#53B175',
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 6,
    },

    body: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'column',
        marginHorizontal: 24,
    },

    textInput: {
        fontSize: 16,
        // paddingHorizontal: 6,
        backgroundColor: '#FCFCFC',
        marginBottom: 24,
    },

    socialLogin: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    imageSocial: {
        width: 50,
        height: 50,
    }
});

export default LoginScreen;