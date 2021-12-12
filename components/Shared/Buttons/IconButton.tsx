import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import {colors} from '../../Styles/Styles';

interface buttonProps {
    // title?: string,
    /** style object */
    style?: Object,
    /** function executed on press */
    onPress?: ()=> void,
    icon: React.ReactNode,
    /**optional style for icon parent component like margin and backgroundColor */
    iconParentStyle?: Object,
    disabled?: boolean,
    rippleColor?: string,
    /**whether to render circular indicator badge */
    badge?: boolean,
    /**badge background color */
    badgeColor?: string,
    /**background color of icon button */
    backgroundColor?: string,
}

const defaultMargin: number = 2;
export const IconButton: React.FC<buttonProps> = (props: buttonProps) =>  {
    return (
        <Pressable android_ripple={{color: props.rippleColor ? props.rippleColor : colors.disabled}} onPress={props.onPress} style={[props.style ? props.style : styles.defaultBtnStyle, styles.btn, {backgroundColor: props.backgroundColor ? props.backgroundColor : 'transparent'}]} disabled={props.disabled}>
            <View style={props.iconParentStyle ? props.iconParentStyle : styles.defaultIconParentStyle}>
                {props.icon}
                {props.badge ? (
                    <View style = {[styles.badge, {backgroundColor: props.badgeColor ? props.badgeColor : colors.danger}]} />
                ) : (null)}
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    defaultBtnStyle: {
        width: 40,
    },
    btn: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        margin: defaultMargin,
        borderWidth: 1,
        borderColor: colors.medium,
    },
    defaultIconParentStyle: {
        backgroundColor: 'transparent'
    },
    badge: {
        height: 10,
        width: 10,
        borderRadius: 5,
        position: 'absolute',
        left: '65%',
        top: -5
    }
});

export default IconButton;
