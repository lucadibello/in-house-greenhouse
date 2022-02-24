import * as React from "react"
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Card, Layout, Text } from "@ui-kitten/components"

export interface GreenhouseCardProps {
  title: string,
  subtitle?: string,
  status?: 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'basic',
  style?: StyleProp<ViewStyle>
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
        <Card style={styles.card} status={props.status || 'basic'} header={<Header title={props.title} subtitle={props.subtitle} />}>
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
