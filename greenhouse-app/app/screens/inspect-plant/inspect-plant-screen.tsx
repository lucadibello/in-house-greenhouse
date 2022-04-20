import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators/components/navigators"
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction } from "@ui-kitten/components"
import { useStores } from "../../models"
import { SafeAreaView, StyleSheet } from "react-native"
import { palette } from "../../theme/palette"

export const InspectPlantScreen: FC<StackScreenProps<NavigatorParamList, "inspectPlant">> = observer(
  ({navigation}) => {
  const { navigationStore, dataStore } = useStores()

  React.useEffect(() => {
    if (navigationStore.inspectPlantScreenParams.plant !== undefined) {
      dataStore.getPlantData(navigationStore.inspectPlantScreenParams.plant)
    }
  }, [])

  // Check if a plant has been selected
  if (navigationStore.inspectPlantScreenParams.plant !== undefined) {
    return (
      <SafeAreaView style={[styles.container, styles.notch]}>
        <TopNavigation
          alignment='center'
          title={navigationStore.inspectPlantScreenParams.plant.name}
          subtitle={'Inspect your plant health parameters'}
          accessoryLeft={<TopNavigationAction icon={<Icon name='arrow-back'/>} onPress={() => navigation.goBack()} />}
        />
         <Divider />
        <Layout>
          <Text>Inspecting plant {navigationStore.inspectPlantScreenParams.plant.id}</Text>
          <Text>DATA:</Text>
          <Text>{JSON.stringify(dataStore.data)}</Text>
        </Layout>
      </SafeAreaView>
    )
  } else {
    return (
      <SafeAreaView style={[styles.container, styles.notch]}>
        <TopNavigation
          alignment='center'
          title={"Missing plant!"}
          subtitle={'Inspect your plant health parameters'}
          accessoryLeft={<TopNavigationAction icon={<Icon name='arrow-back'/>} onPress={() => navigation.goBack()} />}
        />
         <Divider />
        <Layout>
          <Text>Please, you need to select a valid plant through the navigationStore</Text>
        </Layout>
      </SafeAreaView>
    )
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  notch: {
    backgroundColor: palette.white
  },
})
