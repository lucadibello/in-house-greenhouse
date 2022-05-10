import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators/components/navigators"
import { Divider, Icon, Layout, Spinner, Text, TopNavigation, TopNavigationAction } from "@ui-kitten/components"
import { useStores } from "../../models"
import { SafeAreaView, StyleSheet } from "react-native"
import { palette } from "../../theme/palette"
import { DataRecord } from "../../components/data-record/data-record"
import { AreaChart } from "../../components"

export const InspectPlantScreen: FC<StackScreenProps<NavigatorParamList, "inspectPlant">> = observer(
  ({navigation}) => {
  const { navigationStore, dataStore } = useStores()
  const [chartData, setChartData] = React.useState<number[]>([]); 
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const updateGraph = () => {
    if (navigationStore.inspectPlantScreenParams.plant !== undefined) {
      // Set loading flag
      setIsLoading(true);
      // Clear all data 
      dataStore.clear()
      // Get plant data
      dataStore.getPlantData(navigationStore.inspectPlantScreenParams.plant).then(() => {
        // Save data inside chart data
        setChartData(dataStore.data.map(data => data.value))
        // Update plant soil data
        navigationStore.inspectPlantScreenParams.plant.setSoilMoisture(dataStore.data[dataStore.data.length - 1].value || -1);
      }).finally (() => {
        // Set loading flag
        setIsLoading(false);
      })
    }
  }

  // Update graph at load
  React.useEffect(() => {
    updateGraph();
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
          accessoryRight={<TopNavigationAction icon={<Icon name='refresh-outline' />} onPress={() => updateGraph()} />}
        />
        <Divider />
        <Layout style={[styles.container, styles.dataContainer]}>
          {!isLoading &&
            <DataRecord
              style={styles.healthCard}
              percentage={navigationStore.inspectPlantScreenParams.plant.soilMoisture !== -1 ?
                navigationStore.inspectPlantScreenParams.plant.soilMoisture : null}
            />
          }
          {isLoading && <Spinner size='large'/>} 
         
          <Layout style={[styles.container, styles.chartContainer]}>
            { /* Soil moisture chart */ }  
            <Text category='h4'>Soil chart</Text>
            
            {/* Humidity chart */}
            {!isLoading && <AreaChart data={chartData}/>}
            { /* Spinner if loading */}
            {isLoading && <Spinner size='large'/>}
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
