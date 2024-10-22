import { StyleSheet } from 'react-native';

const currentDayContainerMutual = {
  alignItems: 'center',
  justifyContent: 'center',

  width: '100%',
  height: '4%',

  borderBottomWidth: 1,
  borderBottomColor: 'black',

  //backgroundColor: 'yellow', 
  color: 'black',
};

const emptyViewContainerMutual = {
  flex: 1,
  flexDirection: 'row',
    
  alignItems: 'center',
  justifyContent: 'center',

  //backgroundColor: 'orange',
};

const verticalContentContainerMutual = {
  flex: 1,
  flexDirection: 'column',

  alignItems: 'flex-end',
  justifyContent: 'center',

  //backgroundColor: 'purple',
};

const HomeScreenStyles = StyleSheet.create({
  //start of (entire) container
  container: {
    flex: 1,
    flexDirection: 'column',

    alignItems: 'center',
    justifyContent: 'center',

    //backgroundColor: 'lightblue',
  },
  //current day container
  currentDayContainer: currentDayContainerMutual,
  //current day container (keyboard)
  currentDayContainerKeyboard: currentDayContainerMutual, 
  //current day
  currentDay: {
    color: 'black',
    fontWeight: 'bold',
  },  
  //start of content (used for extra styling)
  verticalContentContainer: verticalContentContainerMutual,
  //start of content (used for extra styling)
  verticalContentContainerKeyboard: verticalContentContainerMutual,

  //horizontal row to order components (think sandwich)
  //[timeSlot, squareGenerator]
  rowContainer: {
    flex: 4,
    flexDirection: 'row', //DONT CHANGE 

    alignItems: 'flex-start',
    justifyContent: 'center',

    borderBottomWidth: 1,
    borderBottomColor: 'black', 
  },
  
  //emptyView container
  emptyViewContainer: emptyViewContainerMutual,
  //emptyView container (keyboard)
  emptyViewContainerKeyboard: emptyViewContainerMutual,
  //emptyView text
  emptyViewText: {
    textAlign: 'center',
    color: 'black',
  },
  //square container
  squareViewContainer: {
    flex: 4,
    flexDirection: 'column',
  },
  //insert container
  insertTaskContainer: {
    padding: 10,

    alignItems: 'center',
    justifyContent: 'center'
  
  },  
  
});

export default HomeScreenStyles;