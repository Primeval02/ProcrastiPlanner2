import { StyleSheet, Dimensions } from 'react-native';

const circleWidth = 50;
const circleHeight = 50;

const { width: screenWidth } = Dimensions.get('window'); //screen width
const percentage = 15; //to multiply by, changes size of touchable opacity (psuedo height)

const RegenStyles = StyleSheet.create({

  //regen styling
  regenButton: {
    alignItems: 'center',
    
    aspectRatio: circleWidth / circleHeight,
    borderRadius: 50,             
    
    backgroundColor: '#055010',
  },
  regenButtonText: {
    fontSize: (screenWidth * percentage) / 100, //coverts to decimal       

    color: 'white', 
  },
  
  //entire container for buttons
  buttonContainer: {
    width: '80%',

    justifyContent: 'center',
    alignItems: 'center',
  },

});

export default RegenStyles;