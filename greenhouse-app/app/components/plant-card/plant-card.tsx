import * as React from "react"
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Card, Layout, Text } from "@ui-kitten/components"
import { Plant } from "../../models/plant/plant";

export interface PlantCardProps {
  plant: Plant;
  style?: StyleProp<ViewStyle>,
}

interface HeaderProps {
  title: string,
  subtitle?: string 
}

const Header = (props: HeaderProps) => (
  <View>
    <Text category='h6'>{props.title}</Text>
    <Text category='label'>{props.subtitle}</Text>
  </View>
);

/**
 * Greenhouse card that shows useful information
 */
export const PlantCard = observer(function PlantCard(props: PlantCardProps) {
  return (
    <React.Fragment>
      <Layout style={[props.style, styles.container]} level='3'>
        <Card
          style={styles.card}
          header={<Header title={props.plant.name} subtitle={props.plant.description} />}
        >
          <Text>I'm a plant :)</Text>
        </Card>
      </Layout>
    </React.Fragment>
  )
})

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 2,
    padding: 10
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
});
