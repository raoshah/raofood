import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';


import CustomDrawerContent from './components/CustomDrawerContent';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: true, title: 'Home' }}
    />

  </Stack.Navigator>
);


const ProfileStack = () => {
  const { authToken } = useSelector((state) => state.auth)
  return (

    <Stack.Navigator>
      {authToken ?
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: true, title: 'Profile' }}
        />
        :
        (<>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: true, title: 'Login' }}
          />

          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ headerShown: true, title: 'Sign Up' }}
          />
        </>)

      }
    </Stack.Navigator>
  )
};



export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="HomeStack"
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            headerShown: true,
            drawerStyle: { backgroundColor: '#f0f0f0', width: 300 },
            drawerLabelStyle: { fontSize: 18, color: '#333', fontWeight: 'bold' },
          }}
        >
          <Drawer.Screen
            name="HomeStack"
            component={HomeStack}
            options={{
              drawerLabel: 'Home',
              drawerIcon: ({ color, size }) => (
                <Ionicons name="home-outline" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="ProfileStack"
            component={ProfileStack}
            options={{
              drawerLabel: 'Profile',
              drawerIcon: ({ color, size }) => (
                <Ionicons name="person-outline" size={size} color={color} />
              ),
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
