import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Drawer, Icon, DrawerGroup, DrawerItem, Divider } from '@ui-kitten/components';
import { SafeAreaView, StyleSheet } from 'react-native';
import { DrawerParamList } from './navigators';
import { AppStackNavigation } from './stack-navigation';
import { useStores } from '../../models/root-store/root-store-context';
import { observer } from 'mobx-react-lite';
import { UserDetails } from '../../components';
import { User } from '../../models';
import { ProfileScreen } from '../../screens';

const HomeDrawer = createDrawerNavigator<DrawerParamList>();

const styles = StyleSheet.create({
  userDetails: {
    marginBottom: 10
  }
})

const DrawerContent = (props: { navigation, state, logoutUser: () => void, user: User, userDetailsClicked: () => void}) => (
  <React.Fragment>
    <SafeAreaView>
      {/* User details */}
      <UserDetails style={styles.userDetails} user={props.user} onUserPress={props.userDetailsClicked} />

      {/* Drawer options */}
      <Drawer>
          <DrawerItem title='Homepage' 
            accessoryLeft={<Icon name='home' fill='#8F9BB3'/>}
            onPress={() => props.navigation.navigate("homepage")} 
          />
          <DrawerItem
            title='Profile'
            accessoryLeft={<Icon name='person' fill='#8F9BB3'/>}
            onPress={() => props.navigation.navigate("profile")}
          />
          <DrawerItem
            title='Logout'
            onPress={props.logoutUser}
            accessoryLeft={<Icon name='log-out-outline' fill='#8F9BB3'/>}
          />
      </Drawer>
    </SafeAreaView>
  </React.Fragment>
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
          userDetailsClicked={() => {
            // Go to user profile page
            props.navigation.navigate("profile")
          }}
          user={authenticationStore.user}
          {...props}
        />
      )}
      initialRouteName="homepage"
      screenOptions={{
        headerShown: false,
        swipeEnabled: authenticationStore.isAuthenticated
      }}
    >
      <HomeDrawer.Screen name="homepage" component={AppStackNavigation} />
      <HomeDrawer.Screen name="profile" component={ProfileScreen} />
    </HomeDrawer.Navigator>
  )
})
