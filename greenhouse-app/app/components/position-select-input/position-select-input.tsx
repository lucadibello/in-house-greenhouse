import * as React from "react"
import { StyleProp, StyleSheet, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { IndexPath, Layout, Select, SelectItem } from "@ui-kitten/components"
import { useStores } from "../../models/root-store/root-store-context"
import { Position } from "../../models/position/position"
import { clone, detach } from "mobx-state-tree"

export interface PositionSelectInputProps {
  style?: StyleProp<ViewStyle>,
  onSelect: (position: Position) => void
  value: Position | null 
}

/**
 * Select input with all available positions for a plant loaded from the DB
 */
export const PositionSelectInput = observer(function (props: PositionSelectInputProps) {
  
  // Load PositionStore
  const { positionStore } = useStores();
  
  // Get all positions
  React.useEffect (() => {
    // Load positions from DB
    positionStore.getPositions();
    // Notify parent the default position used
    if (props.value == null && positionStore.positions.length > 0) {
      props.onSelect(positionStore.positions[0]);
    }
  }, [])
  
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));

  return (
    <Layout style={[styles.container, props.style]} level='1'>
      <Select
        placeholder={'Select a position'}
        value={props.value !== null ? props.value.name : positionStore.positions[selectedIndex.row].name}
        selectedIndex={selectedIndex}
        caption={"Plant position"}
        onSelect={(index: IndexPath) => {
          // Set current index
          setSelectedIndex(index)
          // Notify parent of change
          props.onSelect(detach(clone(positionStore.positions[index.row])))
        }}
      >
        {
          positionStore.positions.map((position: Position) => (
            <SelectItem key={position.type} title={position.name}  />
          ))
        }
      </Select>
    </Layout>
  )
})

const styles = StyleSheet.create({
  container: {
    height: 128,
  },
});

