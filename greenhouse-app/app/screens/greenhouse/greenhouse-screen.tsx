import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { cast } from "mobx-state-tree"
import { Alert, GestureResponderEvent, StyleSheet, TouchableOpacity, View } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction } from "@ui-kitten/components"
import { PlantCard } from "../../components"
import { Greenhouse } from "../../models/greenhouse/greenhouse"
import { SwipeListView } from 'react-native-swipe-list-view';
import { SafeAreaView } from "react-native-safe-area-context"
import { Plant } from "../../models/plant/plant"
import { useStores } from "../../models"

interface PlantFormProps {
  greenhouse: Greenhouse,
  onEditPress: (event: GestureResponderEvent, source: Plant) => void,
  onDeletePress: (event: GestureResponderEvent, source: Plant) => void
}

const PlantForm = observer(
  (props: PlantFormProps) => {
    // Set flag
    const isEmpty = props.greenhouse.plants.length !== 0
  
    // Conditional rendering
    if (isEmpty) {
      return (
        <SwipeListView
          useFlatList={true}
          closeOnScroll={true}
          disableRightSwipe={true}
  
          leftOpenValue={75}
          rightOpenValue={-150}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          
          data={props.greenhouse.plants}
          renderItem={({item}) => <PlantCard plant={cast(item)} />}
          renderHiddenItem={ (data) => (
            <View style={styles.rowBack}>
              {/* EDIT PLANT INFORMATION */}
              <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={(event) => props.onEditPress(event, cast(data.item))}>
                  <Icon style={styles.icon} fill='#000' name="edit-2-outline" />
                  <Text style={styles.textBold}>EDIT</Text>
              </TouchableOpacity>
  
              {/* REMOVE PLANT */}
              <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={(event) => props.onDeletePress(event, cast(data.item))}>
                  <Icon style={styles.icon} fill='#FFF' name="trash-2-outline" />
                  <Text style={[styles.textBold, styles.textWhite]}>REMOVE</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )
    } else {
      return (
        <Text>Yolo</Text>
      )
    }
})

export const GreenhouseScreen: FC<StackScreenProps<NavigatorParamList, "greenhouse">> = observer(
  ({navigation}) => {
    // Read params through navigation store
    const { navigationStore } = useStores()
    
    console.tron.warn(navigationStore.greenhouseScreenParams)
    // Show greenhouse inforamtion
    return (
      navigationStore.greenhouseScreenParams.greenhouse !== undefined &&
      <SafeAreaView style={[styles.container, styles.notch]}>
        <TopNavigation
          alignment='center'
          title={navigationStore.greenhouseScreenParams.greenhouse.name || ""}
          subtitle='Greenhouse information'
          accessoryLeft={<TopNavigationAction icon={<Icon name='arrow-back'/>} onPress={() => navigation.goBack()} />}
        />
        <Divider />

        <Layout style={styles.container}>
          {/* SHOW PLANT FORM */}
          <PlantForm
            onEditPress={(event, source) => {
              // Save greenhouse information into navigation store
              navigationStore.setEditPlantScreenParams(source)
              // navigate to greenhouse screen
              navigation.navigate("editPlant")
            }}

            onDeletePress={(event, source) => {
              Alert.alert("WORK IN PROGRESS")
            }}
            greenhouse={navigationStore.greenhouseScreenParams.greenhouse}
          />
        </Layout>
      </SafeAreaView>
    )
  }
)

const editColor = '#F4D35E'
const deleteColor = '#DA4167'
const white = "#FFF"
const notchColor = '#FFF'
const styles = StyleSheet.create({
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
      backgroundColor: editColor,
      right: 75,
  },
  backRightBtnRight: {
      backgroundColor: deleteColor,
      right: 0,
  },
  container: {
    flex: 1
  },
  icon: {
    height: 32,
    marginBottom: 5,
    width: 32
  },
  notch: {
    backgroundColor: notchColor,
  },
  rowBack: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  textBold: {
    fontWeight: 'bold',
  },
  textWhite: {
    color: white
  },
})