import * as React from "react"
import { StyleSheet, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { GreenhouseCard, GreenhouseCardProps } from ".."
import { FlatList } from "react-native-gesture-handler"

export interface GreenhouseListProps {
  greenhouses?: GreenhouseCardProps[],
  style?: ViewStyle,
  itemsStyle?: ViewStyle
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
      renderItem={({ item }) => {
        return (
          <GreenhouseCard
            key={item.title}
            title={item.title}
            subtitle={item.subtitle}
            status={item.status}
            style={[styles.item, props.itemsStyle]}
          />
        );
      }}
      keyExtractor={(item, index) => index.toString()}
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
