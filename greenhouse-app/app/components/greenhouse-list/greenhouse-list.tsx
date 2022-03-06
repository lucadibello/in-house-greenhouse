import * as React from "react"
import { StyleSheet, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { GreenhouseCard } from ".."
import { FlatList, TouchableWithoutFeedback } from "react-native-gesture-handler"
import { Greenhouse } from "../../models/greenhouse/greenhouse"

export interface GreenhouseListProps {
  greenhouses: Greenhouse[],
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
      nestedScrollEnabled
      style={[props.style, styles.container]}
      data={props.greenhouses}
      renderItem={({ item }) => (
          <TouchableWithoutFeedback onPress={() => props.onGreenhouseClick(item)}>
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
