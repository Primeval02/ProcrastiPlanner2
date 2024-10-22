import React, { useState, useContext } from 'react';
import { 
  TouchableOpacity, 
  Text, 
  View, 
  Modal, 
  TextInput, 
  Animated,
} from 'react-native';

//former react native libraries
import { Picker } from '@react-native-picker/picker';

import InputStyles from '../styles/InsertTaskStyles.js';

import UserContext from '../contexts/UserContext.js';

const InsertTaskButton = ({ fetchSchedule }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState('');
  
  const [userText, setUserText] = useState('');
  const [userTextError, setUserTextError] = useState('');

  const [userPriority, setUserPriority] = useState('');
  const [userPriorityError, setUserPriorityError] = useState('');

  const [userNotes, setUserNotes] = useState('');
  const [userNotesError, setUserNotesError] = useState('');

  const [userDuedate, setUserDuedate] = useState('');
  const [userDuedateError, setUserDuedateError] = useState('');

  const [currentDateToCompare, setCurrentDateToCompare] = useState('');

  const [userTime, setUserTime] = useState('');
  const [userTimeError, setUserTimeError] = useState('');

  const [userStartTime, setUserStartTime] = useState('');
  const [userStartTimeError, setUserStartTimeError] = useState('');

  const [tab, setTab] = useState('assignment');

  const { userData } = useContext(UserContext);
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  const showModal = () => {
    console.log("CURRENT DATE: ", formattedDate);
    // Initialize userDuedate state with current date
    const currentDateString = formattedDate.toString().slice(0, 10).replace('T', ' ');
    setUserDuedate(currentDateString);
    setUserStartTime(currentDateString);
    setCurrentDateToCompare(currentDateString);

    setError('');
    setUserTextError('');
    setUserPriorityError('');
    setUserNotesError('');
    setUserDuedateError('');
    setUserTimeError('');

    setUserText('');
    setUserPriority('');
    setUserNotes('');
    setUserTime('');
    setModalVisible(true);
    fadeIn();
  };

  const fadeAnim = new Animated.Value(10);
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
      setError('');
    });
  };

  const handleGenerateSquareButton = () => {
    setError('');
    setUserTextError('');
    setUserPriorityError('');
    setUserNotesError('');
    setUserDuedateError('');
    setUserTimeError('');

    if (tab === 'assignment') {
      if (userText.trim() === '') {
        setUserTextError('Name is required!');
        return;
      } else {
        setUserTextError('');
      }

      if (userPriority.trim() === '') {
        setUserPriorityError('Priority field is required!');
        return;
      } else {
        setUserPriorityError('');
      }

      if (!/^[1-3]$/i.test(userPriority.trim())) {
        setUserPriorityError('Please enter priority as an integer between 1-3!');
        return;
      } else {
        setUserPriorityError('');
      }

      if (!/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(userStartTime.trim())) {
        setUserStartTimeError('Start time must be in the following format!\n"YYYY-MM-DD HH:MM:SS"');
        return;
      } else {
        setUserStartTimeError('');
      }

      if (userDuedate.trim() === '') {
        setUserDuedateError('Due date is required!');
        return;
      } else {
        setUserDuedateError('');
      }

      if (!/^[1-2][0-9]{3}-(0?[1-9]|1[0-2])-(0?[1-9]|[1-2][0-9]|3[01])$/i.test(userDuedate.trim())) {
        setUserDuedateError('Please enter a valid date in "YYYY-MM-DD" format!');
        return;
      } else {
        setUserDuedateError('');
      }

      if (userDuedate.trim() < currentDateToCompare.trim()) {
        setUserDuedateError('Due date cannot be before today!');
        return;
      } else {
        setUserDuedateError('');
      }

      if (userTime.trim() === '') {
        setUserTimeError('Duration is required!');
        return;
      } else {
        setUserTimeError('');
      }

      console.log("USER TIME: ", userTime);

      if (!/^(0?[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/i.test(userTime.trim())) {
        setUserTimeError('Please enter time in "HH:MM:SS" format!\nEX: 00:30:00 = 30min');
        return;
      } else {
        setUserTimeError('');
      }

    } else if (tab === 'event') {
        if (userText.trim() === '') {
        setUserTextError('Name is required!');
        return;
      } else {
      setUserTextError('');
      }

      if (userTime.trim() === '') {
        setUserTimeError('Duration is required!');
        return;
      } else {
        setUserTimeError('');
      }

      if (!/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(userStartTime.trim())) {
        setUserStartTimeError('Start time must be in the following format!\n"YYYY-MM-DD HH:MM:SS"');
        return;
      } else {
        setUserStartTimeError('');
      }

      if (!/^[1-2][0-9]{3}-(0?[1-9]|1[0-2])-(0?[1-9]|[1-2][0-9]|3[01])$/i.test(userDuedate.trim())) {
        setUserDuedateError('Please enter a valid date in "YYYY-MM-DD" format!');
        return;
      } else {
        setUserDuedateError('');
      }

      if (userDuedate.trim() === '') {
        setUserDuedateError('Due date is required!');
        return;
      } else {
        setUserDuedateError('');
      }

      if (!/^[1-2][0-9]{3}-(0?[1-9]|1[0-2])-(0?[1-9]|[1-2][0-9]|3[01])$/i.test(userDuedate.trim())) {
        setUserDuedateError('Please enter a valid date in "YYYY-MM-DD" format!');
        return;
      } else {
        setUserDuedateError('');
      }

      if (userDuedate.trim() < currentDateToCompare.trim()) {
        setUserDuedateError('Due date cannot be before today!');
        return;
      } else {
        setUserDuedateError('');
      }
    }

    const formattedDuedate = userDuedate.trim() + ' 23:59:59';
    let requestBody = {};

    if (tab === 'assignment') {
      requestBody = {
        "makeassignment": "true",
        "name": userText,
        "priority": userPriority,
        "notes": userNotes,
        "duedate": formattedDuedate,
        "time": userTime,
        "userId": userData.userId,
        "startTime": userStartTime
      };
    } else if (tab === 'event') {
      requestBody = {
        "makeevent": "true",
        "name": userText,
        "duration": userTime,
        "eventDate": formattedDuedate,
        "userId": userData.userId,
        "startTime": userStartTime
      };
    }

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
      console.log("SENT DATA: ", data);
      fetchSchedule();
      fadeOut();
      setUserText('');
      setUserPriority('');
      setUserNotes('');
      setUserDuedate('');
      setUserTime('');
    })
    .catch(error => {
      console.error('Error:', error);
      setError('Error creating ' + tab);
    });
  };

  const handleCancel = () => {
    fadeOut();
    setUserText('');
    setUserPriority('');
    setUserNotes('');
    setUserDuedate('');
    setUserTime('');
    setError('');
  };
  

  return (
    <React.Fragment>
      <View style={InputStyles.tabContainer}>
        <TouchableOpacity
          style={[InputStyles.tab, tab === 'assignment' ? InputStyles.activeTab : null]}
          onPress={() => setTab('assignment')}
        >
          <Text style={InputStyles.tabText}>Assignment</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[InputStyles.tab, tab === 'event' ? InputStyles.activeTab : null]}
          onPress={() => setTab('event')}
        >
          <Text style={InputStyles.tabText}>Event</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => fadeOut()}
      >
        <Animated.View style={[InputStyles.modalContainer, { opacity: fadeAnim }]}>
          <View style={InputStyles.modalContent}>

            {tab === 'event' && (
              <React.Fragment>
                <Text style={InputStyles.text}>Name:</Text>
                <TextInput
                style={[InputStyles.textInput, userTextError && InputStyles.inputError]}
                onChangeText={(text) => setUserText(text)}
                value={userText}
                />

                <Text style={InputStyles.text}>Duration:</Text>
                <Picker
                  selectedValue={userTime}
                  style={[InputStyles.textInput, userTimeError && InputStyles.inputError]}
                  onValueChange={(itemValue) => setUserTime(itemValue)}
                >
                  <Picker.Item label="Duration" value="" />
                  <Picker.Item label="30 Minutes" value="00:30:00" />
                  <Picker.Item label="1 hour(s)" value="01:00:00" />
                  <Picker.Item label="1.5 hour(s)" value="01:30:00" />
                  <Picker.Item label="2 hour(s)" value="02:00:00" />
                  <Picker.Item label="2.5 hour(s)" value="02:30:00" />
                  <Picker.Item label="3 hour(s)" value="03:00:00" />
                  <Picker.Item label="3.5 hour(s)" value="03:30:00" />
                  <Picker.Item label="4 hour(s)" value="04:00:00" />
                  <Picker.Item label="4.5 hour(s)" value="04:30:00" />
                  <Picker.Item label="5 hour(s)" value="05:00:00" />
                </Picker>

                <Text style={InputStyles.text}>Start Time:</Text>
                <TextInput
                  style={[InputStyles.textInput, userStartTimeError && InputStyles.inputError]}
                  placeholder="YYYY-MM-DD HH:MM:SS (24-hour)"
                  placeholderTextColor={InputStyles.placeholderTextColor.color}
                  onChangeText={(userStartTime) => setUserStartTime(userStartTime)}
                  value={userStartTime}
                />
                
                <Text style={InputStyles.text}>Event Date:</Text>
                <TextInput
                  style={[InputStyles.textInput, userDuedateError && InputStyles.inputError]}
                  placeholder="YYYY-MM-DD HH:MM:SS"
                  placeholderTextColor={InputStyles.placeholderTextColor.color}
                  onChangeText={(duedate) => setUserDuedate(duedate)}
                  value={userDuedate}
                />

              </React.Fragment>
            )}

            {tab === 'assignment' && (
              <React.Fragment>
                <Text style={InputStyles.text}>Name:</Text>
                <TextInput
                style={[InputStyles.textInput, userTextError && InputStyles.inputError]}
                onChangeText={(text) => setUserText(text)}
                value={userText}
                />

                <Text style={InputStyles.text}>Priority:</Text>
                <Picker
                  selectedValue={userPriority}
                  style={[InputStyles.textInput, userPriorityError && InputStyles.inputError]}
                  onValueChange={(itemValue) => setUserPriority(itemValue)}
                >
                  <Picker.Item label="Priority" value="" />
                  <Picker.Item label="1" value="1" />
                  <Picker.Item label="2" value="2" />
                  <Picker.Item label="3" value="3" />
                </Picker>

                <Text style={InputStyles.text}>Notes:</Text>
                <TextInput
                  style={[InputStyles.textInput, userNotesError && InputStyles.inputError]}
                  onChangeText={(notes) => setUserNotes(notes)}
                  value={userNotes}
                />     

                <Picker
                  selectedValue={userTime}
                  style={[InputStyles.textInput, userTimeError && InputStyles.inputError]}
                  onValueChange={(itemValue) => setUserTime(itemValue)}
                  
                >
                  <Picker.Item label="Duration" value="" />
                  <Picker.Item label="30 Minutes" value="00:30:00" />
                  <Picker.Item label="1 hour(s)" value="01:00:00" />
                  <Picker.Item label="1.5 hour(s)" value="01:30:00" />
                  <Picker.Item label="2 hour(s)" value="02:00:00" />
                  <Picker.Item label="2.5 hour(s)" value="02:30:00" />
                  <Picker.Item label="3 hour(s)" value="03:00:00" />
                  <Picker.Item label="3.5 hour(s)" value="03:30:00" />
                  <Picker.Item label="4 hour(s)" value="04:00:00" />
                  <Picker.Item label="4.5 hour(s)" value="04:30:00" />
                  <Picker.Item label="5 hour(s)" value="05:00:00" />
                </Picker>

                <Text style={InputStyles.text}>Start Time:</Text>
                <TextInput
                  style={[InputStyles.textInput, userStartTimeError && InputStyles.inputError]}
                  placeholder="YYYY-MM-DD HH:MM:SS (24-hour)"
                  placeholderTextColor={InputStyles.placeholderTextColor.color}
                  onChangeText={(userStartTime) => setUserStartTime(userStartTime)}
                  value={userStartTime}
                />    

                <Text style={InputStyles.text}>Due Date:</Text>
                <TextInput
                  style={[InputStyles.textInput, userDuedateError && InputStyles.inputError]}
                  placeholder="YYYY-MM-DD HH:MM:SS"
                  placeholderTextColor={InputStyles.placeholderTextColor.color}
                  onChangeText={(duedate) => setUserDuedate(duedate)}
                  value={userDuedate}
                />     

              </React.Fragment>
            )}
            <View style={InputStyles.buttonContainer}>

              {error !== '' && <Text style={InputStyles.errorText}>{error}</Text>}
              {userTextError !== '' && <Text style={InputStyles.errorText}>{userTextError}</Text>}
              {userPriorityError !== '' && <Text style={InputStyles.errorText}>{userPriorityError}</Text>}
              {userStartTimeError !== '' && <Text style={InputStyles.errorText}>{userStartTimeError}</Text>}
              {userDuedateError !== '' && <Text style={InputStyles.errorText}>{userDuedateError}</Text>}
              {userTimeError !== '' && <Text style={InputStyles.errorText}>{userTimeError}</Text>}

              <TouchableOpacity onPress={handleGenerateSquareButton} style={[InputStyles.button, { backgroundColor: 'lightblue' }]}>
                <Text style={InputStyles.buttonText}>Generate Square</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleCancel} style={[InputStyles.button, { backgroundColor: 'red' }]}>
                <Text style={InputStyles.cancelbuttonText}>Cancel</Text>
              </TouchableOpacity>

            </View>
          </View>
        </Animated.View>
      </Modal>

      <TouchableOpacity
        style={InputStyles.insertTaskButton}
        onPress={showModal}
      >
        <Text style={InputStyles.insertTaskButtonText}>+</Text>
      </TouchableOpacity>
    </React.Fragment>
  );
};

export default InsertTaskButton;
