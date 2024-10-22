import { StyleSheet } from 'react-native';

const SquareStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'baseline',
    alignItems: 'baseline',
  },
  startTimeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Square styling for assignments
  assignmentSquare: {
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 0.5,
    borderTopColor: 'black',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    aspectRatio: 4,
    backgroundColor: '#055010',
  },
  // Square styling for events
  eventSquare: {
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 0.5,
    borderTopColor: 'black',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    aspectRatio: 4,
    backgroundColor: '#8b0000', // Example color for events
  },
  squareTitleText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  squareText: {
    color: 'white',
  },
  separator: {
    height: 2,
    backgroundColor: 'black',
  },
});

export default SquareStyles;
