import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';


import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import AuthScreen from './screens/AuthScreen'

import CustomDrawerContent from './components/CustomDrawerContent';


const Drawer = createDrawerNavigator();

export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>

        <Drawer.Navigator initialRouteName="Home"

          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            headerShown: true,
            drawerStyle: {
              backgroundColor: '#f0f0f0',
              width: 300,
            },
            drawerLabelStyle: {
              fontSize: 18,
              color: '#333',
              fontWeight: 'bold',
            },
          }}>

          <Drawer.Screen name="Home" component={HomeScreen}
            options={{
              drawerIcon: ({ color, size }) => (
                <Ionicons name="home-outline" size={size} color={color} />
              ),
            }} />

          <Drawer.Screen name="Profile" component={ProfileScreen}
            options={{
              drawerIcon: ({ color, size }) => (
                <Ionicons name="person-outline" size={size} color={color} />
              ),
            }} />

          <Drawer.Screen name="Auth" component={AuthScreen}
            options={{
              drawerIcon: ({ color, size }) => (
                <Ionicons name="person-outline" size={size} color={color} />
              ),
            }} />



        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
