import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  } from 'react-native';

//imports style sheet
import RegenStyles from '../styles/RegenerateStyles.js';

const RegenerateButton = ({ onRegenerate }) => {

  const handlePress = () => {
    if (onRegenerate) {
      onRegenerate();
    }
  };

  return (
        <TouchableOpacity
          style={RegenStyles.regenButton}
          onPress={handlePress}
        >
          <Text style={RegenStyles.regenButtonText}>-</Text>
        </TouchableOpacity>
  );

};

export default RegenerateButton;