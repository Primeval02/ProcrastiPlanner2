import 'react-native-gesture-handler';
/**
 * @format
 */

import {AppRegistry, Image} from 'react-native';
//import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

//Imports for bottom nav
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

//imports for screen
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsNavigator from './screens/innersettings/SettingsNav';
import LoginScreen from './screens/LoginScreen';

//component imports
import Logo from './components/Logo';

//stylesheet imports
import IndexStyles from './styles/IndexStyles';

import { useState } from 'react';
import { ThemeProvider } from './styles/darkmodefiles/themeContext';
import { UserProvider } from './contexts/UserContext';
import theme from './styles/darkmodefiles/theme';

//Code to make bottom nav
const Tab = createBottomTabNavigator();
//code for stack
const appStack = createStackNavigator();

function App() {
  //login check
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  //const [mode, setMode] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
   
  const toggleDarkMode = () => {
      setIsDarkMode(prevMode => !prevMode);
  };
  /*useEffect(() => {
      let eventListener = EventRegister.addEventListener("changeTheme", (data) => {
          setMode(data);
      });
      return () => {
          EventRegister.removeEventListener(eventListener);
      }
  });*/
  return(
      //<themeContext.Provider value={mode === true ? theme.dark : theme.light}>
      <ThemeProvider value={isDarkMode ? theme.dark : theme.light}>
      <UserProvider>
      <NavigationContainer>
    {isLoggedIn ? (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            {/* bottom nav bar */}
            if (route.name === 'Home') {
              iconName = focused 
              ? 'home' 
              : 'home-outline';
            } else if (route.name === 'Settings') {
              iconName = focused 
              ? 'cog' 
              : 'cog-outline';
            } else if (route.name === 'Profile') {
              iconName = focused 
              ? 'account-circle' 
              : 'account-circle-outline';
            }              
            return <Icons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: '#009900',
          headerTitleAlign: 'center',
          tabBarStyle: {
            backgroundColor: '#595959'
          },
          headerStyle: IndexStyles.headerStyle,
          headerTitle: () => <Logo />
        })}>          
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
          <Tab.Screen name="Settings">
          {props => <SettingsNavigator {...props} toggleDarkMode={toggleDarkMode} handleLogout={handleLogout}/>}
          </Tab.Screen>
      </Tab.Navigator>
    ) : (
      <appStack.Navigator>
        <appStack.Screen name="Login" options={{ headerShown: false }}>
          {(props) => <LoginScreen {...props} onLogin={handleLogin} />}
        </appStack.Screen>
      </appStack.Navigator>
    )}
  </NavigationContainer>
  </UserProvider>
  </ThemeProvider>
  )
}

export default App;