import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, loginUser } from '../reducer/authSlice';


const AuthScreen = () => {
  const [username, setName] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { authToken, isLoading, error } = useSelector((state) => state.auth);

  const handleRegister = () => {
    dispatch(registerUser({ username, password }));
  };

  const handleLogin = () => {
    dispatch(loginUser({ username, password }));
  };



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login/Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={username}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button title="Register" onPress={handleRegister} disabled={isLoading} />
        <Button title="Login" onPress={handleLogin} disabled={isLoading} />
      </View>
      {isLoading && <ActivityIndicator size="small" color="#0000ff" />}
      {error && (
        <View style={styles.errorContainer}>
          {typeof error === 'object' && error !== null ? (
            Object.entries(error).map(([field, messages], index) => (
              <Text key={index} style={styles.error}>
                {field}: {Array.isArray(messages) ? messages.join(', ') : messages}
              </Text>
            ))
          ) : (
            <Text style={styles.error}>{error}</Text>
          )}
        </View>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default AuthScreen;

