import * as React from "react"
import { StyleSheet, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { GreenhouseCard, GreenhouseCardProps, GreenhouseInformation } from ".."
import { FlatList, TouchableWithoutFeedback } from "react-native-gesture-handler"

export interface GreenhouseListProps {
  greenhouses?: GreenhouseCardProps[],
  style?: ViewStyle,
  itemsStyle?: ViewStyle,
  onGreenhouseClick?: (greenhouse: GreenhouseInformation) => void
}

/**
 * Describe your component here
 */
export const GreenhouseList = observer(function GreenhouseList(props: GreenhouseListProps) {
  return (
    <FlatList
      nestedScrollEnabled
      style={[props.style, styles.container]}
      data={props.greenhouses}
      renderItem={({ item }) => (
          <TouchableWithoutFeedback onPress={() => props.onGreenhouseClick({id: item.id, title: item.title, subtitle: item.subtitle})}>
            <GreenhouseCard
              key={item.id}
              id={item.id}
              title={item.title}
              subtitle={item.subtitle}
              status={item.status}
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
