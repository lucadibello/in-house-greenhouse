import React from "react"
import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation, BottomNavigationTab, Icon } from "@ui-kitten/components";
import { HomepageScreen, SettingsScreen } from "../../screens";
import { TabParamList } from "./navigators";

const Tab = createBottomTabNavigator<TabParamList>();

// APP TAB BAR
const UIKittenBar = ({ navigation, state }) => (
  <BottomNavigation
    style={styles.kittenBar}
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab icon={<Icon name='options-2-outline'/>}/>
    <BottomNavigationTab icon={<Icon name='settings-outline'/>}/>
  </BottomNavigation>
);

export const AppTabNavigator = () => {
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

// Create custom stylesheet
const styles = StyleSheet.create({
  kittenBar: {
    height: 75
  }
});