import React, { useContext } from "react";
import { View, Text } from 'react-native';

//stylesheet imports
import AccountStyles from "../../styles/innerstyles/AccountStyles.js";

import UserContext from "../../contexts/UserContext.js";

//dark mode imports
import themeContext from "../../styles/darkmodefiles/themeContext.js";
import theme from "../../styles/darkmodefiles/theme.js";


const Account = () => {
  const { userData } = useContext(UserContext);

  //for dark mode
  const { isDarkMode } = useContext(themeContext);
  const pickTheme = isDarkMode ? theme.dark : theme.light;

  return (
    <View style={[AccountStyles.accountContainer, { backgroundColor: pickTheme.background }]}>
      <Text style={{ color: pickTheme.color }}>HI</Text>
      <Text style={{ color: pickTheme.color }}>User ID: {userData.userId}</Text>
      <Text style={{ color: pickTheme.color }}>Username: {userData.username}</Text>
    </View>
  );
}

export default Account;
