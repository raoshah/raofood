import React from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { API_URL } from '../x';
import { addToCart, removeFromCart, clearCart } from '../reducer/cartSlice'


const ProductDetails = ({ route, navigation }) => {
    const dispatch = useDispatch();

    const { product } = route.params;

    const handleAddToCart = () => {
        dispatch(addToCart(product));
        navigation.navigate('Cart')
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image
                source={{ uri: `${API_URL}${product.image}` }} 
                style={styles.productImage}
            />
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>₹{product.price}</Text>
            <Text style={styles.productCategory}>Category: {product.category}</Text>
            <Text style={styles.productDescription}>{product.description}</Text>
            <Text style={styles.productStock}>In Stock: {product.countInStock}</Text>
            <TouchableOpacity onPress={handleAddToCart}>
                <Text>Add to cart</Text>
                </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    productImage: {
        width: '100%',
        height: 300,
        borderRadius: 10,
    },
    productName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
    },
    productPrice: {
        fontSize: 20,
        color: 'green',
        marginVertical: 10,
    },
    productCategory: {
        fontSize: 16,
        color: 'gray',
        marginVertical: 5,
    },
    productDescription: {
        fontSize: 16,
        color: '#333',
        marginVertical: 10,
    },
    productStock: {
        fontSize: 16,
        color: 'blue',
        marginVertical: 5,
    },
});

export default ProductDetails;
