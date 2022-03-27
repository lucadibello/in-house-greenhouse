/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React from "react"
import { useColorScheme, StyleSheet, SafeAreaView } from "react-native"
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomepageScreen, ScanScreen, GreenhouseScreen, SettingsScreen, EditPlantScreen } from "../screens"
import { navigationRef, useBackButtonHandler } from "./navigation-utilities"
import { BottomNavigation, BottomNavigationTab, Drawer, DrawerGroup, DrawerItem, Icon, IndexPath } from "@ui-kitten/components";
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

export type DrawerParamList = {
  homepage: undefined,
  profile: undefined,
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
const HomeDrawer = createDrawerNavigator<DrawerParamList>();

// APP TAB BAR
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

// STACK NAVIGATOR
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

// APP DRAWER COMPONENTS
const DrawerContent = ({ navigation, state }) => (
  <Drawer>
    <SafeAreaView>
      <DrawerItem title='Homepage' 
        accessoryLeft={<Icon name='home' fill='#8F9BB3'/>}
        onPress={() => navigation.navigate("homepage")} 
      />
      <DrawerGroup title='Profile' accessoryLeft={<Icon name='person' fill='#8F9BB3'/>}>
        <DrawerItem title='Manage profile' accessoryLeft={<Icon name='edit-2-outline' fill='#8F9BB3'/>}/>
        <DrawerItem title='Sign in' accessoryLeft={<Icon name='plus-square-outline' fill='#8F9BB3'/>}/>
        <DrawerItem title='Login' accessoryLeft={<Icon name='log-in-outline' fill='#8F9BB3'/>}/>
        <DrawerItem title='Logout' accessoryLeft={<Icon name='log-out-outline' fill='#8F9BB3'/>}/>
      </DrawerGroup>
    </SafeAreaView>
  </Drawer>
);


const DrawerNavigator = () => {
  return (
    <HomeDrawer.Navigator
      drawerContent={props => <DrawerContent {...props}/>}
      initialRouteName="homepage"
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeDrawer.Screen name="homepage" component={AppStack}/>
    </HomeDrawer.Navigator>
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
      <DrawerNavigator />
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