import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, View, Text, Keyboard, ScrollView } from 'react-native';

// Component imports
import SquareGenerator from "../components/SquareGenerator.js";
import InsertTaskButton from "../components/InsertTaskButton.js";

import EmptyView from "../components/EmptyView.js";

// Stylesheet imports
import HomeScreenStyles from "../styles/HomeStyles.js";


// Dark mode imports
import themeContext from "../styles/darkmodefiles/themeContext";
import theme from "../styles/darkmodefiles/theme";

import UserContext from "../contexts/UserContext.js";

export default function HomeScreen() {
  // State variables

  const [emptyVisible, setEmptyVisible] = useState(true);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const { userData } = useContext(UserContext);
  const { isDarkMode } = useContext(themeContext);
  const pickTheme = isDarkMode ? theme.dark : theme.light;

  // Square data
  const [squares, setSquares] = useState([]);

  // Date functionality
  const currentDate = new Date();
  const options = { weekday: 'long' };
  const weekday = currentDate.toLocaleDateString('en-US', options);

  //fetch schedule data from endpoint
  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = () => {
    const requestBody = {
      "schedule": true,
      "userId": userData.userId
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
        console.log("FETCHED SCHEDULE: ", data);
        handleScheduleData(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleScheduleData = (fetchedData) => {
    if (!fetchedData || !Array.isArray(fetchedData)) {
      console.error('Invalid or empty fetched data:', fetchedData);
      return;
    }

    const hasScheduleItems = fetchedData.some(item => item.id !== -1 && item.id !== -2);

    if (!hasScheduleItems) {
      setEmptyVisible(true);
      setSquares([]);
      return;
    }

    //filters day start/end and anything marked as complete
    const filteredData = fetchedData.filter(item => item.id !== -1 && item.id !== -2 && item.complete !== 1);

    const squares = filteredData.map(item => {
      if (item.aValue !== undefined) { // Assignments
        return {
          text: item.name,
          duration: item.time,
          complete: item.complete,
          id: item.id,
          date: item.duedate,
          starttime: item.startTime,
          endtime: item.endTime,
          type: 'assignment'
        };
      } else { // Events
        return {
          text: item.name,
          duration: item.duration,
          date: item.startTime,
          id: item.id,
          type: 'event'
        };
      }
    });

    // Set the combined data to state
    setSquares(squares);
    setEmptyVisible(false);
  };

  // Keyboard listeners
  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );

    const keyboardHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    // Clean up event listeners 
    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

  return (
    <SafeAreaView style={[{ flex: 1 }, { backgroundColor: pickTheme.background }]}>
      <View style={HomeScreenStyles.container}>
        <View style={keyboardVisible ? HomeScreenStyles.currentDayContainerKeyboard : HomeScreenStyles.currentDayContainer}>
          <Text style={[HomeScreenStyles.currentDay, { color: pickTheme.color }]}>
            {weekday}
          </Text>
        </View>

        <View style={keyboardVisible ? HomeScreenStyles.verticalContentContainerKeyboard : HomeScreenStyles.verticalContentContainer}>
          {emptyVisible && (
            <View style={HomeScreenStyles.emptyViewContainer}>
              <EmptyView />
            </View>
          )}

          {!emptyVisible && (
            <View style={HomeScreenStyles.rowContainer}>

              <View style={HomeScreenStyles.squareViewContainer}>
                <ScrollView>
                  {/* Render squares */}
                  <SquareGenerator
                    squares={squares}
                    setSquares={setSquares}
                  />
                </ScrollView>
              </View>
            </View>
          )}

          <View style={HomeScreenStyles.insertTaskContainer}>
            <InsertTaskButton
              fetchSchedule={fetchSchedule}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
