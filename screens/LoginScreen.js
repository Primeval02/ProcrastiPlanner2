import React from "react";
import {View} from 'react-native';

//component imports
import SignUp from "../components/Register.js";
import LogIn from "../components/LogIn.js";

//stylesheet imports
import AccountStyles from "../styles/innerstyles/AccountStyles.js";
import MainLogo from "../components/MainLogo.js";

const LoginScreen = ({ onLogin }) => {
    return(
        <View style={AccountStyles.accountContainer}>
          <MainLogo />
          <LogIn onLogin={onLogin} />
          <SignUp onLogin={onLogin} />          
        </View>
    );
}

export default LoginScreen;