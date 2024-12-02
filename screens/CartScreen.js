import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const CartScreen = () => {
    const { cartItems, totalItems, totalPrice } = useSelector(state => state.cart);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Cart</Text>
            <Text style={styles.text}>Total Items: {totalItems}</Text>
            <Text style={styles.text}>Total Price: ${totalPrice.toFixed(2)}</Text>

            <FlatList
                data={cartItems}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.itemText}>
                            {item.name} - ${item.price} x {item.quantity}
                        </Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        marginVertical: 5,
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemText: {
        fontSize: 16,
    },
});

export default CartScreen;
