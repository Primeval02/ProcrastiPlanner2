import React, {useContext} from 'react';
import { View, Text } from 'react-native';

//stylesheet imports
import HomeScreenStyles from '../styles/HomeStyles.js';

//dark mode imports
import themeContext from "../styles/darkmodefiles/themeContext";
import theme from '../styles/darkmodefiles/theme';

//main generator function
const EmptyView = () => {
  const {isDarkMode} = useContext(themeContext);
  const pickTheme = isDarkMode ? theme.dark : theme.light;

  return (
    <View style={HomeScreenStyles.emptyViewContainer}>
      <Text style={[HomeScreenStyles.emptyViewText, {color: pickTheme.color}]}>
        Working hard or hardly working?
      </Text>
    </View>
  );
};

export default EmptyView;

