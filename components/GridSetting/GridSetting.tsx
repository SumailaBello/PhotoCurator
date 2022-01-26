import React, {useState} from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../Styles/Styles';
import Options from './Options';
import IconButton from '../Shared/Buttons/IconButton';

const GridSetting = () => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <>
            <IconButton onPress = {()=>setModalVisible(!modalVisible)} icon = {<Feather name="grid" color={colors.medium} size = {17} style={{alignSelf: 'center'}} />} style={styles.gridBtn} >
            </IconButton>
            <Options setModalVisible = {setModalVisible} visible = {modalVisible}  />
        </>
    )
}

const styles = StyleSheet.create({
    gridBtn: {
        width: 40, 
        height: 40, 
        borderRadius: 20, 
        backgroundColor: colors.light, 
        padding: 10,
        marginRight: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
})
export default GridSetting;
