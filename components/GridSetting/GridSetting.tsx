import React, {useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import {DefaultText} from '../Shared/Typography/Typography';
import globalStyles, { colors } from '../Styles/Styles';
import {Button} from '../Shared/Buttons/Button';
import Options from './Options';

const GridSetting = () => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style = {{alignItems: 'flex-start', padding: 20}}>
            <Button title = "Options" icon = {<Feather name="grid" size = {25} color = {colors.primary} />} iconPosition = "left" style = {globalStyles.primaryOutlineBtn} textStyle = {globalStyles.btnText} rippleColor = {colors.medium} onPress = {
                ()=>setModalVisible(!modalVisible)
            } />
            <Options setModalVisible = {setModalVisible} visible = {modalVisible}  />
        </View>
        
        // <TouchableOpacity style = {{flexDirection: 'row', alignItems: 'flex-end', margin: 20}}>
        //     <View style = {{marginRight: 15}}>
        //         <Feather name="grid" size = {25} color />
        //     </View>
        //     <DefaultText title="Grid setting" color={colors.primary} />
        // </TouchableOpacity>
    )
}

export default GridSetting;
