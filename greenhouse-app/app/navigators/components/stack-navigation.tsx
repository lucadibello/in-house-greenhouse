import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ScanScreen, GreenhouseScreen, EditPlantScreen, AddPlantScreen } from "../../screens";
import { NavigatorParamList } from "./navigators";
import { AppTabNavigator } from "./bottom-navigation";

const Stack = createNativeStackNavigator<NavigatorParamList>();

// STACK NAVIGATOR
export const AppStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="bottomnav"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="bottomnav" component={AppTabNavigator} />
      <Stack.Screen name="scan" component={ScanScreen} />
      <Stack.Screen name="greenhouse" component={GreenhouseScreen} />
      <Stack.Screen name="editPlant" component={EditPlantScreen} />
      <Stack.Screen name="addPlant" component={AddPlantScreen} />
    </Stack.Navigator>
  )
}