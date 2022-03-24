/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React from "react"
import { useColorScheme, StyleSheet } from "react-native"
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomepageScreen, ScanScreen, GreenhouseScreen, SettingsScreen, EditPlantScreen } from "../screens"
import { navigationRef, useBackButtonHandler } from "./navigation-utilities"
import { BottomNavigation, BottomNavigationTab, Icon } from "@ui-kitten/components";
import { AddPlantScreen } from "../screens/add-plant/add-plant-screen";

export type NavigatorParamList = {
  bottomnav: undefined
  // 🔥 Your screens go here
  scan: undefined
  greenhouse: undefined,
  editPlant: undefined,
  addPlant: undefined
}

export type TabParamList = {
  homepage: undefined
  // 🔥 Your tabs go here
  settings: undefined
}

// Create custom stylesheet
const styles = StyleSheet.create({
  kittenBar: {
    height: 75
  }
});

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<NavigatorParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const UIKittenBar = ({ navigation, state }) => (
  <BottomNavigation
    style={styles.kittenBar}
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    {
      /*
        <BottomNavigationTab icon={<Icon name='people-outline'/>}/>
      */
    }
    <BottomNavigationTab icon={<Icon name='options-2-outline'/>}/>
    <BottomNavigationTab icon={<Icon name='settings-outline'/>}/>
  </BottomNavigation>
);

const AppBottomTab = () => {
  return (
    <Tab.Navigator 
      tabBar={props => <UIKittenBar {...props} />}
      initialRouteName="homepage"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="homepage"
        component={HomepageScreen}
      />

      <Tab.Screen
        name="settings"
        component={SettingsScreen}
        options={() => ({
          title: 'Settings'
        })}
      />
    </Tab.Navigator>
  )
}

const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="bottomnav"
      screenOptions={{
        headerShown: false,
      }}
    >
      {/** 🔥 Your screens go here */}
      <Stack.Screen name="bottomnav" component={AppBottomTab} />
      <Stack.Screen name="scan" component={ScanScreen} />
      <Stack.Screen name="greenhouse" component={GreenhouseScreen} />
      <Stack.Screen name="editPlant" component={EditPlantScreen} />
      <Stack.Screen name="addPlant" component={AddPlantScreen} />
    </Stack.Navigator>
  )
}

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  const colorScheme = useColorScheme()
  useBackButtonHandler(canExit)
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
}

AppNavigator.displayName = "AppNavigator"

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["welcome"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
