// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Modal, TouchableOpacity, StatusBar } from 'react-native';
import {DefaultText, SmallText} from '../Shared/Typography/Typography';
import Button from '../Shared/Buttons/Button';
import globalStyles, { colors } from '../Styles/Styles';
import { Feather } from '@expo/vector-icons';
import { observer, inject } from "mobx-react";

interface Props {
    visible: boolean;
    setModalVisible: (state: boolean)=> void;
    store?: any;
}
const Options: React.FC<Props> = inject('store')(observer((props: Props) => {

    return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={props.visible}
        onRequestClose={() => {
          props.setModalVisible(!props.visible);
        }}
        presentationStyle='overFullScreen'
        style = {{backgroundColor: 'black'}}
         >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <SmallText title = "Options" />
                    <TouchableOpacity 
                        onPress = {()=> { 
                                props.store.setNumColumns(2)
                                props.setModalVisible(false)
                            }
                        } 
                        style = {{padding: 10, flexDirection: 'row', width: '100%'}}>
                        <View style = {{justifyContent: 'center', marginRight: 5}}>
                            <Feather name="circle" />
                        </View>
                        <DefaultText title = "X2" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                            onPress = {()=> { 
                                props.store.setNumColumns(3)
                                props.setModalVisible(false)
                            }
                        } 
                        style = {{padding: 10, flexDirection: 'row', width: '100%'}}>
                        <View style = {{justifyContent: 'center', marginRight: 5}}>
                            <Feather name="circle" />
                        </View>
                        <DefaultText title = "X3" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                            onPress = {()=> { 
                                props.store.setNumColumns(4)
                                props.setModalVisible(false)
                            }
                        }  
                        style = {{padding: 10, flexDirection: 'row', width: '100%'}}>
                        <View style = {{justifyContent: 'center', marginRight: 5}}>
                            <Feather name="circle" />
                        </View>
                        <DefaultText title = "X4" />
                    </TouchableOpacity>
                    <View style = {{alignSelf: 'flex-end'}}>
                        <Button title="Cancel" onPress = {()=> props.setModalVisible(false)} style = {globalStyles.dangerBtn} textColor = {colors.light} />
                    </View>
                </View>
            </View>
        </Modal>
    )
}))

export default Options;

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
    //   alignItems: "center",
      marginTop: StatusBar.currentHeight ? -StatusBar.currentHeight : -50,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    //   position: 'absolute'
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      paddingHorizontal: 35,
      paddingVertical: 20,
      alignItems: "flex-start",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });
