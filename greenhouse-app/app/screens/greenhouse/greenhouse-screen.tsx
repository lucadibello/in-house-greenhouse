import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { StyleSheet } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Layout, Text } from "@ui-kitten/components"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"

export const GreenhouseScreen: FC<StackScreenProps<NavigatorParamList, "greenhouse">> = observer(function GreenhouseScreen() {
  // Load navigation via hook
  const navigation = useNavigation()
  // Read route params
  const route = useRoute<RouteProp<NavigatorParamList, 'greenhouse'>>();
  
  // Update page title
  React.useEffect(() => {
    navigation.setOptions({
      title: route.params.details.title
    })
  }, [])

  // Show greenhouse inforamtion
  return (
    <Layout style={styles.container}>
      <Text category='h2'>{route.params.details.title}, ID: {route.params.details.id}</Text>
    </Layout>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  notchBg: {
    flex: 1
  }
})