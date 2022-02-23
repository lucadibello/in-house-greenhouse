import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { SafeAreaView, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Button, GradientBackground, Screen, Text } from "../../components"
import { t, color } from 'react-native-tailwindcss'

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `homepage: undefined` to NavigatorParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="homepage" component={HomepageScreen} />`
// Hint: Look for the 🔥!


// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
export const HomepageScreen: FC<StackScreenProps<NavigatorParamList, "homepage">> = observer(
  ({navigation}) => {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()
    return (
      <View testID="HomepageScreen" style={t.flex1}>
        <GradientBackground colors={["#52b69a", "#76c893"]} />
        <Screen preset="scroll" style={t.mT10} backgroundColor={color.transparent}>
          <Text preset="header" text="In-House Greenhouse" style={[t.textBlack, t.textCenter]} />
        </Screen>
        <SafeAreaView style={t.bgWhite}>
          <View style={t.p4}>
            <Button
              style={t.bgBlack}
              tx="welcomeScreen.continue"
            />
          </View>
        </SafeAreaView>
      </View>
    )
  }
)
