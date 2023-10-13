import React from 'react';
import { View, StyleSheet, Image, StatusBar } from 'react-native';

const NameScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar
                barStyle={'light-content'}
            />
            <View style={styles.header}>
                <View style={{flex: 1}}></View>
                <Text style={{ fontSize: 16, fontWeight: '500', color: '#ffffff',}}>Sản phẩm yêu thích</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}>
                    <TouchableOpacity>
                        <Icon name='chatbox-ellipses-outline' size={28} color={'#ffffff'} style={{ marginRight: 6 }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name='search' size={28} color={'#ffffff'} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.body}>
                ...
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

    body: {

    },
});

export default NameScreen;