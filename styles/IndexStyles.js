import { StyleSheet, Dimensions } from 'react-native';

//const for size
const { width, height } = Dimensions.get('window');

const IndexStyles = StyleSheet.create({
  //top header styles
  headerStyle: {
    backgroundColor: '#595959',
  },

  //logo display
  logo: {
    width: width * 0.1, 
    height: width * 0.1,
    marginBottom: height * 0.01, //1% of the screen height

    //backgroundColor: 'red',
  },

  //mainlogo display
  mainLogo: {
    width: width * 0.8, // Adjust the percentage according to your design
    height: (width * 0.8 * 632) / 1186, // Maintain aspect ratio
    marginBottom: height * 0.15, //1% of the screen height
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

});

  
export default IndexStyles;