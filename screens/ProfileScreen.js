import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStaticNavigation, useNavigation,} from '@react-navigation/native';

export default function App() {
    const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Text>Comming Soon ..</Text>
      <StatusBar style="auto" />
      <Button title='Toggle drawer' onPress={() => navigation.toggleDrawer()}>Toggle drawer</Button>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});