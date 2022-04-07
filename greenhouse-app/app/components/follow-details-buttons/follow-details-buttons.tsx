import * as React from "react"
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Button, Icon } from "@ui-kitten/components"

export interface FollowDetailsButtonsProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  onFollowButtonPress: () => void
  onDetailsButtonPress: () => void
}


/**
 * Describe your component here
 */
export const FollowDetailsButtons = observer(function FollowDetailsButtons(props: FollowDetailsButtonsProps) {
  return (
    <View style={styles.profileButtonsContainer}>
      <Button
        style={styles.profileButton}
        accessoryLeft={<Icon name="person" />}
        onPress={props.onFollowButtonPress}>
        FOLLOW
      </Button>
      <Button
        style={styles.profileButton}
        status='control'
        accessoryLeft={<Icon name="person" />}
        onPress={props.onDetailsButtonPress}>
        DETAILS
      </Button>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  profileButtonsContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 32,
  },
})