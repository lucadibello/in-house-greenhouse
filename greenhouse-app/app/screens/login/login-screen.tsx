import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { StyleSheet } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { SafeAreaView } from "react-native-safe-area-context"
import { TopNavigation, Divider, Layout, Text } from "@ui-kitten/components"
import { DrawerParamList } from "../../navigators/components/navigators"

export const LoginScreen: FC<StackScreenProps<DrawerParamList, "login">> = observer(
  ({navigation}) => {
    return (
      <SafeAreaView>
        <TopNavigation
          alignment='center'
          title={"Login"}
          subtitle='Your personal greenhouses'
        />
        <Divider />

        <Layout style={styles.container}>
          <Text>Hello! login here</Text>
        </Layout>
      </SafeAreaView>
    )
})

const notchColor = '#FFF'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: "3%",
    paddingRight: "3%"
  },
  greenhouseList: {
    flex: 1,
    marginBottom: 20
  },
  notch: {
    backgroundColor: notchColor,
  },
  title: {
    marginBottom: 2,
  }
})
