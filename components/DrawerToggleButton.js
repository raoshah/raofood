import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DrawerToggleButton = ({ navigation }) => {
    return (
        <TouchableOpacity
            style={{ marginLeft: 10, marginRight: 20 }}
            onPress={() => navigation.toggleDrawer()}
        >
            <Ionicons name="menu" size={24} color="black" />
            
        </TouchableOpacity>
    );
};

export default DrawerToggleButton;
