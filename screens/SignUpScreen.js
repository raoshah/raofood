import React, { useState } from 'react';
import {
  View,
  Text as RNText,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { sendEmail, verifyEmail, registerUser } from '../reducer/authSlice';

const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [sendOtp, setSendOtp] = useState(true);

  const [emailError, setEmailError] = useState('');
  const [numberError, setNumberError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [otpError, setOtpError] = useState('');

  const dispatch = useDispatch();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateNumber = (num) => /^[0-9]+$/.test(num);

  const handleEmailChange = (input) => {
    setEmail(input);
    setEmailError(validateEmail(input) ? '' : 'Invalid email address');
  };

  const handleNumberChange = (input) => {
    setUsername(input);
    setNumberError(input === '' || validateNumber(input) ? '' : 'Only numeric values are allowed');
  };

  const handleSendEmail = () => {
    if (validateEmail(email)) {
      setEmailError('');
      dispatch(sendEmail({ email })).then(() => {
        alert('Verification code sent to your email!');
        setSendOtp(false); 
      });
    } else {
      setEmailError('Please enter a valid email to verify.');
    }
  };

  const handleVerifyOtp = () => {
    if (otp.length === 6) {
      dispatch(verifyEmail({ email, otp })).then((response) => {
       
        console.log(response.payload.message === "Email verified successfully.")
        if (response.payload.message === "Email verified successfully.") {
          setIsEmailVerified(true);
          alert('Email verified successfully!');
        } else {
          setOtpError('Invalid OTP. Please try again.');
        }
      });
    } else {
      setOtpError('Please enter a valid 6-digit OTP.');
    }
  };

  const handleSubmit = () => {
    if (!isEmailVerified) {
      setGeneralError('Please verify your email before submitting.');
      return;
    }

    setGeneralError('');
    if (!validateNumber(username)) {
      setNumberError('Please enter a valid number');
    }
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
    }
    if (!first_name || !last_name || !username || !password) {
      setGeneralError('All fields are required');
    }

    if (!emailError && !numberError && !passwordError && !generalError) {
      dispatch(registerUser({ email, username, password, first_name, last_name }));
      alert('Registration successful!');
      navigation.navigate('Login');
    }
  };

  return (
    <View style={styles.container}>
      {!isEmailVerified && (
        <>
          {sendOtp ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={handleEmailChange}
                keyboardType="email-address"
              />
              {emailError ? <RNText style={styles.error}>{emailError}</RNText> : null}
              <TouchableOpacity style={styles.button} onPress={handleSendEmail}>
                <RNText style={styles.buttonText}>Send Verification Email</RNText>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TextInput
                style={styles.input}
                placeholder="Enter OTP"
                value={otp}
                onChangeText={setOtp}
                keyboardType="numeric"
              />
              {otpError ? <RNText style={styles.error}>{otpError}</RNText> : null}
              <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
                <RNText style={styles.buttonText}>Verify OTP</RNText>
              </TouchableOpacity>
            </>
          )}
        </>
      )}

      {isEmailVerified && (
        <>
          <TextInput
            style={styles.input}
            placeholder="First name"
            value={first_name}
            onChangeText={setFirstName}
          />

          <TextInput
            style={styles.input}
            placeholder="Last name"
            value={last_name}
            onChangeText={setLastName}
          />

          <TextInput
            style={styles.input}
            placeholder="Number"
            value={username}
            onChangeText={handleNumberChange}
            keyboardType="numeric"
          />
          {numberError ? <RNText style={styles.error}>{numberError}</RNText> : null}

          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          {passwordError ? <RNText style={styles.error}>{passwordError}</RNText> : null}

          {generalError ? <RNText style={styles.error}>{generalError}</RNText> : null}

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <RNText style={styles.buttonText}>Submit</RNText>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#6200EE',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default SignUpScreen;
