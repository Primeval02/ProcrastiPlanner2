import React, { useEffect, useState, useContext } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { launchImageLibrary } from "react-native-image-picker";
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";

import TaskNum from "./innerprofile/TaskNum.js";
import CompletedTasks from "./innerprofile/CompletedTasks.js";

//stylesheet imports
import ProfileStyles from '../styles/ProfileStyles.js';

//dark mode imports
import themeContext from "../styles/darkmodefiles/themeContext";
import theme from "../styles/darkmodefiles/theme";

import UserContext from "../contexts/UserContext.js";

export default function ProfileScreen() {
    //const defaultProfilePic = "https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png";
    const [selectImage, setSelectImage] = useState(null);
    useEffect(() => {
        const fetchProfilePic = async () => {
            try {
                const profilePic = await AsyncStorage.getItem("profilePic");
                if (profilePic) {
                    setSelectImage(JSON.parse(profilePic));
                }
            } catch (error) {
                console.error('Error getting profile pic: ', error);
            }
        };
        fetchProfilePic();
    }, []);

    const clearProfilePic = async () => {
        try {
            await AsyncStorage.removeItem("profilePic");
            setSelectImage(null);
        } catch (error) {
            console.error('Error clearing profile pic: ', error);
        }
    };

    const selectProfilePic = () => {
        const launchPicker = () => {
            const options = {
                title: 'Select Avatar',
                storageOptions: {
                    skipBackup: true,
                    path: 'images',
                },
            };
            launchImageLibrary(options, (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else {
                    const source = { uri: response.assets[0].uri };
                    AsyncStorage.setItem("profilePic", JSON.stringify(source))
                        .then(() => {
                            console.log('Profile pic saved', source);
                            setSelectImage(source);
                            console.log('Select image state', selectImage);
                        })
                        .catch(error => console.error('Error saving pic: ', error));
                }
            });
        };
        if (selectImage) {
            Alert.alert(
                'Change Profile Picture',
                'Are you sure you want to change your profile picture?',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    { text: 'Yes', onPress: launchPicker },
                    { text: 'Remove', onPress: clearProfilePic }
                ],
                { cancelable: false }
            );
        } else {
            launchPicker();
        }
    };

    //fetching data
    const { userData } = useContext(UserContext);
    const [uname, setUname] = useState('');
    //const [userID, setUserID] = useState('');

    const requestBody = {
        "lookup": "true",
        "userId": userData.userId,
        //"username": userData.username, 
    }

    useEffect(() => {
        fetch('https://artemis.cs.csub.edu/~procrastiplanner/Procrastiplanner/sql/endpoint.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
            .then(response => {
                //console.log('Response: ', response)
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                //console.log('Profile Screen: ', data);
                const user = data.user[0];
                const username = user.username;
                setUname(username);
            })
            .catch(error => {
                console.error('Error getting username', error);
            });
    }, [uname]);

    //for dark mode
    const { isDarkMode } = useContext(themeContext);
    const pickTheme = isDarkMode ? theme.dark : theme.light;
    

    return (
        <ScrollView style={{ backgroundColor: pickTheme.background }}>
            <View style={ProfileStyles.profilePicArea}>
                <TouchableOpacity
                    onPress={selectProfilePic}
                    style={[ProfileStyles.profilePic]}>
                    {selectImage ? (
                        <Image
                            style={ProfileStyles.profilePic}
                            source={selectImage}
                        />
                    ) : (
                        <Image
                            source={{
                                uri: "https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png",
                            }}
                            style={ProfileStyles.profilePic}
                        />
                    )}
                </TouchableOpacity>
            </View>
            <View style={ProfileStyles.userN}>
                <Text style={[{ fontWeight: '700' }, { color: pickTheme.color }]}>{`${uname}`}</Text>
            </View>
            <TaskNum />
            <CompletedTasks />
        </ScrollView>
    );
}

/*Notes:
fetch data for profile pic and username/name
*/