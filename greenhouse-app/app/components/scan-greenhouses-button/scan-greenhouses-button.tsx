import * as React from "react"
import { ViewStyle, StyleSheet, GestureResponderEvent } from "react-native"
import { Button, Layout, Icon } from "@ui-kitten/components"

export interface ScanGreenhousesButtonProps {
  onClick?: (event: GestureResponderEvent) => void,
  style?: ViewStyle
}

export const ScanGreenhousesButton = (props: ScanGreenhousesButtonProps) => {
  return (
    <Layout>
      <Button
        style={styles.button}
        appearance='ghost'
        status='info' 
        accessoryLeft={<Icon name='plus'/>}
        onPress={props.onClick}
      />
    </Layout>
  )
}

const styles = StyleSheet.create({
  button: {
    margin: 2,
    padding: 2
  }
})
