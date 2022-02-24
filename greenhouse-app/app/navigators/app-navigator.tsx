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
import { WelcomeScreen, DemoScreen, DemoListScreen, HomepageScreen, ScanScreen, GreenhouseScreen } from "../screens"
import { navigationRef, useBackButtonHandler } from "./navigation-utilities"
import { BottomNavigation, BottomNavigationTab, Icon, Layout, Button } from "@ui-kitten/components";
import { GreenhouseInformation } from "../components";

export type NavigatorParamList = {
  welcome: undefined
  bottomnav: undefined
  // 🔥 Your screens go here
  scan: undefined
  greenhouse: {
    details: GreenhouseInformation
  }
}

export type TabParamList = {
  demo: undefined
  demoList: undefined
  homepage: undefined
  // 🔥 Your tabs go here
}

// Create custom stylesheet
const bgTransparent="transparent";
const styles = StyleSheet.create({
  kittenBar: {
    height: 75
  },
  scanButton: {
    backgroundColor: bgTransparent,
    height: "auto"
  },
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
      initialRouteName="homepage"
    >
      <Tab.Screen
        name="demo"
        component={DemoScreen}
        options={{ title: 'Friends' }}
      />
      
      <Tab.Screen 
        name="homepage"
        component={HomepageScreen}
        options={({navigation}) => ({
          title: 'Home',
          headerRight: function scanButton() {
            return (
              <Layout style={styles.scanButton}>
                <Button
                  appearance='ghost'
                  status='info' 
                  accessoryLeft={<Icon name='plus'/>}
                  onPress={() => navigation.navigate("scan")}
                />
              </Layout>
            );
          },
        })}
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
      initialRouteName="bottomnav"
    >
      <Stack.Screen name="welcome" component={WelcomeScreen} />
      {/** 🔥 Your screens go here */}
      <Stack.Screen name="bottomnav" component={AppBottomTab} options={{
        headerShown: false
      }}/>
      <Stack.Screen name="scan" component={ScanScreen} options={{
        title: "Find your greenhouse",
        animation: "fade",
        headerBackVisible: false,
      }}/>
      <Stack.Screen name="greenhouse" component={GreenhouseScreen} />
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
