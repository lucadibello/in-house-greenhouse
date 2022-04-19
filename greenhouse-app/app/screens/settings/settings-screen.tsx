import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { Divider, Layout, Text, TopNavigation } from "@ui-kitten/components"
import { SafeAreaView, StyleSheet } from 'react-native' 
import { TabParamList } from "../../navigators/components/navigators"
import { palette } from "../../theme/palette"

export const SettingsScreen: FC<StackScreenProps<TabParamList, "settings">> = observer(function SettingsScreen() {
  return (
    <SafeAreaView style={[styles.container, styles.notch]}>
      <TopNavigation
          alignment='center'
          title={"Settings"}
          subtitle='Scan network for greenhouses'
      />
      <Divider />
      
      <Layout style={styles.container}>
        <Text>Settings will be here</Text>
      </Layout>
    </SafeAreaView>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  notch: {
    backgroundColor: palette.white,
  }
})

