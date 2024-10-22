import { StyleSheet } from 'react-native';

const SettingsStyles = StyleSheet.create({
   safeAreaContainer: {
      flex: 1,
    }, 
    container: {
        paddingVertical: 1,
    },
    header: {
        paddingHorizontal: 24,
        marginBottom: 12,
    },
    title: {
        fontSize: 38,
        fontWeight: '700',
        color: '#1d1d1d',
        marginBottom: 6,
    },
    section: {
        paddingTop: 12,
    },
    sectionHeader: {
        paddingHorizontal: 24,
        paddingVertical: 8,
    },
    sectionHeaderText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#081e93',
        textTransform: 'uppercase',
        letterSpacing: 1.2,
    },
    rowWrapper: {
        paddingLeft: 24,
        borderTopWidth: 1,
        borderColor: '#e3e3e3',
        backgroundColor: '#fff',
    },
    row: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingRight: 24,
    },
    rowLabel: {
        fontSize: 17,
        fontWeight: '500',
        color: '#000',
    },
    rowSpacer: {
        flex: 1,
    },
    rowValue: {
        fontSize: 17,
        color: '#616161',
        marginRight: 4,
    },
    // for display page
    displayContents: {
        marginTop: 15,
        marginLeft: 25,
    },
    displayText: {
        fontSize: 25,
    },
  });

 export default SettingsStyles
