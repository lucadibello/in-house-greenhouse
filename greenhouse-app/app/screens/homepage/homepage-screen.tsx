import React, { FC } from "react"
import { StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { TabParamList } from "../../navigators"
import { Layout, Text } from "@ui-kitten/components"
import { GreenhouseCard } from "../../components/greenhouse-card/greenhouse-card"

export const HomepageScreen: FC<StackScreenProps<TabParamList, "homepage">> = observer(
  ({navigation}) => {
    // Pull in one of our MST stores
    return (
      <Layout style={styles.container}>
        <Text category='h2'>My greenhouses</Text>
        <GreenhouseCard title="GreenHouse demmerda" subtitle="Homespace" />
      </Layout>
    )
  }
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: "3%"
  },
  title: {
    textDecorationLine: "underline"
  }
})