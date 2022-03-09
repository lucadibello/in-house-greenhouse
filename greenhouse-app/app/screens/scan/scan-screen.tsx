import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { SafeAreaView, StyleSheet } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { TopNavigation, TopNavigationAction, Icon, Divider, Layout, Text } from "@ui-kitten/components"

export const ScanScreen: FC<StackScreenProps<NavigatorParamList, "scan">> = observer(
  ({navigation}) => {
    // Show greenhouse inforamtion
    return (
      <SafeAreaView style={styles.container}>
        <TopNavigation
          alignment='center'
          title={"Scan"}
          subtitle='Scan network for greenhouses'
          accessoryLeft={<TopNavigationAction icon={<Icon name='arrow-back'/>} onPress={() => navigation.goBack()} />}
        />
        <Divider />

        <Layout style={styles.container}>
          {/* SHOW PLANT FORM */}
          <Text>Settings will be HERE!</Text>
        </Layout>
      </SafeAreaView>
    )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})