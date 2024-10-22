import React, { useContext } from "react";
import { View, Text, ScrollView, TouchableOpacity} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

//page nav imports
import Account from "./innersettings/Account";
import Display from "./innersettings/Display";

//stylesheet imports
import SettingsStyles from '../styles/SettingsStyles.js';

//dark mode imports
import themeContext from "../styles/darkmodefiles/themeContext";
import theme from "../styles/darkmodefiles/theme";

import UserContext from "../contexts/UserContext";


//settings stack
export default function SettingsScreen({ navigation, handleLogout }) {
    const {isDarkMode} = useContext(themeContext);
    const pickTheme = isDarkMode ? theme.dark : theme.light;

    const { userData } = useContext(UserContext);

    const handleLogoutProperty = () => {
      const requestBody = {
        "logout": true,
        "userId": userData.userId,
      };

      fetch('https://artemis.cs.csub.edu/~procrastiplanner/Procrastiplanner/sql/endpoint.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })
      .then(response => {
        console.log('Response: ', response)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('LOGOUT DATA:', data);
        console.log('LOGOUT DATA:', userData.userId);
        clearProfilePic();
        handleLogout();        
      })
      .catch(error => {
        console.error('Error:', error);
      });           
    }

    const clearProfilePic = async () => {
        try {
            await AsyncStorage.removeItem("profilePic");
        } catch (error) {
            console.error('Error clearing profile pic: ', error);
        }
    };

    return (
        <SafeAreaView style={[SettingsStyles.safeAreaContainer, { backgroundColor: pickTheme.background}]}>
            <ScrollView contentContainerStyle={SettingsStyles.container}>
                <View style={SettingsStyles.header}>
                    <Text style={[SettingsStyles.title, {color: pickTheme.color}]}>Settings</Text>
                </View>

                <View style={SettingsStyles.section}>
                    <View style={SettingsStyles.sectionHeader}>
                        <TouchableOpacity onPress={() => navigation.navigate(Account)}>
                            <Text style={[SettingsStyles.sectionHeaderText, {color: pickTheme.color}]}>Account</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={SettingsStyles.sectionHeader}>
                        <TouchableOpacity onPress={() => navigation.navigate(Display)}>
                            <Text style={[SettingsStyles.sectionHeaderText, {color: pickTheme.color}]}>Display</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={SettingsStyles.sectionHeader}>                        
                        <TouchableOpacity onPress={handleLogoutProperty}>
                            <Text style={[SettingsStyles.sectionHeaderText, {color: pickTheme.color}]}>Log out</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

/*IGNORE code below, code from video I watched lol*/

/*const Sections = [
    {
        header: 'Account',
        items: [
            {id: 'name', label: 'Name', type: 'select'},
            {id: 'email', label: 'Email', type: 'select'},
            {id: 'changepwd', label: 'Change Password', type: 'select'}
        ],
    },
    {
        header: 'Display',
        items: [
            {id: 'themes', label: 'Themes', type: 'select'},
            {id: 'fonts', label: 'Fonts', type: 'select'},
        ],
    },
    {
        header: 'Notification',
        items: [
            {id: 'type', label: 'Type', type: 'select'},
            {id: 'badge', label: 'Badge', type: 'select'},
        ],
    },
];

export default function SettingsScreen() {
    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Settings</Text>
                </View>

                {Sections.map(({header, items}) => (
                    <View style={styles.section} key={header}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionHeaderText}>{header}</Text>
                        </View>

                        <View style={styles.sectionBody}>
                            {items.map(({label, id, type}, index) => (
                                <View 
                                    style={[
                                    styles.rowWrapper, 
                                    index === 0 && {borderTopWidth: 0},
                                    ]} 
                                    key={id}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            //handle
                                        }}>
                                        <View style={styles.row}>
                                            <Text style={styles.rowLabel}>{label}</Text>
                                            <View style={styles.rowSpacer} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}; */