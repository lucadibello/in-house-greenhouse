import * as React from "react"
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Button, Card, Layout, Text } from "@ui-kitten/components"
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
    <Text category='h6'>{props.title}</Text>
    <Text category='label' style={styles.cardLabel}>- {props.subtitle}</Text>
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

            <View style={styles.spacer}></View>

            {/* Lifespan of the plant */}
            <Text category="h6">
              Lifespan: <Text style={styles.textBold}>{secondsDiff} hours</Text>
            </Text>

            <View style={styles.spacer}></View>

            {/* Soil umidity */}
            <Text category="h6">
              {/* FIXME: THIS IS AN HARD CODED VALUE, FIX IN FUTURE */}
              Soil humidity: <Text style={styles.textBold}>10%</Text>
            </Text>

            <View style={styles.spacer}></View>

              { /* Access plant data history */}
              <Button status="info">View plant history</Button>
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
    alignItems: "center",
    flexDirection: "row",
    margin: 2,
    padding: 5
  },
  cardLabel: {
    marginLeft: 5
  }, 
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  spacer: {
    marginBottom: 5,
    marginTop: 5
  },
  textBold: {
    fontWeight: 'bold'
  }
});
