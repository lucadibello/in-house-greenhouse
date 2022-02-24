import React, { FC } from "react"
import { StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { TabParamList } from "../../navigators"
import { Layout, Text } from "@ui-kitten/components"
import { GreenhouseCard, GreenhouseList } from "../../components"
import { FlatList } from "react-native-gesture-handler"

const VirtualizedView = (props: any) => {
  return (
    <FlatList
      nestedScrollEnabled
      data={[]}
      ListEmptyComponent={null}
      keyExtractor={() => "dummy"}
      renderItem={null}
      ListHeaderComponent={() => (
        <React.Fragment>{props.children}</React.Fragment>
      )}
    />
  );
}

export const HomepageScreen: FC<StackScreenProps<TabParamList, "homepage">> = observer(
  ({navigation}) => {
    // Pull in one of our MST stores
    return (
      <Layout style={styles.container}>
        <VirtualizedView>
          <Text category='h2'>My greenhouses</Text>
          <GreenhouseList
            style={styles.greenhouseList}
            greenhouses={[
              {title:"Office", subtitle: "Lettuce, Tomatoes", status: "danger"},
              {title:"Ciao", subtitle: "Other", status: "success"},
              {title:"Ciao", subtitle: "IDK", status: "success"},
              {title:"Picio", subtitle: "IDK", status: "danger"},
            ]}
          />
          <Text category='h2'>General statistics</Text>
          <GreenhouseCard title="Prova" />
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