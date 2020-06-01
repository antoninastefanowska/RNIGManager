import { StyleSheet, Platform, StatusBar } from 'react-native';

const PRIMARY_COLOR = '#59ffee';
const SECONDARY_COLOR = '#242a78';
const LIGHT_COLOR = '#e3fffe';

export const GRADIENT_COLORS = [PRIMARY_COLOR, SECONDARY_COLOR];

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },

    elementContainer: {
        marginTop: 5,
        marginBottom: 5,
        padding: 5,
        backgroundColor: LIGHT_COLOR,
        alignItems: 'center'
    },

    horizontalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center'
    },

    verticalContainer: {
        margin: 2,
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center'
    },

    verticalContainerStretch: {
        flex: 1,
        margin: 2,
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center'
    },

    label: {
        fontSize: 15,
        flex: 1,
        fontWeight: 'bold',
        flexWrap: 'wrap',
        textAlign: 'center',
        margin: 3
    },

    italicLabel: {
        fontSize: 15,
        flex: 1,
        fontStyle: 'italic',
        flexWrap: 'wrap',
        margin: 3
    },

    bigLabel: {
        fontSize: 20,
        padding: 0,
        marginTop: 0,
        marginBottom: 0,
        fontWeight: 'bold',
        marginRight: 5
    },

    smallLabel: {
        fontSize: 12
    },

    input: {
        flex: 1,
        padding: 5,
        fontSize: 17,
        fontWeight: 'bold'
    },

    checkbox: {
        margin: 1
    },

    confirmContainer: {
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }
});