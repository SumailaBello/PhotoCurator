import React, {FC} from 'react';
import { StyleSheet, Text } from 'react-native';
import {colors} from '../../Styles/Styles';

interface textProps {
    /** title */
    title: string,
    style?: Object,
    /**Number of lines the text can break into */
    lines?: number,
    color?: string,
    /**texts are centered by default e.g auto, left, right, center, justify*/
    textAlign?: any,
}
export const Title: FC<textProps> = props => {
    const title = props.title;
    return (
        <Text style={[props.style ? props.style : styles.defaultTitleStyle, {color: props.color ? props.color : colors.primary, textAlign: props.textAlign ? props.textAlign : 'center'}]} numberOfLines= {props.lines ? props.lines : 1}>{title}</Text>
    );
};
export const SubTitle: FC<textProps> = props => {
    const title = props.title;
    return (
        <Text style={[props.style ? props.style : styles.defaultSubTitleStyle, {color: props.color ? props.color : colors.dark, textAlign: props.textAlign ? props.textAlign : 'center'}]} numberOfLines= {props.lines ? props.lines : 1}>{title}</Text>
    );
};
export const DefaultText: FC<textProps> = props => {
    const title = props.title;
    return (
        <Text style={[props.style ? props.style : styles.defaultTextStyle, {color: props.color ? props.color : colors.dark, textAlign: props.textAlign ? props.textAlign : 'center'}]} numberOfLines= {props.lines ? props.lines : 1}>{title}</Text>
    );
};
export const SmallText: FC<textProps> = props => {
    const title = props.title;
    return (
        <Text style={[props.style ? props.style : styles.smallTextStyle, {color: props.color ? props.color : colors.medium, textAlign: props.textAlign ? props.textAlign : 'left'}]}>{title}</Text>
    );
};
export const ButtonText: FC<textProps> = props => {
    const title = props.title;
    return (
        <Text style={[props.style ? props.style : styles.btnText, {color: props.color ? props.color : colors.medium}]}>{title}</Text>
    );
};
export const HeaderTitle: FC<textProps> = props => {
    const title = props.title;
    return (
        <Text style={[props.style ? props.style : styles.headerTitle, {color: props.color ? props.color : colors.light}]}>{title}</Text>
    );
};

const styles = StyleSheet.create({
    defaultTitleStyle: {
        fontSize: 35,
        fontStyle: 'normal',
    },
    defaultSubTitleStyle: {
        fontSize: 22,
        fontStyle: 'normal',
    },
    smallTextStyle: {
        fontSize: 14,
        fontStyle: 'normal',
    },
    defaultTextStyle: {
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '600',
    },
    btnText: {
        fontStyle: 'normal',
        fontSize: 14,
    },
    headerTitle: {
        fontSize: 18,
        fontStyle: 'normal',
    }
});
