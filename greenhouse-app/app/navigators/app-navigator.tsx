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
import { WelcomeScreen, DemoScreen, DemoListScreen, HomepageScreen } from "../screens"
import { navigationRef, useBackButtonHandler } from "./navigation-utilities"
import { BottomNavigation, BottomNavigationTab, Icon } from "@ui-kitten/components";
import { ScanGreenhousesButton } from "../components";

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type NavigatorParamList = {
  welcome: undefined
  bottomnav: undefined
  // 🔥 Your screens go here
}

export type TabParamList = {
  demo: undefined
  demoList: undefined
  homepage: undefined
  // 🔥 Your tabs go here
}

// Create custom stylesheet
const styles = StyleSheet.create({
  kittenBar: {
    height: 75
  },
  scanButton: {
    height: 10
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
    <BottomNavigationTab icon={<Icon name='people-outline'/>}/>
    <BottomNavigationTab icon={<Icon name='options-2-outline'/>}/>
    <BottomNavigationTab icon={<Icon name='settings-outline'/>}/>
  </BottomNavigation>
);

const AppBottomTab = () => {
  return (
    <Tab.Navigator 
      tabBar={props => <UIKittenBar {...props} />}
    >
      <Tab.Screen
        name="demo"
        component={DemoScreen}
        options={{ title: 'Friends' }}
      />
      
      <Tab.Screen 
        name="homepage"
        component={HomepageScreen}
        options={{
          title: 'Home',
          headerRight: function Scan () {
            return (
              <ScanGreenhousesButton
                style={styles.scanButton} 
                onClick={(event) => {
                  alert(event.type)
                }}  
              />
            )
          }
        }}
      />
      
      <Tab.Screen
        name="demoList"
        component={DemoListScreen}
        options={{ title: 'Account' }}
      /> 
    </Tab.Navigator>
  )
}

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="bottomnav"
    >
      <Stack.Screen name="welcome" component={WelcomeScreen} />
      {/** 🔥 Your screens go here */}
      <Stack.Screen name="bottomnav" component={AppBottomTab} />
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
