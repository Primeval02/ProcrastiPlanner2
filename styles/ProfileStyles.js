import { StyleSheet } from 'react-native';

const ProfileStyles = StyleSheet.create({
  userN: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 1, 
    borderColor: '#055010',
  },
  profilePicArea: {
    alignItems: 'center',
    marginTop: 20,
  },

  
  //Appearance of squares
  inProgressTaskDetail: {
    backgroundColor: '#055010',
    width: 120,
    height: 120,
    borderRadius: 10,
    //paddingTop: 2,
    paddingLeft: 2,
    paddingRight: 2,
    marginTop: 15,
    marginLeft: 5,
    marginBottom: 15,
    marginRight: 'auto',
  },
  completedTaskDetail: {
    backgroundColor: '#055010',
    width: 120,
    height: 120,
    borderRadius: 10,
    //paddingTop: 10,
    paddingLeft: 2,
    paddingRight: 2,
    marginTop: 15,
    marginRight: 5,
    marginBottom: 15,
    marginLeft: 'auto',
  },
//Value is num, text is "tasks..."
  inProgressValue: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '900',
    paddingBottom: 5,
    paddingTop: 15,
    fontSize: 20,
  },
  inProgressText: {
    color: 'white',
    fontWeight: '800',
    textAlign: 'center',
  },
  completedValue: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '900',
    paddingBottom: 5,
    paddingTop: 15,
    fontSize: 20,
  },
  completedText: {
    fontWeight: '800',
    color: 'white',
    textAlign: 'center',
  },

  taskDetail: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  tasks: {
    flexDirection: 'row',
    //justifyContent: 'space-between',
    //marginLeft: 40,
    //marginRight: 40,
    alignItems: 'center',
    //marginTop: 10,
    //marginLeft: 'auto',
    //marginRight: 'auto',
  },


//entire box for list of completed tasks
  completedList: {
    backgroundColor: '#055010',
    //width: 310,
    height: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
    padding: 10,
  },
  completedListHeader: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '900',
    letterSpacing: 0.4,
  },


//for table
  tHeader: {
    backgroundColor: '#055010',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  tTitle: {
    color: 'white',
    fontWeight: '800',
    fontSize: 15,
  },
  tRow: {
    marginRight: 'auto',
    marginLeft: 'auto',
    borderBottomColor: 'black',
  },
  tCell: {
    color: 'black',
    paddingRight: 20,
    fontWeight: '500',
  }
  });

 export default ProfileStyles;
