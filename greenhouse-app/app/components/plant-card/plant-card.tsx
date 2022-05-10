import * as React from "react"
import { Animated, GestureResponderEvent, StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Button, Card, Divider, Icon, Text } from "@ui-kitten/components"
import { Plant } from "../../models/plant/plant";
import { palette } from "../../theme/palette";
import Ripple from "react-native-material-ripple";
import { useStores } from "../../models";

export interface PlantCardProps {
  plant: Plant;
  style?: StyleProp<ViewStyle>,
  id: number,
  onEditPress: (event: GestureResponderEvent, source: Plant) => void,
  onDeletePress: (event: GestureResponderEvent, source: Plant) => void
  onInspectPress: (event: GestureResponderEvent, source: Plant) => void
}

/**
 * Greenhouse card that shows useful information
 */
export const PlantCard = observer(function (props: PlantCardProps) {
  // React state for collapsible plant information
  const [expanded, setExpanded] = React.useState(false);

  // use store
  const { dataStore } = useStores();

  // calculate life of plant
  const startDate = new Date(props.plant.created_at)
  const currentDate = new Date()
  const hoursDiff = ((currentDate.getTime() - startDate.getTime()) / 1000 / 60 / 60).toFixed(1);
  const animatedHeight = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    // Create DataApi service
    dataStore.getPlantData(props.plant).then(() => {
      // Check if plant has data
      if (dataStore.data.length > 0) {
        // Get last data point
        props.plant.setSoilMoisture(dataStore.data[dataStore.data.length - 1].value)
    } else {
        // Plant has no data
        props.plant.setSoilMoisture(-1)
      }      
    })
  }, [dataStore.data])


  React.useEffect(() => {
      Animated.spring(animatedHeight, {
        friction: 100,
        toValue: expanded ? 300 : 0,
        useNativeDriver: false
      }).start();
  }, [expanded]);

  return (
    <React.Fragment>
        <View style={props.style}>
          <Card
            style={styles.card}
            status={props.plant.soilMoisture > 100 ? "danger" : "success"}
          >
            <Ripple style={styles.fullWidth} rippleCentered={true} rippleColor={"rgb(169,151,223)"} onPress={() => {
              setExpanded(!expanded);
            }}>
              {/* Card content */}
              <View style={styles.cardContainer}>
                <Text style={styles.plantNumberLabel} category='s2'>#{props.id+1}</Text>
                {/* Center plant information horizontally and vertically */}
                <View style={styles.cardContent}>
                  <Text category='h6' style={styles.cardText}>{props.plant.name}</Text>
                  {
                    props.plant.description &&
                      <Text category='s1' style={styles.cardText}>{props.plant.description}</Text>
                  }
                </View>
              </View>
            </Ripple>

            {/* Show plant information */}
            <Animated.View collapsable style={[styles.collapsable, { height: animatedHeight }]}>
              <Text category='s1' style={styles.cardTitle}>Related information:</Text>
              <Divider />
              <View>
                {/* Plant position */}
                <View style={styles.row}>
                  <Text style={styles.cardText}>Position</Text>
                  <Text category='label' style={styles.cardText}>{props.plant.position.name}</Text>
                </View>

                {/* Plant age */}
                <View style={styles.row}>
                  <Text style={styles.cardText}>Age</Text>
                  <Text category='label' style={styles.cardText}>{hoursDiff} Hours</Text>
                </View>

                {/* Plant soil moisture */}
                <View style={styles.row}>
                  <Text style={styles.cardText}>Soil moisture</Text>
                  <Text category='label' style={[styles.cardText, props.plant.soilMoisture > 100 ? styles.soilMoistureError : null ]}>
                    {props.plant.soilMoisture > 100 ? "ERROR" : props.plant.soilMoisture + "%"}
                  </Text>
                </View>
                
                {/* Edit / Delete Buttons */}
                <View>
                  {/* Inspect plant */}
                  <Button
                    status={"basic"}
                    style={[styles.actionButton, styles.healthButton]}
                    onPress={(event) => props.onInspectPress(event, props.plant)}
                    accessoryLeft={
                      <Icon style={styles.icon}
                        fill='#000'
                        name="activity-outline"
                      />
                    }
                  >
                    HEALTH STATUS
                  </Button>
                  
                  {/* Edit plant */}
                  <Button
                    status={"basic"}
                    style={[styles.actionButton, styles.editButton]}
                    onPress={(event) => props.onEditPress(event, props.plant)}
                    accessoryLeft={
                      <Icon style={styles.icon}
                        fill='#000'
                        name="edit-2-outline"
                      />
                    }
                  >
                    EDIT PLANT
                  </Button>

                  {/* Remove plant */}
                  <Button
                    status={"basic"}
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={(event) => props.onDeletePress(event, props.plant)}
                    accessoryLeft={
                      <Icon style={styles.icon}
                        fill='#000'
                        name="trash-2-outline" 
                      />
                    }>
                      REMOVE PLANT
                  </Button>
                </View>
              </View>
            </Animated.View>
          </Card>
        </View>
    </React.Fragment>
  )
})

const styles = StyleSheet.create({
  actionButton: {
    marginTop: 10
  },
  card: {
    backgroundColor: palette.buttons.primary,
    flex: 1
  },
  cardContainer: {
    display: 'flex',
    flexDirection: "column",
    justifyContent: "flex-start",
    textAlignVertical: "center"
  },
  cardContent: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    margin: 2,
  },
  cardText: {
    color: palette.white,
    margin: 2,
    padding: 5
  },
  cardTitle: {
    color: palette.white,
    marginTop: 5,
  },
  collapsable: {
    backgroundColor: palette.buttons.primary,
    height: "100",
    marginTop: 10,
    overflow: 'hidden',
    width: "100%"
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  deleteButton: {
    backgroundColor: palette.buttons.danger
  },
  editButton: {
    backgroundColor: palette.buttons.warning,
  },
  fullWidth: {
    width: '100%'
  },
  healthButton: {
    backgroundColor: palette.buttons.success
  },
  icon: {
    height: 24,
    marginRight: 10,
    width: 24
  },
  plantNumberLabel: {
    color: palette.white,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: "100%",
  },
  soilMoistureError: {
    color: palette.angry
  },
});
