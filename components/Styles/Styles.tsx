import {StyleSheet, StatusBar, Dimensions} from 'react-native';
export const screenHeight = Dimensions.get("window").height;
export const screenWidth = Dimensions.get("window").width;

export const colors = {
    primary: '#063755',
    primaryFade: '#EFF3FE',
    danger: '#FF0000',
    dangerFade: '#FFF3F4',
    success: '#00DF53',
    successFade: '#F1FFF8',
    successIconBackground: '#D7FFEC',
    warning: '#FFC401',
    warningFade: 'rgba(250, 195, 8, 0.2)',
    secondary: '#30417B',
    light: '#FFFFFF',
    disabled: '#AFAFAF',
    // medium: 'rgba(0, 0, 0, 0.21)',
    medium: '#7A7A7A',
    mediumFade: '#F4F4F4',
    iconColor: '#DCDCDC',
    dark: '#000000',
};

const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight * 2 : StatusBar.currentHeight,
        // height: screenHeight,
        // width: screenWidth,
    },
    content: {
        padding: 10,
    },
    card: {
        borderRadius: 8,
        backgroundColor: colors.warning,
        padding: 10,
        flex: 1,
    },
    listItem: {
        backgroundColor: colors.primaryFade,
        height: 'auto',
        borderRadius: 8,
        padding: 20,
        flexDirection: 'row',
        marginVertical: 10
    },
    primaryBtn: {
        backgroundColor: colors.primary,
        borderRadius: 10,
        color: colors.light,
    },
    dangerBtn: {
        backgroundColor: colors.danger,
        borderRadius: 10,
        color: colors.light,
    },
    lightBtn: {
        backgroundColor: colors.light,
        borderRadius: 10,
        color: colors.primary,
    },
    warningBtn: {
        backgroundColor: colors.warning,
        borderRadius: 10,
        color: colors.light,
    },
    iconBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconBtnLg: {
        width: 60,
        height: 60,
        borderRadius: 30,
        // marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        fontFamily: 'Montserrat-SemiBold',
        fontStyle: 'normal',
        // fontWeight: '600',
        fontSize: 16,
    },
    fullWidth: {
        width: '100%',
    },
    primaryOutlineBtn: {
        backgroundColor: colors.light,
        borderColor: colors.primary,
        borderWidth: 1,
        borderRadius: 10,
        color: colors.light,
    },
    dangerOutlineBtn: {
        backgroundColor: colors.light,
        borderColor: colors.danger,
        borderWidth: 1,
        borderRadius: 10,
        // color: colors.light,
    },
    text: {
        fontFamily: 'Montserrat-Regular',
        fontStyle: 'normal',
        fontSize: 16,
    },
    textPrimary: {
        color: colors.primary,
    },
    textDanger: {
        color: colors.danger,
    },
    textWarning: {
        color: colors.warning,
        // fontFamily:
    },
});

export default globalStyles;
