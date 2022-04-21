import * as React from "react"
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Card, Layout, Text } from "@ui-kitten/components"
import ProgressCircle from 'react-native-progress-circle'
import { palette } from "../../theme/palette"

export interface DataRecordProps {
  style?: StyleProp<ViewStyle>
  percentage: number | null 
}


/**
 * Describe your component here
 */
export const DataRecord = observer(function DataRecord(props: DataRecordProps) {
  return (
    <Layout style={props.style}>
      <Text category={"h4"}>Soil moisture</Text>
      <View style={styles.dataRecordBar}>
        <ProgressCircle
            percent={props.percentage !== null ? props.percentage * 100 : 100}
            radius={70}
            borderWidth={12}
            color={props.percentage !== null ? palette.success : palette.angry}
            shadowColor="#999"
            bgColor="#FFF"
          >
            <Text style={styles.text}>{props.percentage !== null ? 'Soil Moisture' : 'No data'}</Text>
            {
              props.percentage !== null &&
                <Text style={styles.text}>{Math.floor(props.percentage * 100)}%</Text>
            }
          </ProgressCircle>
      </View>
    </Layout>
  )
})

const styles = StyleSheet.create({
  card: {
    margin: 2,
  },
  container: {
    flex: 1,
  },
  dataRecordBar: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
  },
  progressCircle: {
    height: 200
  },
  text: {
    fontSize: 17
  },
})