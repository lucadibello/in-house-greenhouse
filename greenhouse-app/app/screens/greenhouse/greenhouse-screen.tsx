import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { cast } from "mobx-state-tree"
import { StyleSheet, View } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Layout, List, Text } from "@ui-kitten/components"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { PlantCard } from "../../components"
import { Greenhouse } from "../../models/greenhouse/greenhouse"
import { SwipeListView } from 'react-native-swipe-list-view';

const PlantForm = (props: {greenhouse: Greenhouse}) => {
  // Set flag
  const isEmpty = props.greenhouse.plants.length !== 0

  // Conditional rendering
  if (isEmpty) {
    return (
      <SwipeListView
        useFlatList={true}
        data={props.greenhouse.plants}
        renderItem={({item}) => <PlantCard plant={cast(item)} />}
        renderHiddenItem={ (data, rowMap) => (
          <View style={styles.rowBack}>
              <Text>Left</Text>
              <Text>Right</Text>
          </View>
        )}
        leftOpenValue={75}
        rightOpenValue={-75}
      />
    )
  } else {
    return (
      <Text>Yolo</Text>
    )
  }
}

export const GreenhouseScreen: FC<StackScreenProps<NavigatorParamList, "greenhouse">> = observer(function GreenhouseScreen() {
  // Load navigation via hook
  const navigation = useNavigation()
  // Read route params
  const route = useRoute<RouteProp<NavigatorParamList, 'greenhouse'>>();
  React.useEffect(() => {
    navigation.setOptions({
      title: route.params.details.name
    })
  }, [])

  

  // Show greenhouse inforamtion
  return (
    <Layout style={styles.container}>
      <Text category='h2'>{route.params.details.name}, ID: {route.params.details.id}</Text>
      <Text>{route.params.details.plants.map(plant => plant.name)}</Text>
      
      {/* SHOW PLANT FORM */}
      <PlantForm greenhouse={route.params.details} />
    </Layout>
  )
})

const deleteColor = 'red'
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: deleteColor,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
})