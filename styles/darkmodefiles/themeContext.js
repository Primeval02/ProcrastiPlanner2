import React, {createContext, useEffect, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

//const themeContext = createContext({});
const themeContext = createContext();

export const ThemeProvider = ({children}) => {
    /*const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };*/

    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const DarkModeState = async () => {
            try {
                const darkModeState = await AsyncStorage.getItem('darkMode');
                if (darkModeState !== null) {
                    setIsDarkMode(JSON.parse(darkModeState));
                }
            } catch (error) {
                console.error("Error loading dark mode state:", error);
            }
        };

        DarkModeState();
    }, []);

    const toggleDarkMode = async () => {
        try {
            // Save dark mode state to AsyncStorage
            await AsyncStorage.setItem('darkMode', JSON.stringify(!isDarkMode));
            setIsDarkMode(prevMode => !prevMode);
        } catch (error) {
            console.error("Error setting dark mode state:", error);
        }
    };

    return (
        <themeContext.Provider value={{ isDarkMode, toggleDarkMode}}>
            {children}
        </themeContext.Provider>
    );
};

export default themeContext;