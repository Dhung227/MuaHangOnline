import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, StatusBar, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInput, RadioButton } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
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

const EditInfoScreen = ({ navigation }) => {

    const [editable, setEditable] = useState(false);

    const [userId, SetUserId] = useState('')
    const [userName, setUserName] = useState('')
    const [dateOfBirth, setdateOfBirth] = useState('');
    const [email, setEmail] = useState('');
    const [numberPhone, setNumberPhone] = useState('');
    const [checkGender, setCheckGender] = useState('Nam');

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const user = auth.currentUser;

    useEffect(() => {
        if (user) {
            setEmail(user.email);
            SetUserId(user.uid);
            console.log(user.uid);
        } else {
            console.log('lỗi');
        }
    }, [user]);
    
    // ghi dữ liệu
    function writeUserData(userId, userName, dateOfBirth, email, numberPhone, checkGender) {
        const db = getDatabase();
        set(ref(db, 'users/' + userId), {
            userName: userName,
            dateOfBirth: dateOfBirth,
            numberPhone: numberPhone,
            email: email,
            gender: checkGender,
        });
        resetForm();
        alert('Cập nhật thông tin thành công');
        navigation.replace('InfoScreen');
    }

    const fomartDate = (number) => {
        return number < 10 ? `0${number}` : `${number}`;
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        const day = fomartDate(date.getDate());
        const month = fomartDate(date.getMonth() + 1); // Tháng bắt đầu từ 0
        const year = date.getFullYear(); // Lấy hai chữ số cuối của năm

        const formattedDate = `${day}/${month}/${year}`;
        setdateOfBirth(formattedDate);
        hideDatePicker();
    };

    const resetForm = () => {
        setUserName('');
        setdateOfBirth('');
        setNumberPhone('');
        setEmail('');
        setCheckGender('Nam');
    }

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle={'light-content'}
            />
            <View style={styles.header}>
                <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.goBack()}>
                    <Icon name='chevron-back-outline' size={32} color={'#fff'} />
                </TouchableOpacity>
                <Text style={{ fontSize: 16, fontWeight: '500', color: '#ffffff' }}>chỉnh sửa thông tin</Text>
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

                    <View style={{ flex: 1, flexDirection: 'column', }}>
                        {/* HỌ VÀ TÊN */}
                        <TextInput
                            mode='outlined'
                            style={styles.textInput}
                            label="Họ và tên"
                            value={userName}
                            outlineColor={'#E2E2E2'}
                            activeOutlineColor={'#53B175'}
                            onChangeText={(text) => setUserName(text)}
                        />
                        {/* NGÀY SINH */}
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ flex: 1 }}>
                                <TextInput
                                    mode='outlined'
                                    style={styles.textInput}
                                    label="Ngày sinh"
                                    value={dateOfBirth}
                                    outlineColor={'#E2E2E2'}
                                    activeOutlineColor={'#53B175'}
                                    editable={false}
                                />
                            </View>
                            <TouchableOpacity onPress={() => { setDatePickerVisibility(true) }}>
                                <Icon name='calendar-outline' color={'#53B175'} size={32} style={styles.icon} />
                            </TouchableOpacity>
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                            />
                        </View>
                        {/* SÓ ĐIỆN THOẠI */}
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ flex: 1 }}>
                                <TextInput
                                    mode='outlined'
                                    style={[styles.textInput, { backgroundColor: editable ? '#ffffff' : '#ffffff' }]}
                                    label="số điện thoại"
                                    value={numberPhone}
                                    outlineColor={'#E2E2E2'}
                                    activeOutlineColor={'#53B175'}
                                    onChangeText={(text) => setNumberPhone(text)}
                                // editable={false}
                                />
                            </View>
                            <TouchableOpacity>
                                <Icon name='pencil-sharp' color={'#53B175'} size={32} style={styles.icon} />
                            </TouchableOpacity>
                        </View>
                        {/* EMAIL */}
                        <TextInput
                            mode='outlined'
                            style={styles.textInput}
                            label="Email"
                            value={email}
                            outlineColor={'#E2E2E2'}
                            onChangeText={(text) => setEmail(text)}
                            activeOutlineColor={'#53B175'}
                        />
                        {/* GIỚI TÍNH */}
                        <View style={{ flexDirection: 'row', marginStart: 8 }}>
                            <View style={styles.gender}>
                                <View style={styles.checkbox}>
                                    <RadioButton
                                        value="Nam"
                                        status={checkGender === 'Nam' ? 'checked' : 'unchecked'}
                                        onPress={() => setCheckGender('Nam')}
                                        color='#3085C3'
                                        uncheckedColor="#B4B4B3"
                                    />
                                </View>
                                <Text>Nam</Text>
                            </View>
                            <View style={styles.gender}>
                                <View style={styles.checkbox}>
                                    <RadioButton
                                        value="Nữ"
                                        status={checkGender === 'Nữ' ? 'checked' : 'unchecked'}
                                        onPress={() => setCheckGender('Nữ')}
                                        color='#FF6969'
                                        uncheckedColor="#B4B4B3"
                                    />
                                </View>
                                <Text>Nữ</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={{ backgroundColor: '#53B175', paddingVertical: 14, alignItems: 'center', borderRadius: 16 }}
                    onPress={() => {
                        writeUserData(userId, userName, dateOfBirth, email, numberPhone, checkGender)
                    }}>
                    <Text style={{ fontSize: 16, color: '#fff', fontWeight: '800' }}>Hoàn thành</Text>
                </TouchableOpacity>
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

    textInput: {
        color: '#7C7C7C',
        fontSize: 13,
        backgroundColor: '#FCFCFC',
        marginBottom: 20,
    },

    icon: {
        marginStart: 6,
        top: -8,
    },

    checkbox: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 35,
        height: 35,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 50,
        marginEnd: 4,
    },

    gender: {
        flexDirection: 'row',
        alignItems: 'center',
        marginStart: 16,
    }
});

export default EditInfoScreen;