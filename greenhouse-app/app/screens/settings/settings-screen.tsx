import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { TabParamList } from "../../navigators"
// import { useStores } from "../../models"
import { Layout, Text } from "@ui-kitten/components"
import { StyleSheet } from 'react-native' 

export const SettingsScreen: FC<StackScreenProps<TabParamList, "settings">> = observer(function SettingsScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  return (
    <Layout style={styles.container}>
      <Text category='h2'>Settings</Text>
    </Layout>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

