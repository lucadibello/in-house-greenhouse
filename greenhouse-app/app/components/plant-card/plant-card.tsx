import * as React from "react"
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Button, Card, Divider, Layout, Text } from "@ui-kitten/components"
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
  <View style={styles.cardHeader}>
    <Text category='h3'>{props.title}</Text>
    <Text category='label'>{props.subtitle}</Text>
  </View>
);

/**
 * Greenhouse card that shows useful information
 */
export const PlantCard = observer(function (props: PlantCardProps) {
  // calculate life of plant
  const startDate = new Date(props.plant.created_at)
  const currentDate = new Date()
  const secondsDiff = Math.floor((currentDate.getTime() - startDate.getTime()) / 1000 / 60 / 60);

  return (
    <React.Fragment>
      <Layout style={[props.style, styles.container]} level='3'>
        <Card
          style={styles.card}
          header={<Header title={props.plant.name} subtitle={props.plant.description} />}
        >
          <View style={styles.cardContainer}>
            {/* Planted date */}
            <Text category="h6">
              Planted on: <Text category="c2">{startDate.toLocaleDateString()}</Text>
            </Text>

            {/* Lifespan of the plant */}
            <Text category="h6">
              Lifespan: <Text style={styles.textBold}>{secondsDiff} hours</Text>
            </Text>

            {/* Soil umidity */}
            <Text category="h6">
              Soil humidity: <Text style={styles.textBold}>10%</Text>
            </Text>

            { /* Access plant data history */}
            <Button>View plant history</Button>
          </View>
        </Card>
      </Layout>
    </React.Fragment>
  )
})

const styles = StyleSheet.create({
  card: {
    flex: 1
  },
  cardContainer: {
    display: 'flex',
    flexDirection: "column",
    justifyContent: "flex-start",
    textAlignVertical: "center"
  },
  cardHeader: {
    margin: 2,
    padding: 5
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  textBold: {
    fontWeight: 'bold'
  }
});
