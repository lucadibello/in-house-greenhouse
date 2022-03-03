import React, { FC, useEffect } from "react"
import { StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { TabParamList, NavigatorParamList } from "../../navigators"
import { Layout, Text } from "@ui-kitten/components"
import { GreenhouseCardProps, GreenhouseList } from "../../components"
import { useStores } from "../../models"

export const HomepageScreen: FC<StackScreenProps<(TabParamList & NavigatorParamList), "homepage">> = observer(
  ({navigation}) => {
    
    // Load greenhouses from store
    const { greenhouseStore } = useStores()

    useEffect(() => {
      async function fetchData() {
        greenhouseStore.empty();
        await greenhouseStore.getGreenhouses()
      }
      fetchData()
    }, [])
    
    /*
    <Text category='h2'>{ JSON.stringify(greenhouseStore.greenhouses.map((g) => g.name)) }</Text>
    */
    
    // Pull in one of our MST stores
    return (
      <Layout style={styles.container}>
        <Text category='h2'>My greenhouses</Text>
        <GreenhouseList
          style={styles.greenhouseList}
          greenhouses={[
            {title:"Office", subtitle: "Lettuce, Tomatoes", status: "danger", id: "1"},
            {title:"Ciao", subtitle: "Other", status: "success", id: "2"},
            {title:"Ciao", subtitle: "IDK", status: "success", id: "3"},
            {title:"Picio", subtitle: "IDK", status: "danger", id: "4"},
          ]}
          onGreenhouseClick={(greenhouse: GreenhouseCardProps) => {
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