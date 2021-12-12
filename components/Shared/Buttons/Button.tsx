import React, { Component } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import {colors} from '../../Styles/Styles';
import {ButtonText } from '../Typography/Typography';

interface buttonProps {
    /** title string */
    title: string,
    /** style object */
    style: Object,
    /** function executed on press */
    onPress?: ()=> void,
    icon?: React.ReactNode,
    /**icon position whether left or right */
    iconPosition?: string,
    /**optional style for icon parent component like margin and backgroundColor */
    iconStyle?: Object,
    disabled?: boolean,
    /**style of button text */
    textStyle?: Object,
    rippleColor?: string,
    /** color of button text to override default color */
    textColor?: string,
    /**vertical padding value to control button height */
    verticalPadding?: number,
    /**control horizontal padding value */
    horizontalPadding?: number,
}

const defaultMargin: number = 2;
export class Button extends Component<buttonProps> {
    constructor(props: buttonProps) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props);
    }
    render() {
        return (
            <Pressable android_ripple={{color: this.props.rippleColor ? this.props.rippleColor : colors.light}} onPress={this.props.onPress} 
            style={[this.props.style, styles.btn, {paddingVertical: this.props.verticalPadding ? this.props.verticalPadding : 10, paddingHorizontal: this.props.horizontalPadding ? this.props.horizontalPadding : 10}]} 
            disabled={this.props.disabled}>
                {this.props.icon && this.props.iconPosition === 'left' ? (
                    /**default icon style passed in when none is provided as a prop */
                    <View style={this.props.iconStyle ? this.props.iconStyle : {margin: defaultMargin}}>
                        {this.props.icon}
                    </View>
                ) : (null)}
                {/* <Text style={[this.props.textStyle, {color: this.props.textColor ? this.props.textColor : colors.dark}]}>{this.props.title}</Text> */}
                    <ButtonText title={this.props.title} color = {this.props.textColor ? this.props.textColor : colors.dark} style={this.props.textStyle ? this.props.textStyle : undefined} />
                {this.props.icon && !this.props.iconPosition ? (
                    /**default icon style passed in when none is provided as a prop */
                    <View style={this.props.iconStyle ? this.props.iconStyle : {margin: defaultMargin}}>
                        {this.props.icon}
                    </View>
                ) : (null)}
                {this.props.icon && this.props.iconPosition === 'right' ? (
                    /**default icon style passed in when none is provided as a prop */
                    <View style={this.props.iconStyle ? this.props.iconStyle : {margin: defaultMargin}}>
                        {this.props.icon}
                    </View>
                ) : (null)}
            </Pressable>
        );
    }
}

const styles = StyleSheet.create({
    btn: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
});

export default Button;
