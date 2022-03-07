import * as React from "react"
import { StyleSheet, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { GreenhouseCard } from ".."
import { FlatList, TouchableWithoutFeedback } from "react-native-gesture-handler"
import { GreenhouseStore } from "../../models"
import { Greenhouse } from '../../models/greenhouse/greenhouse'
import { clone, detach } from "mobx-state-tree"

export interface GreenhouseListProps {
  store: GreenhouseStore,
  style?: ViewStyle,
  itemsStyle?: ViewStyle,
  onGreenhouseClick?: (greenhouse: Greenhouse) => void
}

/**
 * A simple list of greenhouse cards
 */
export const GreenhouseList = observer(function GreenhouseList(props: GreenhouseListProps) {
  return (
    <FlatList
      style={[props.style, styles.container]}
      data={props.store.greenhouses}
      renderItem={({ item }) => (
          <TouchableWithoutFeedback onPress={() => props.onGreenhouseClick(detach(clone(item))) }>
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
