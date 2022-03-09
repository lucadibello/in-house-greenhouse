import React, { FC, useEffect } from "react"
import { Alert, SafeAreaView, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { TabParamList, NavigatorParamList } from "../../navigators"
import { Divider, Icon, Layout, TopNavigation, TopNavigationAction } from "@ui-kitten/components"
import { GreenhouseList } from "../../components"
import { useStores } from "../../models"
import { Greenhouse } from "../../models/greenhouse/greenhouse"

export const HomepageScreen: FC<StackScreenProps<(TabParamList & NavigatorParamList), "homepage">> = observer(
  ({navigation}) => {
    
    // Load greenhouses from store
    const { greenhouseStore } = useStores()

    useEffect(() => {
      async function fetchData() {
        // log into reactotron
        console.tron.debug("[HOMEPAGE] Fetching greenhouses..")
        // load greenhouses
        await greenhouseStore.getGreenhouses()
      }
      fetchData() // trigger update
    }, [])
    
    // Pull in one of our MST stores
    return (
      <SafeAreaView style={styles.container}>
        <TopNavigation
          alignment='center'
          title={"Greenhouses"}
          subtitle='Your personal greenhouses'
          accessoryLeft={<TopNavigationAction icon={<Icon name='menu'/>} onPress={() => Alert.alert("Implement drawer for account")} />}
          accessoryRight={<TopNavigationAction icon={<Icon name='plus'/>} onPress={() => navigation.navigate("scan")} />}
        />
        <Divider />

        <Layout style={styles.container}>
          <GreenhouseList
            style={styles.greenhouseList}
            store={greenhouseStore}
            onGreenhouseClick={(greenhouse: Greenhouse) => {
              // navigate to greenhouse screen and passing greenhouse information
              navigation.navigate("greenhouse", {
                details: greenhouse
              })
            }}
          />
        </Layout>
      </SafeAreaView>
    )
  }
)
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
  title: {
    marginBottom: 2,
  },
})