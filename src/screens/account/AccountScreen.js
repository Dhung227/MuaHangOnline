import React, {useEffect, useState} from 'react';
import { View, StyleSheet, Image, StatusBar, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { initializeApp } from "firebase/app";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDCYGX042P9tKjlXhoL_aV5bEHKpcSwRyg",
    authDomain: "thuctaponline-2af56.firebaseapp.com",
    projectId: "thuctaponline-2af56",
    storageBucket: "thuctaponline-2af56.appspot.com",
    messagingSenderId: "932770253310",
    appId: "1:932770253310:web:8d0c03bab3292454ce98af",
    measurementId: "G-K8XB5PR5GG"
};

const AccountScreen = ({ navigation }) => {
    const [email, setEmail] = useState ('');
    const [emailVerified, setEmailVerified ] = useState(false);

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
                <TouchableOpacity style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginEnd: 8 }}
                    onPress={() => navigation.navigate('InfoScreen')}>
                    <Image style={styles.avatar} source={require('../../../assets/avatar.png')} />
                    <View style={{ flex: 1, flexDirection: 'column', marginStart: 6, justifyContent: 'space-between' }}>
                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '500' }}>{email}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    const auth = getAuth();
                    signOut(auth).then(() => {
                        navigation.replace('LoginScreen');
                    }).catch((error) => {
                        // An error happened.
                    });
                }}>
                    <Icon name='log-out-outline' color={'#fff'} size={32} />
                </TouchableOpacity>
            </View>

            <View style={styles.body}>
                <View style={styles.box}>
                    <View style={styles.title}>
                        <View>
                            <View style={styles.item}>
                                <FontAwesome5 name='boxes' size={32} color={'#53B175'} />
                                <Text>Đang xử lý</Text>
                            </View>

                            <View style={styles.item}>
                                <FontAwesome5 name='truck' size={32} color={'#53B175'} />
                                <Text>Đang giao</Text>
                            </View>

                            <View style={styles.item}>
                                <FontAwesome5 name='check-circle' size={32} color={'#53B175'} />
                                <Text>Đã giao</Text>
                            </View>

                            <View style={styles.item}>
                                <FontAwesome5 name='truck' size={32} color={'#53B175'} />
                                <Text>Đã hủy</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FCFCFC',
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 22,
        backgroundColor: '#53B175',
        paddingBottom: 24,
        paddingTop: 64,
    },

    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#fff',
    },

    body: {

    },
});

export default AccountScreen;