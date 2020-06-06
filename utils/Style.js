import { StyleSheet, Platform, StatusBar } from 'react-native';

export const ORANGE = '#F58529';
export const YELLOW = '#FEDA77';
export const PINK = '#DD2A7B';
export const PURPLE = '#8134AF';
export const BLUE = '#515BD4';

const LIGHT_COLOR = '#FAFAFA';
const FACEBOOK_BLUE = '#3B5998';

export const ICON_SIZE = 40;
export const BIG_ICON_SIZE = 50;
export const GRADIENT_COLORS = [ORANGE, YELLOW, PINK, PURPLE, BLUE];

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },

    loginContainer: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: FACEBOOK_BLUE
    },

    loginSubContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    elementContainer: {
        marginTop: 8,
        marginBottom: 8,
        backgroundColor: LIGHT_COLOR,
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5},
        shadowOpacity: 1,
        shadowRadius: 8
    },

    postContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        minHeight: 150
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
        flexWrap: 'wrap',
        textAlign: 'center',
        margin: 3
    },

    leftLabel: {
        fontSize: 15,
        flex: 1,
        flexWrap: 'wrap',
        margin: 3
    },

    italicLabel: {
        fontSize: 15,
        flex: 1,
        fontStyle: 'italic',
        flexWrap: 'wrap',
        textAlign: 'center',
        margin: 3
    },

    bigLabel: {
        fontSize: 20,
        padding: 0,
        marginTop: 0,
        marginBottom: 0,
        fontWeight: 'bold',
    },

    bigWhiteLabel: {
        fontSize: 20,
        padding: 0,
        marginTop: 0,
        marginBottom: 0,
        fontWeight: 'bold',
        color: '#fff',
        marginRight: 5
    },

    largeWhiteLabel: {
        fontSize: 30,
        padding: 0,
        marginTop: 0,
        marginBottom: 0,
        fontWeight: 'bold',
        color: '#fff',
        marginRight: 10
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

    buttonContainer: {
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },

    loginButtonContainer: {
        marginBottom: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },

    icon: {
        alignSelf: 'center',
        marginRight: 10
    },

    whiteIcon: {
        color: '#fff',
        alignSelf: 'center'
    },

    placeholder: {
        color: BLUE,
        alignSelf: 'center',
        marginLeft: 10
    },

    progressBarContainer: {
        flex: 1,
        flexDirection: 'row'
    },

    progressBar: {
        alignSelf: 'stretch'
    },

    captionLabel: {
        fontSize: 15,
        flex: 1,
        flexWrap: 'wrap',
        textAlign: 'center',
        margin: 10
    },
});