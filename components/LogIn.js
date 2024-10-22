import React, { useState, useContext } from 'react';
import { View, TextInput, Modal, TouchableOpacity, Animated, Text, Alert } from 'react-native';


import InputStyles from '../styles/InsertTaskStyles.js';
import UserContext from '../contexts/UserContext.js';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  const { updateUser } = useContext(UserContext);

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
    setPassword('');
    setPasswordError('');
    fadeIn();
  };

  const handleCancel = () => {
    fadeOut();
    setUsernameError('');
    setPasswordError('');
  };  

  const handleLogin = () => {
    setUsernameError('');
    setPasswordError('');

    // Validation logic

    const requestBody = {
      "login": true,
      "username": username,
      "password": password      
    };

    fetch('https://artemis.cs.csub.edu/~procrastiplanner/Procrastiplanner/sql/endpoint.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (!data || !data.userId) {
        throw new Error('Invalid username or password');
      }
      updateUser(data);
      fadeOut();
      setUsername('');
      setPassword('');
      onLogin();
    })
    .catch(error => {
      if (error.message === 'Network response was not ok') {
        setUsernameError('Network error. Please try again later.');
      } else {
        setUsernameError('Invalid username or password!');
      }
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
          <Animated.View style={[InputStyles.modalContent, { opacity: fadeAnim }]}>
            <Text style={InputStyles.text}>Username:</Text>
            <TextInput
              style={[InputStyles.textInput, usernameError && InputStyles.inputError]}
              placeholder="a-z, A-Z, {1-16}..."
              placeholderTextColor={InputStyles.placeholderTextColor.color}
              onChangeText={(text) => setUsername(text)}
              value={username}
            />

            <Text style={InputStyles.text}>Password:</Text>
            <TextInput
              style={[InputStyles.textInput, passwordError && InputStyles.inputError]}
              placeholder="Enter password..."
              placeholderTextColor={InputStyles.placeholderTextColor.color}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              value={password}
            />

            {usernameError !== '' && <Text style={InputStyles.errorText}>{usernameError}</Text>}
            {passwordError !== '' && <Text style={InputStyles.errorText}>{passwordError}</Text>}

            <TouchableOpacity onPress={handleLogin} style={[InputStyles.button, { backgroundColor: 'lightblue' }]}>
              <Text style={InputStyles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCancel} style={[InputStyles.button, { backgroundColor: 'red' }]}>
              <Text style={InputStyles.cancelbuttonText}>Cancel</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>

      <TouchableOpacity onPress={showModal} style={[InputStyles.button, { backgroundColor: 'red' }]}>
        <Text style={InputStyles.loginbuttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
