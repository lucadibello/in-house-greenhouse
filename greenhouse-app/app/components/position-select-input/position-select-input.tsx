import * as React from "react"
import { StyleProp, StyleSheet, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { IndexPath, Layout, Select, SelectItem } from "@ui-kitten/components"
import { useStores } from "../../models/root-store/root-store-context"
import { Position } from "../../models/position/position"

export interface PositionSelectInputProps {
  style?: StyleProp<ViewStyle>,
  onSelect: (position: Position) => void
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
    if (positionStore.positions.length > 0) {
      props.onSelect(positionStore.positions[0]);
    }
  }, [])
  
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  
  return (
    <Layout style={[styles.container, props.style]} level='1'>
      <Select
        selectedIndex={selectedIndex}
        caption={"Plant position"}
        onSelect={(index: IndexPath) => {
          // Set local state index
          setSelectedIndex(index);
          // Return selected position to parent
          props.onSelect(positionStore.positions[index.row]);
        }}>
        {positionStore.positions.map((position: Position, index: number) => (
          <SelectItem key={index} title={position.name}  />
        ))}
      </Select>
    </Layout>
  )
})

const styles = StyleSheet.create({
  container: {
    height: 128,
  },
});

