import * as React from "react"
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Card, Layout, Text } from "@ui-kitten/components"
import { Greenhouse } from "../../models/greenhouse/greenhouse";

export interface GreenhouseCardProps {
  greenhouse: Greenhouse;
  isOkay?: boolean,
  style?: StyleProp<ViewStyle>,
}

interface HeaderProps {
  title: string,
  subtitle?: string 
}

const Header = (props: HeaderProps) => (
  <View>
    <Text category='h6'>{props.title}</Text>
    <Text category='s1'>{props.subtitle}</Text>
  </View>
);

/**
 * Describe your component here
 */
export const GreenhouseCard = observer(function GreenhouseCard(props: GreenhouseCardProps) {
  return (
    <React.Fragment>
      <Layout style={[props.style, styles.container]} level='3'>
        <Card
          style={styles.card} status={props.isOkay === true ? 'success' : 'warning'}
          header={<Header title={props.greenhouse.name} subtitle={props.greenhouse.description} />}
        >
          <Text>Hello bello</Text>
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
