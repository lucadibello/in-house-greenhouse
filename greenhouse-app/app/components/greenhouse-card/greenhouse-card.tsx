import * as React from "react"
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Card, Layout, Text, Icon } from "@ui-kitten/components"
import { Greenhouse } from "../../models/greenhouse/greenhouse";

export interface GreenhouseCardProps {
  greenhouse: Greenhouse;
  style?: StyleProp<ViewStyle>,
}

interface HeaderProps {
  title: string,
  subtitle?: string 
}

const Header = (props: HeaderProps) => (
  <View>
    <Text category='h1'>{props.title}</Text>
    <Text category='label'>{props.subtitle}</Text>
  </View>
);

const NumberOfPlants = (plantsNumber: number) => {
  if (plantsNumber === 0) {
    return (
      <View style={styles.controlContainer}>
        <Text status="control" style={styles.textBold}>Start planting right now!</Text>
      </View>
    )
  } else {
    return <Text><Text status="info" style={styles.textBold}>{plantsNumber}</Text> plants!</Text>
  }
}

/**
 * Greenhouse card that shows useful information
 */
export const GreenhouseCard = observer(function GreenhouseCard(props: GreenhouseCardProps) {
  const isOkay = props.greenhouse.isOkay
  
  return (
    <React.Fragment>
      <Layout style={[props.style, styles.container]} level='3'>
        <Card
          style={styles.card} status={isOkay === true ? 'success' : 'warning'}
          header={<Header title={props.greenhouse.name} subtitle={props.greenhouse.description} />}
        >
          { /* CHECK NUMBER OF PLANTS PLANTED */ }
          <View style={styles.inlineIcon}>
            <Icon style={styles.icon} name='cube' fill='#8F9BB3'/>
            {NumberOfPlants(props.greenhouse.plants.length)}
          </View>

          { /* SHOW GREENHOUSE STATUS */ }
          <View style={styles.inlineIcon}>
            <Icon style={styles.icon} name='thermometer' fill='#8F9BB3'/>
            <Text style={styles.textElement}>Status: 
              {isOkay ? 
                <Text status="info"  style={styles.textBold}> OKAY</Text> : <Text status="danger" style={styles.textBold}> PROBLEM DETECTED</Text>
              }
            </Text>
          </View>
        </Card>
      </Layout>
    </React.Fragment>
  )
})

const controlBlue = '#3366FF'
const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 2,
    padding: 10
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  controlContainer: {
    backgroundColor: controlBlue,
    borderRadius: 4,
    padding: 4,
  },
  icon: {
    height: 24,
    marginRight: 10,
    width: 24
  },
  inlineIcon: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    textAlignVertical: "center"
  },
  textBold: {
    fontWeight: 'bold'
  },
  textElement: {
    marginTop: 10
  }
});
