import React from 'react';
import { Image, View } from 'react-native';

//imports
import IndexStyles from '../styles/IndexStyles';

const MainLogo = () => {
  return (
    <View>
      <Image
        style={IndexStyles.mainLogo}
        source={require('../images/ProcrastiPlanner.png')}
      />
    </View>
  );
};

export default MainLogo;

