import React from 'react';
import { View, StyleSheet, Image, StatusBar, Text, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

var danhSachSanPham = [
    {
        tenSanPham: "Bánh mỳ",
        gia: 10000,
        donVi: "ổ",
        hinhAnh: "https://example.com/banh-my.jpg"
    },
    {
        tenSanPham: "Gạo",
        gia: 20000,
        donVi: "kg",
        hinhAnh: "https://example.com/gao.jpg"
    },
    {
        tenSanPham: "Nước ngọt Coca-Cola",
        gia: 15000,
        donVi: "lon 330ml",
        hinhAnh: "https://example.com/coca-cola.jpg"
    },
    {
        tenSanPham: "Sữa tươi Vinamilk",
        gia: 12000,
        donVi: "hộp 180ml",
        hinhAnh: "https://example.com/sua-tuoi.jpg"
    },
    {
        tenSanPham: "Thịt gà",
        gia: 50000,
        donVi: "kg",
        hinhAnh: "https://example.com/thit-ga.jpg"
    },
    {
        tenSanPham: "Bánh quy hạt chocolate",
        gia: 25000,
        donVi: "hộp 200g",
        hinhAnh: "https://example.com/banh-quy.jpg"
    },
];

const FavoriteScreen = ({ navigation }) => {
    const renderItem = ({ item }) => (
        <View>
            <View style={styles.itemView}>
                <Image source={{ uri: 'https://minhcaumart.vn/media/com_eshop/products/image_5e465567d7b08_BMX2.webp' }} style={{ width: 100, height: 100 }} />
                <View style={{ flexDirection: 'column', justifyContent: 'space-between', height: 100, marginHorizontal: 6, }}>
                    <Text style={{ color: '#53B175', fontWeight: '500' }}>{item.tenSanPham}</Text>
                    <Text style={{ color: '#dc7a43' }}>{item.gia}đ/{item.donVi}</Text>
                    <TouchableOpacity style={styles.btnAddToCart}>
                        <Icon name='cart-outline' color={'#fff'} size={24} style={{ marginRight: 4 }} />
                        <Text style={{ color: '#ffffff', fontWeight: 500 }}>
                            Thêm vào giỏ hàng
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ height: 1, backgroundColor: '#E2E2E2' }} />
        </View>
    );

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
                <FlatList
                    style={{ marginBottom: 110 }}
                    data={danhSachSanPham}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.tenSanPham}
                />
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
        flex: 1,
        backgroundColor: '#ffffff',
    },

    btnAddToCart: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff6600',
        paddingHorizontal: 11,
        paddingVertical: 8,
        borderRadius: 6,
    },
    // Item

    itemView: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 16,
    }
});

export default FavoriteScreen;