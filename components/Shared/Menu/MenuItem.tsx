import React, {FC} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import globalStyles, {colors} from '../../Styles/Styles';

interface Props {
    /** title */
    title: string,
    style?: Object,
    /**Number of lines the text can break into */
    lines?: number,
    icon?: React.ReactNode,
    color?: any,
    onPress?: ()=> void,
}
export const Item: FC<Props> = props => {
    const title = props.title;
    return (
        // <Text style={[props.style ? props.style : styles.defaultTitleStyle]}>{title}</Text>
        <TouchableOpacity style = {[styles.itemParent, props.style ? props.style : null]} onPress = {props.onPress}>
            {props.icon} 
            <Text style={[styles.defaultNoteStyle, {color: props.color ? props.color : styles.defaultColor}]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    itemParent: {
        flexDirection: 'row',
        padding: 3,
        borderRadius: 12,
    },
    defaultNoteStyle: {
        fontSize: 16,
        fontWeight: '500',
        fontStyle: 'normal',
        textAlign: 'center',
        marginLeft: 25,
    },
    defaultColor: {
        color: colors.medium,
    }
})
