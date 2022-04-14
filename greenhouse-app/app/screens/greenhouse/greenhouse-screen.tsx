import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { cast } from "mobx-state-tree"
import { Alert, GestureResponderEvent, StyleSheet, View } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction } from "@ui-kitten/components"
import { PlantCard } from "../../components"
import { Greenhouse } from "../../models/greenhouse/greenhouse"
import { SafeAreaView } from "react-native-safe-area-context"
import { Plant } from "../../models/plant/plant"
import { useStores } from "../../models"
import { NavigatorParamList } from "../../navigators/components/navigators"
import { FlatList } from "react-native-gesture-handler"

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
        <FlatList
          data={props.greenhouse.plants}
          renderItem={(data) => <PlantCard
            id={data.index}
            style={styles.plantCard}
            plant={cast(data.item)} 
            onEditPress={props.onEditPress}
            onDeletePress={props.onDeletePress}
          />}
        />
      )
    } else {
      // Show module to add a plant to the Greenhouse 
      return (
        <View>
          <Text>Add your first plant! Click the button below</Text>
        </View>
      )
    }
})

export const GreenhouseScreen: FC<StackScreenProps<NavigatorParamList, "greenhouse">> = observer(
  ({navigation}) => {
    // Read params through navigation store
    const { navigationStore, greenhouseStore } = useStores()
    
    // Show greenhouse inforamtion
    return (
      navigationStore.greenhouseScreenParams.greenhouse !== undefined &&
      <SafeAreaView style={[styles.container, styles.notch]}>
        <TopNavigation
          alignment='center'
          title={navigationStore.greenhouseScreenParams.greenhouse.name || ""}
          subtitle='Greenhouse information'
          accessoryLeft={<TopNavigationAction icon={<Icon name='arrow-back'/>} onPress={() => navigation.goBack()} />}
          accessoryRight={<TopNavigationAction icon={<Icon name='plus'/>} onPress={() => {
            // Navigate to screen
            navigation.navigate("addPlant")
          }} />}
        />
        <Divider />

        <Layout style={[styles.container, styles.plantsContainer]}>
          <Text category='h4'>Plants</Text>

          {/* SHOW PLANT FORM */}
          <PlantForm
            onEditPress={(event, source) => {
              // Save greenhouse information into navigation store
              navigationStore.setEditPlantScreenParams(source)
              // navigate to greenhouse screen
              navigation.navigate("editPlant")
            }}

            onDeletePress={(event, source) => {
              // show confirm modal
              Alert.alert(
                "Removing plant",
                "Do you really want to remove this plant from your In-House Greenhouse? It will be moved inside the trash bin",
                [
                  {
                    text: "Confirm",
                    onPress: () => {
                      // Delete plant
                      greenhouseStore.removePlant(source);
                    },
                    style: "default",
                  },
                {
                    text: "Cancel",
                    style: "cancel",
                  },
                ],
                {
                  cancelable: true,
                }
              );

              return false;
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
  
  container: {
    flex: 1
  },
  notch: {
    backgroundColor: notchColor,
  },
  plantCard: {
    margin: 5,
    width: "100%"
  },
  plantsContainer: {
    padding: 5
  },
 
})