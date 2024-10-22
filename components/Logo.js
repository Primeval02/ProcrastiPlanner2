import React, { useState } from 'react';
import { Image, TouchableOpacity, Modal, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

//stylesheet imports
import IndexStyles from '../styles/IndexStyles';

//main generator function
const Logo = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const handlePress = () => {
    // Handle onPress event here
    console.log('Logo pressed!');
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  const overlayPress = () => {
    setModalVisible(false);
  };
  const calTheme = {
    calendarBackground: '#055010',
    textSectionTitleColor: 'white',
    dayTextColor: '#c1f0c1',
    monthTextColor: 'white',
  };

  return (
    <>
      <TouchableOpacity onPress={handlePress}>
        <Image
          style={IndexStyles.logo}
          source={require('../images/calendar-image-png-3.png')}
        />
      </TouchableOpacity>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <TouchableOpacity style={IndexStyles.overlay} onPress={overlayPress}>
          <View style={IndexStyles.container}>
            <Calendar theme={calTheme}/>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default Logo;

