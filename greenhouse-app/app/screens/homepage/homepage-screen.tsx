import React, { FC } from "react"
import { StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { TabParamList, NavigatorParamList } from "../../navigators"
import { Layout, Text } from "@ui-kitten/components"
import { GreenhouseCard, GreenhouseCardProps, GreenhouseList } from "../../components"
import { FlatList } from "react-native-gesture-handler"

const VirtualizedView = (props: any) => {
  return (
    <FlatList
      nestedScrollEnabled
      data={[]}
      ListEmptyComponent={null}
      keyExtractor={() => "fakescrollableview"}
      renderItem={null}
      ListHeaderComponent={() => (
        <React.Fragment>{props.children}</React.Fragment>
      )}
    />
  );
}

export const HomepageScreen: FC<StackScreenProps<(TabParamList & NavigatorParamList), "homepage">> = observer(
  ({navigation}) => {
    // Pull in one of our MST stores
    return (
      <Layout style={styles.container}>
        <VirtualizedView>
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
              console.tron.log("Clicked a greenhouse! ", greenhouse.title, greenhouse.id)
              // navigate to greenhouse screen
              navigation.navigate("greenhouse")
            }}
          />
          <Text category='h2'>General statistics</Text>
        </VirtualizedView>
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
    marginBottom: 10,
    marginTop: 10
  }
})