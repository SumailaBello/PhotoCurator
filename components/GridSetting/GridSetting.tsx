import React, {useState} from 'react';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../Styles/Styles';
import Options from './Options';

const GridSetting = () => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <TouchableOpacity style = {{justifyContent: 'center', paddingHorizontal: 20, marginTop: 5}}>
            <Feather name="grid" size = {25} color = {colors.primary} onPress = {()=>setModalVisible(!modalVisible)} />
            <Options setModalVisible = {setModalVisible} visible = {modalVisible}  />
        </TouchableOpacity>
    )
}

export default GridSetting;
