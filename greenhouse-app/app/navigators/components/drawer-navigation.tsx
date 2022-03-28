import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Drawer, Icon, DrawerGroup, DrawerItem, Text } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native';
import { DrawerParamList } from './navigators';
import { AppStackNavigation } from './stack-navigation';
import { useStores } from '../../models/root-store/root-store-context';
import { LoginAppStackNavigation } from './auth-stack-navigation';
import { observer } from 'mobx-react-lite';

const HomeDrawer = createDrawerNavigator<DrawerParamList>();

const DrawerContent = (props: { navigation, state, logoutUser: () => void }) => (
  <Drawer>
    <SafeAreaView>
      <DrawerItem title='Homepage' 
        accessoryLeft={<Icon name='home' fill='#8F9BB3'/>}
        onPress={() => props.navigation.navigate("homepage")} 
      />
      <DrawerGroup title='Profile' accessoryLeft={<Icon name='person' fill='#8F9BB3'/>}>
        <DrawerItem title='Manage profile' accessoryLeft={<Icon name='edit-2-outline' fill='#8F9BB3'/>}/>
        <DrawerItem
          title='Logout'
          onPress={props.logoutUser}
          accessoryLeft={<Icon name='log-out-outline' fill='#8F9BB3'/>}
        />
      </DrawerGroup>
    </SafeAreaView>
  </Drawer>
);

export const AppDrawerNavigator = observer(() => {
  const { authenticationStore } = useStores();

  return (
    <HomeDrawer.Navigator
      drawerContent={props => (
        <DrawerContent 
          logoutUser={() => {
            // Close drawer
            props.navigation.closeDrawer();
            // Logout user
            authenticationStore.logout()
          }}
          {...props}
        />
      )}
      initialRouteName="homepage"
      screenOptions={{
        headerShown: false,
        swipeEnabled: authenticationStore.isAuthenticated
      }}
    >
      { authenticationStore.isAuthenticated ? (
        <HomeDrawer.Screen name="homepage" component={AppStackNavigation} />
      ): (
        <HomeDrawer.Screen name="homepage" component={LoginAppStackNavigation} />
      )}
    </HomeDrawer.Navigator>
  )
})