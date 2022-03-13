import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { StyleSheet } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Divider, Icon, Text, TopNavigation, TopNavigationAction } from "@ui-kitten/components"
import { RouteProp, useRoute } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"

export const EditPlantScreen: FC<StackScreenProps<NavigatorParamList, "greenhouse">> = observer(
  ({navigation}) => {
    // Read route params
    const route = useRoute<RouteProp<NavigatorParamList, 'editPlant'>>();

    // Show greenhouse inforamtion
    return (
      <SafeAreaView style={[styles.container, styles.notch]}>
        <TopNavigation
          alignment='center'
          title={"Text"}
          subtitle='Greenhouse information'
          accessoryLeft={<TopNavigationAction icon={<Icon name='arrow-back'/>} onPress={() => navigation.goBack()} />}
        />
        <Divider />
        
        <Text>{JSON.stringify(route.params)}</Text>
      </SafeAreaView>
    )
  }
)

const notchColor = '#FFF'
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  notch: {
    backgroundColor: notchColor,
  },
})