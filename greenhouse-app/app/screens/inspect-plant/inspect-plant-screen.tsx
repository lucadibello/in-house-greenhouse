import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators/components/navigators"
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction, ViewPager } from "@ui-kitten/components"
import { useStores } from "../../models"
import { SafeAreaView, StyleSheet } from "react-native"
import { palette } from "../../theme/palette"
import { DataRecord } from "../../components/data-record/data-record"

export const InspectPlantScreen: FC<StackScreenProps<NavigatorParamList, "inspectPlant">> = observer(
  ({navigation}) => {
  const { navigationStore, dataStore } = useStores()
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  React.useEffect(() => {
    if (navigationStore.inspectPlantScreenParams.plant !== undefined) {
      // Clear all data 
      dataStore.clear()
      // Get plant data
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
        <Layout style={[styles.container, styles.dataContainer]}>
          <Text category={"h4"}>Plant information</Text>
          
          <DataRecord
            style={styles.healthCard}
            percentage={dataStore.data.length !== 0 ? dataStore.data[0].value : null}
          />
          
          {/* SWIPABLE CARDS */}
          <ViewPager
            style={styles.viewPager}
            selectedIndex={selectedIndex}
            onSelect={index => setSelectedIndex(index)}>
            <Layout
              style={styles.tab}
              level='2'>
              <Text category='h5'>Chart</Text>
            </Layout>
            <Layout
              style={styles.tab}
              level='2'>
              <Text category='h5'>Data History</Text>
            </Layout>
          </ViewPager>
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
  dataContainer: {
    padding: 5
  },
  healthCard: {
    padding: 16,
  },
  notch: {
    backgroundColor: palette.white
  },
  tab: {
    height: 100,
    justifyContent: 'center',
  },
  viewPager: {
    flex: 1,
    padding: 4
  }
})
