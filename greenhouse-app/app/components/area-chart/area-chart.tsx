import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { observer } from "mobx-react-lite";
import { AreaChart as LibAreaChart, Grid, YAxis } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { Text } from "@ui-kitten/components"

// Props that loads a list of numbers
interface AreaChartProps {
  style?: ViewStyle
  data: number[]
}

export const AreaChart = observer(function AreaChart(props: AreaChartProps) {
  
  // An AreaChart works only with more than one data point, so we need to check if the data is valid.
  // If the data is not valid, we show a message instead.
  if (props.data.length < 2) {
    return (
      <View style={props.style}>
        <Text>No data available</Text>
      </View>
    )
  } else {
    return (
      <View style={styles.areaContainer}>
        <YAxis
          data={props.data}
          contentInset={{ top: 20, bottom: 20 }}
          svg={{
            fill: 'grey',
            fontSize: 10,
          }}
          numberOfTicks={10}
          formatLabel={(value) => `${Math.floor(value)}%`}
          min={0}
          max={100}
        />
        <LibAreaChart
          style={[styles.container, props.style]}
          data={props.data}
          contentInset={{ top: 10, bottom: 10 }}
          curve={shape.curveNatural}
          svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
          yMin={0}
          yMax={100}
        >
          <Grid />
        </LibAreaChart>
      </View>
    )
  }
})

const styles = StyleSheet.create({
  areaContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  container: {
    flex: 1,
  }
})