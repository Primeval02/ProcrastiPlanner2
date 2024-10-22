import React, { useState, useContext, useEffect } from "react";
import { View, Text } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";

//stylesheet imports
import SettingsStyles from "../../styles/SettingsStyles";

//dark mode imports
import {Switch} from 'react-native-switch'
import themeContext from "../../styles/darkmodefiles/themeContext";
import { SafeAreaView } from "react-native-safe-area-context";
import theme from "../../styles/darkmodefiles/theme";

const Display = ({ navigation }) => {
    /*const theme = useContext(themeContext);
    const [mode, setMode] = useState(false);*/
    const { isDarkMode, toggleDarkMode } = useContext(themeContext);
    const pickTheme = isDarkMode ? theme.dark : theme.light;

    return (
        //<View style={[{ flex: 1, alignItems: 'center', justifyContent: 'center' }, {backgroundColor: theme.background}]}>
        <SafeAreaView style={[SettingsStyles.safeAreaContainer, { backgroundColor: pickTheme.background }]}>
            <View style={SettingsStyles.displayContents}>
                <Text style={[SettingsStyles.displayText, { color: pickTheme.color }]}>Dark Mode</Text>
                <Switch
                    value={isDarkMode}
                    //trackColor={{ false: "red", true: "blue" }}
                    activeText="On"
                    inActiveText="Off"
                    backgroundActive="#055010"
                    backgroundInactive="gray"
                    onValueChange={toggleDarkMode}
                //onValueChange={(value) => {
                /*setMode(value);
                EventRegister.emit("changeTheme", value);
            }}*/
                />
            </View>
        </SafeAreaView>
        //</View>
    );
}

export default Display;