import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators/components/navigators"
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction, ViewPager } from "@ui-kitten/components"
import { useStores } from "../../models"
import { SafeAreaView, StyleSheet } from "react-native"
import { palette } from "../../theme/palette"
import { DataRecord } from "../../components/data-record/data-record"
import { AreaChart } from "../../components"

export const InspectPlantScreen: FC<StackScreenProps<NavigatorParamList, "inspectPlant">> = observer(
  ({navigation}) => {
  const { navigationStore, dataStore } = useStores()
  const [chartData, setChartData] = React.useState<number[]>([]); 

  React.useEffect(() => {
    if (navigationStore.inspectPlantScreenParams.plant !== undefined) {
      // Clear all data 
      dataStore.clear()
      // Get plant data
      dataStore.getPlantData(navigationStore.inspectPlantScreenParams.plant).then(() => {
        // Save data inside chart data
        setChartData(dataStore.data.map(data => data.value * 100))
      })
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
          <DataRecord
            style={styles.healthCard}
            percentage={dataStore.data.length !== 0 ? dataStore.data[dataStore.data.length - 1].value : null}
          />
          
          <Layout style={[styles.container, styles.chartContainer]}>
            { /* Soil moisture chart */ }  
            <Text category='h4'>Soil chart</Text>
            
            {/* Humidity chart */}
            <AreaChart data={chartData}/>
          </Layout>
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
  chartContainer: {
    padding: 16
  },
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
