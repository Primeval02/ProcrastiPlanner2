import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//main setting screen
import SettingsScreen from "../SettingsScreen";

//page nav imports
import Account from "./Account";
import Display from "./Display";

const Stack = createStackNavigator();

export default function SettingsNavigator({ handleLogout }) {
    return (
        <Stack.Navigator
            screenOptions={{
                headerBackTitleVisible: false,
                headerTitle: '',
                headerTransparent: true,
            }}>

        {/* settings stack */}
         <Stack.Screen 
                name="SettingsScreen" 
                options={{ headerShown: false }} 
            >
                {props => <SettingsScreen {...props} handleLogout={handleLogout} />}
            </Stack.Screen>
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen name="Display" component={Display} />
        </Stack.Navigator>
    );
}