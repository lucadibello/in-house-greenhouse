import React, { FC, useEffect } from "react"
import { StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { TabParamList, NavigatorParamList } from "../../navigators"
import { Divider, Layout, Text } from "@ui-kitten/components"
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