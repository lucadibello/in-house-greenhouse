import React, { FC, useEffect } from "react"
import { StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { TabParamList, NavigatorParamList } from "../../navigators"
import { Layout, Text } from "@ui-kitten/components"
import { GreenhouseList } from "../../components"
import { Greenhouse, useStores } from "../../models"

export const HomepageScreen: FC<StackScreenProps<(TabParamList & NavigatorParamList), "homepage">> = observer(
  ({navigation}) => {
    
    // Load greenhouses from store
    const { greenhouseStore } = useStores()

    useEffect(() => {
      async function fetchData() {
        // load greenhouses
        await greenhouseStore.getGreenhouses()
      }
      fetchData() // trigger update
    }, [])
    
    // Pull in one of our MST stores
    return (
      <Layout style={styles.container}>
        <Text category='h2'>My greenhouses</Text>
        <GreenhouseList
          style={styles.greenhouseList}
          greenhouses={greenhouseStore.greenhouses}
          onGreenhouseClick={(greenhouse: Greenhouse) => {
            // TODO: REMOVE THIS
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
    marginBottom: 10,
    marginTop: 10,
  }
})