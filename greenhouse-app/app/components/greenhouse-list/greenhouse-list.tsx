import * as React from "react"
import { StyleSheet, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { GreenhouseCard } from ".."
import { FlatList, TouchableWithoutFeedback } from "react-native-gesture-handler"
import { Greenhouse } from "../../models/greenhouse/greenhouse"
import { useStores } from "../../models"

export interface GreenhouseListProps {
  greenhouses: Greenhouse[],
  style?: ViewStyle,
  itemsStyle?: ViewStyle,
  onGreenhouseClick?: () => void
}

/**
 * A simple list of greenhouse cards
 */
export const GreenhouseList = observer(function GreenhouseList(props: GreenhouseListProps) {
  // Import state
  const { navigationStore } = useStores()

  return (
    <FlatList
      style={[props.style, styles.container]}
      data={props.greenhouses}
      renderItem={({ item }) => (
          <TouchableWithoutFeedback onPress={() => {
            // set prop
            navigationStore.setGreenhouseScreenProps(item)
            // call callback
            props.onGreenhouseClick()
          }}>
            <GreenhouseCard
              key={item.id}
              greenhouse={item}
              isOkay={item.isOkay}
              style={[styles.item, props.itemsStyle]}
            />
          </TouchableWithoutFeedback>
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    marginVertical: 4,
  },
})
