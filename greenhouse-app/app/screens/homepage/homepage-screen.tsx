import React, { FC, useEffect } from "react"
import { SafeAreaView, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { Divider, Icon, Layout, TopNavigation, TopNavigationAction } from "@ui-kitten/components"
import { GreenhouseList } from "../../components"
import { useStores } from "../../models"
import { Greenhouse } from "../../models/greenhouse/greenhouse"
import { DrawerScreenProps } from "@react-navigation/drawer"
import { TabParamList, NavigatorParamList, DrawerParamList } from "../../navigators/components/navigators"
import { palette } from "../../theme/palette"

export const HomepageScreen: FC<StackScreenProps<(TabParamList & NavigatorParamList), "homepage"> & DrawerScreenProps<DrawerParamList>> = observer(
  ({navigation}) => {
    
    // Load greenhouses from store
    const { greenhouseStore, navigationStore } = useStores()

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
      <SafeAreaView style={[styles.container, styles.notch]}>
        <TopNavigation
          alignment='center'
          title={"Greenhouses"}
          subtitle='Your personal greenhouses'
          accessoryLeft={<TopNavigationAction icon={<Icon name='menu'/>} onPress={() => navigation.openDrawer()} />}
          accessoryRight={<TopNavigationAction icon={<Icon name='plus'/>} onPress={() => navigation.navigate("scan")} />}
        />
        <Divider />

        <Layout style={styles.container}>
          <GreenhouseList
            style={styles.greenhouseList}
            store={greenhouseStore}
            onGreenhouseClick={(greenhouse: Greenhouse) => {
              // Save greenhouse information into navigation store
              navigationStore.setGreenhouseScreenParams(greenhouse)
              // navigate to greenhouse screen
              navigation.navigate("greenhouse")
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
  notch: {
    backgroundColor: palette.white,
  },
  title: {
    marginBottom: 2,
  }
})