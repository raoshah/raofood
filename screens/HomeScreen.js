import React, { useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../reducer/productSlice';
import { API_URL } from '../x';

const HomePage = ({navigation}) => {
    const dispatch = useDispatch();
    const { products, isLoading, error } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const renderProduct = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { product: item })}>
        <View style={styles.productCard}>
            <Image
                source={{ uri: `${API_URL}${item.image}` }} 
                style={styles.productImage}
            />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>₹{item.price}</Text>
            <Text style={styles.productDescription}>{item.description}</Text>
        </View>
        </TouchableOpacity>
    );

    if (isLoading) {
        return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
    }

    if (error) {
        return <Text style={styles.error}>Error: {error}</Text>;
    }

    return (
        <FlatList
            data={products}
            keyExtractor={(item) => item._id.toString()}
            renderItem={renderProduct}
            contentContainerStyle={styles.container}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
    productCard: {
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 10,
        borderRadius: 8,
        elevation: 3,
    },
    productImage: {
        width: '100%',
        height: 350,
        borderRadius: 8,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    productPrice: {
        fontSize: 16,
        color: 'green',
        marginTop: 5,
    },
    productDescription: {
        fontSize: 14,
        color: 'gray',
        marginTop: 5,
    },
});

export default HomePage;
