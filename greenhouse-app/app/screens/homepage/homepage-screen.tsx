import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { TabParamList } from "../../navigators"
import { GradientBackground, Screen } from "../../components"
import { t, color } from 'react-native-tailwindcss'

export const HomepageScreen: FC<StackScreenProps<TabParamList, "homepage">> = observer(
  ({navigation}) => {
    // Pull in one of our MST stores
    return (
      <View testID="HomepageScreen" style={t.flex1}>
        <GradientBackground colors={["#52b69a", "#76c893"]} />
        <Screen style={t.mT10} backgroundColor={color.transparent}>
          { /* Page content here */ }
        </Screen>
      </View>
    )
  }
)
