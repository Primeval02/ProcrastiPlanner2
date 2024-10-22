import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import SquareStyles from '../styles/SquareGeneratorStyles';
import UserContext from '../contexts/UserContext';
import themeContext from "../styles/darkmodefiles/themeContext";

const SquareGenerator = ({ squares, setSquares }) => {
  const { userData } = useContext(UserContext);
  const { isDarkMode } = useContext(themeContext);

  const handleRemoveSquare = (idImport, index, type) => {
    console.log("MARKED AS COMPLETE ID: ", idImport);
    Alert.alert(
      'All done?',
      `Do you want to mark this as complete?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Completed',
          onPress: () => markAsComplete(idImport, index, type),
        },
      ],
      { cancelable: false }
    );
  };

  const markAsComplete = (id, index, type) => {
    console.log("MARKED AS COMPLETE ID: ", id);

    let requestBody = { };

    if (type === 'assignment') {
      requestBody = {
        assignmentcomplete: true,
        userId: userData.userId,
        id: id
      };
    } else if (type === 'event') {
      requestBody = {
        eventcomplete: true,
        userId: userData.userId,
        id: id
      };
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
        const updatedSquares = squares.filter((square, i) => i !== index);
        console.log("UPDATED SQUARES: ", updatedSquares);
        setSquares(updatedSquares);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const formatTime = (time, type) => {
    if (type === 'assignment' || type === 'event') {
      return time.split(' ')[0];
    } 
    else {
      return new Date(time).toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      });
    }
  };

  return (
    <React.Fragment>
      {squares
      .filter(square => square.complete !==1)
      .map((square, index) => (
          <View key={index}>
            {square.starttime && (
              <View style={SquareStyles.startTimeContainer}>
                <Text style={[SquareStyles.squareTitleText, isDarkMode && { color: 'white' }]}>
                  {formatTime(square.starttime)}
                </Text>
              </View>
            )}
            {square.type === 'event' && square.date && (
              <View style={SquareStyles.startTimeContainer}>
                <Text style={[SquareStyles.squareTitleText, isDarkMode && { color: 'white' }]}>
                  {formatTime(square.date)}
                </Text>
              </View>
            )}
            <TouchableOpacity
              style={square.type === 'assignment' ? SquareStyles.assignmentSquare : SquareStyles.eventSquare}
              onPress={() => handleRemoveSquare(square.id, index, square.type)}>
              <Text style={[SquareStyles.squareText, isDarkMode && { color: 'white' }]}>{square.text}</Text>
              {square.type === 'assignment' && (
                <React.Fragment>
                  <Text style={[SquareStyles.squareText, isDarkMode && { color: 'white' }]}>Due: {formatTime(square.date, square.type)}</Text>
                </React.Fragment>
              )}
              {square.type === 'event' && (
                <React.Fragment>
                  <Text style={[SquareStyles.squareText, isDarkMode && { color: 'white' }]}>Occurring: {formatTime(square.date, square.type)}</Text>
                </React.Fragment>
              )}
            </TouchableOpacity>
            {square.endtime && (
              <View style={SquareStyles.startTimeContainer}>
                <Text style={[SquareStyles.squareTitleText, isDarkMode && { color: 'white' }]}>
                  {formatTime(square.endtime)}
                </Text>
              </View>
            )}
            {index !== squares.length - 1 && (
              <View style={SquareStyles.separator}></View>
            )}
          </View>
      ))}
    </React.Fragment>
  );
};

export default SquareGenerator;
