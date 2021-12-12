import {StyleSheet, StatusBar, Dimensions} from 'react-native';
// import { color } from 'react-native-reanimated';
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
    badge: {
        backgroundColor: 'rgba(189, 213, 227, 0.72);',
        height: 'auto',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    primaryBtn: {
        backgroundColor: colors.primary,
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
    warningFadeBtn: {
        backgroundColor: colors.warning,
        borderRadius: 10,
        color: colors.light,
        opacity: 0.5,
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
    dangerFadeBtn: {
        backgroundColor: colors.danger,
        borderRadius: 10,
        color: colors.light,
        opacity: 0.5,
    },
    dangerBtn: {
        backgroundColor: colors.danger,
        borderRadius: 10,
        color: colors.light,
    },
    formStyle: {
        margin: 10,
    },
    btnText: {
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
    disabledBtn: {
        backgroundColor: colors.primary,
        borderRadius: 10,
        opacity: 0.5,
    },
    text: {
        fontStyle: 'normal',
        fontSize: 16,
    },
    textMedium: {
        fontWeight: '500',
        fontStyle: 'normal',
    },
    textLarge: {
        // fontWeight: 'bold',
        fontStyle: 'normal',
        fontSize: 25,
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
    imagePlaceHolder: {
        backgroundColor: colors.iconColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    marginTop: {
        marginTop: 10,
    },
    thumbnail: {
        height: 100,
        width: 100,
        borderRadius: 50,
    },
    thumbnailSmall: {
        height: 50,
        width: 50,
        borderRadius: 25,
    },
    defaultCardStyle: {
        paddingLeft: 4,
        borderRadius: 10,
        borderColor: '#B6B3BA',
        borderStyle: 'solid',
        borderWidth: 0.5,
        height: 70,
        width: '100%',
        marginTop: 20,
        flexDirection: 'row',
        elevation: 0.7,
    },
    defaultItemStyle: {
        paddingLeft: 4,
        borderRadius: 10,
        borderColor: '#B6B3BA',
        borderStyle: 'solid',
        height: 70,
        borderWidth: 1,
    },
    defaultItemLabelStyle: {
        color: '#B6B3BA',
        marginLeft: 6,
        fontSize: 15,
        // marginTop: -12,
    },
    tabStyle: {
        backgroundColor: colors.primary,
    },
    activeStyle: {
        backgroundColor: colors.primary,
    },
    tabText: {
        color: colors.light,
        opacity: 0.5,
    },
});

export default globalStyles;
