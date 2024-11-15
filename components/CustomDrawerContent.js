import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

function CustomDrawerContent(props) {
  const { authToken } = useSelector((state) => state.auth)
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://picsum.photos/200/300' }}
          style={styles.profileImage}
        />
        {authToken?
        <Text style={styles.username}>Shah Rukh Rao</Text>
      : <Text style={styles.username}>Login</Text> }
        
      </View>
      <DrawerItemList {...props} />
      <View style={styles.footer}>
        <Button title="Logout" color="red" onPress={() => alert('Logged out')} />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});

export default CustomDrawerContent;
