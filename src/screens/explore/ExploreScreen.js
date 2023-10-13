import React, { useState } from 'react';
import { View, StyleSheet, Image, StatusBar, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Searchbar, } from 'react-native-paper';

const ExploreScreen = ({ navigation }) => {

    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);

    const Search = () => {
        return (
            <View style={styles.search}>
                <TouchableOpacity>
                    <Icon name='search' size={24} color={'#181B19'} />
                </TouchableOpacity>
                <TextInput style={styles.input} placeholder='Tim kiếm sản phẩm' />
            </View>
        );
    }


    return (
        <View style={styles.container}>
            <StatusBar
                barStyle={'light-content'}
            />
            <View style={styles.header}>
                <View style={{ flex: 1 }}>
                    <Search />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <TouchableOpacity>
                        <Icon name='chatbox-ellipses-outline' size={28} color={'#ffffff'} style={{ marginRight: 6 }} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.body}>

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

    search: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F2F3F2',
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginEnd: 12,
        borderRadius: 50,
    },

    input: {
        height: 32,
        fontSize: 13,
        backgroundColor: '#F2F3F2',
        flex: 1,
        paddingVertical: 4,
        paddingHorizontal: 6,
        marginStart: 6,
    },
});

export default ExploreScreen;