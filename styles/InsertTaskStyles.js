import { StyleSheet, Dimensions } from 'react-native';

const circleWidth = 50;
const circleHeight = 50;

const { width: screenWidth } = Dimensions.get('window'); //screen width
const percentage = 15; //to multiply by, changes size of touchable opacity (psuedo height)

const InputStyles = StyleSheet.create({

  //insert task styling
  insertTaskButton: {
    alignItems: 'center',
    
    aspectRatio: circleWidth / circleHeight,
    borderRadius: 50,             
    
    backgroundColor: '#055010',
  },
  insertTaskButtonText: {
    fontSize: (screenWidth * percentage) / 100, //coverts to decimal       

    color: 'white', 
  },
  
  //entire container for UserInput
  modalContainer: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',

    //causes darkening of background
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  //main UserInput background
  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',

    width: '60%',
    
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
  },

  //text
  text: {
    color: 'black',
  }, 

  placeholderTextColor: {
    color: 'gray', 
  },

  //text box
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    width: '80%',
    color: 'black',
    marginBottom: 10,
  },

  inputError: {
    borderColor: 'red',
  },

  //entire container for buttons
  buttonContainer: {
    width: '80%',

    justifyContent: 'center',
    alignItems: 'center',
  },

  //button styling
  button: {
    aspectRatio: 5,
    marginHorizontal: 5,
    borderRadius: 5,
    elevation: 3,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: 'red',
  },

  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },

  cancelbuttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },

  loginbuttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gold',
    textAlign: 'center',
  },

  registerbuttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gold',
    textAlign: 'center',
  },
    
  errorText: {
    padding: 5,

    alignItems: 'center',
    justifyContent: 'center',

    textAlign: 'center',

    //backgroundColor: 'yellow',
    color: 'red',
  },

  // tab container
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 10,
  },

  // tab style
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#055010',
  },

  activeTab: {
    backgroundColor: '#055010',
  },

  tabText: {
    color: 'white',
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});

export default InputStyles;