import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Drawer, Icon, DrawerGroup, DrawerItem } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native';
import { DrawerParamList } from './navigators';
import { AppStackNavigation } from './stack-navigation';

const HomeDrawer = createDrawerNavigator<DrawerParamList>();

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
        <DrawerItem title='Logout' accessoryLeft={<Icon name='log-out-outline' fill='#8F9BB3'/>}/>
      </DrawerGroup>
    </SafeAreaView>
  </Drawer>
);

export const AppDrawerNavigator = () => {
  return (
    <HomeDrawer.Navigator
      drawerContent={props => <DrawerContent {...props}/>}
      initialRouteName="login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeDrawer.Screen name="homepage" component={AppStackNavigation}/>
    </HomeDrawer.Navigator>
  )
}