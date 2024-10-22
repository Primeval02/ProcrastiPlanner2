import React, { useState, useContext } from 'react';
import { 
  View, 
  TextInput,
  Modal,
  TouchableOpacity,
  Animated,
  Text,
  } from 'react-native';

import InputStyles from '../styles/InsertTaskStyles.js';

import UserContext from '../contexts/UserContext.js';

const SignUp = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  const { updateUser } = useContext(UserContext); 

  //initiated text entry and causes fade
  const fadeAnim = new Animated.Value(10);
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(true);
    });
  };

  //upon successfull or cancelled text entry
  //causes the Modal to disappear
  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
    });
  };

  const showModal = () => {
    setUsername('');
    setUsernameError('');
    setName('');
    setNameError('');
    setEmail('');
    setEmailError('');
    setPassword('');
    setPasswordError('');
    setConfirmPassword('');
    setConfirmPasswordError('');
    fadeIn();
  };

  //allows the user to cancel Modal input
  const handleCancel = () => {
    fadeOut();
    setUsernameError('');
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
  };


  const handleRegister = () => {
    setUsernameError('');
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    if (username.trim() === '') {
      setUsernameError('Username is required!');
      return;
    } else if (!/^[\w\-\$\ \@]{1,16}$/i.test(username.trim())) {
      setUsernameError('Invalid username!\nOnly contain word charaters (a-z,A-Z,-,@...)\nlength of 1-16');
      return;
    } else {
      setUsernameError('');
    } 

    if (name.trim() === '') {
      setNameError('Name is required!');
      return;
    } else if (!/^[a-zA-Z]{1,10}( [a-zA-Z]{0,10})?$/i.test(name.trim())) {
      setNameError('Invalid name!\nAlphabetic characters only!\nlength of 1-10\n(first name) [last name]');
      return; 
    } else
      setNameError('');

    if (email.trim() === '') {
      setEmailError('Email is required!');
      return;
    } else if (!/^[\w\-\.]+@[\w]+\.[a-z]{2,4}$/i.test(email.trim())) {
      setEmailError('Invalid email address!');
      return;
    } else {
      setEmailError('');
    }

    if (password.trim() === '') {
      setPasswordError('Password is required!');
      return;
    } else if (!/^[a-zA-Z0-9\?\*\!\%\#\&\@]{13,20}$/i.test(password.trim())){
      setPasswordError('Invalid/weak password!\nlength of 13 - 20\nonly alphanumeric and special characters')
      return;
    } else {
      setPasswordError('');
    }

    if (confirmPassword.trim() === '') {
      setConfirmPasswordError('Please confirm password!');
      return;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match!');
      return;
    } else {
      setConfirmPasswordError('');
    }

    const requestBody = {
      "register": true,
      "username": username,
      "name" : name,
      "email" : email,
      "password" : password
    };

    fetch('https://artemis.cs.csub.edu/~procrastiplanner/Procrastiplanner/sql/endpoint.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
      .then(response => {
        console.log('Response: ', response)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('RETURNED REGISTER:', data);
        updateUser(data);
        fadeOut();
        setUsername('');
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        onLogin();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => fadeOut()}
      >
        <View style={InputStyles.modalContainer}>
          <View style={InputStyles.modalContent}>

            <Text style={InputStyles.text}>Username:</Text>
            <TextInput
              style={[InputStyles.textInput,
              usernameError && InputStyles.inputError
              ]}
              placeholder="a-z, A-Z, {1-16}..."
              placeholderTextColor={InputStyles.placeholderTextColor.color}
              onChangeText={(text) => setUsername(text)}
              value={username}
            />

            <Text style={InputStyles.text}>Name:</Text>
            <TextInput
              style={[InputStyles.textInput,
              nameError && InputStyles.inputError]}
              placeholder="'John', 'Jane Smith'..."
              placeholderTextColor={InputStyles.placeholderTextColor.color}
              onChangeText={(text) => setName(text)}
              value={name}
            />

            <Text style={InputStyles.text}>Email:</Text>
            <TextInput
              style={[InputStyles.textInput,
              emailError && InputStyles.inputError]}
              placeholder="JaneCoder@gmail.com..."
              placeholderTextColor={InputStyles.placeholderTextColor.color}
              onChangeText={(text) => setEmail(text)}
              value={email}
            />

            <Text style={InputStyles.text}>Password:</Text>
            <TextInput
              style={[InputStyles.textInput,
              passwordError && InputStyles.inputError]}
              placeholder="Enter password..."
              placeholderTextColor={InputStyles.placeholderTextColor.color}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              value={password}
            />

            <Text style={InputStyles.text}>Confirm Password:</Text>
            <TextInput
              style={[InputStyles.textInput,
              confirmPasswordError && InputStyles.inputError]}
              placeholder="Re-enter password..."
              placeholderTextColor={InputStyles.placeholderTextColor.color}
              secureTextEntry={true}
              onChangeText={(text) => setConfirmPassword(text)}
              value={confirmPassword}
            />

            {/* Error handling */}
            {usernameError !== '' && <Text style={InputStyles.errorText}>{usernameError}</Text>}
            {nameError !== '' && <Text style={InputStyles.errorText}>{nameError}</Text>}
            {emailError !== '' && <Text style={InputStyles.errorText}>{emailError}</Text>}
            {passwordError !== '' && <Text style={InputStyles.errorText}>{passwordError}</Text>}
            {confirmPasswordError !== '' && <Text style={InputStyles.errorText}>{confirmPasswordError}</Text>}

            <TouchableOpacity onPress={handleRegister}
             style={[InputStyles.button, { backgroundColor: 'lightblue' }]}>
             <Text style={InputStyles.buttonText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancel}
              style={[InputStyles.button, { backgroundColor: 'red' }]}>
              <Text style={InputStyles.cancelbuttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={showModal} style={[InputStyles.button, { backgroundColor: 'green' }]}>
        <Text  style={InputStyles.registerbuttonText}>Register New User</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;
