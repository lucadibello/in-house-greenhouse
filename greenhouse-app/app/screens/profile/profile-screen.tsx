import React, { FC } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { observer } from "mobx-react-lite"
import { DrawerScreenProps } from "@react-navigation/drawer"
import { DrawerParamList } from "../../navigators/components/navigators"
import { Avatar, Icon, Layout, TopNavigation, TopNavigationAction, Text, Tooltip } from '@ui-kitten/components'
import { SafeAreaView } from "react-native-safe-area-context"
import { palette } from "../../theme/palette"
import { useStores } from "../../models/root-store/root-store-context"
import { ScrollView } from "react-native-gesture-handler"
import { ImageOverlay } from "../../components/image-overlay/image-overlay"
import * as Clipboard from 'expo-clipboard';

const getAvatarImageURI = (name: string) => {
  // Replace spaces in name with "+"
  const nameFormatted = name.replace(/ /g, "+")
  return `https://ui-avatars.com/api/?background=random&name=${nameFormatted}&size=128&length=2`
}

export const ProfileScreen: FC<DrawerScreenProps<DrawerParamList, "profile">> = observer(
  ({navigation}) => {

    // Load authentication store
    const { authenticationStore } = useStores()

    const [visible, setVisible] = React.useState(false);
  
    const copyToClipboard = (value: string) => {
      Clipboard.setString(value);
      setVisible(true)
    }

    return (
      <SafeAreaView style={[styles.container, styles.notch]}>
        <TopNavigation
          alignment='center'
          title="Profile"
          accessoryLeft={<TopNavigationAction icon={<Icon name='menu'/>} onPress={() => navigation.openDrawer()} />}
        />

        {/* Scroll view */ }
          <Layout style={styles.container}>
            {/* Centered content */}
            <ImageOverlay
              style={styles.header}
              source={require('../../assets/profile-background.jpg')}>
              
              {/* User avatar */}
              <Avatar
                style={styles.profileAvatar}
                source={{uri: getAvatarImageURI(authenticationStore.fullName)}}
              />

              {/* User name and surname */}
              <Text
                style={styles.profileName}
                category='h5'
                status='control'
              >
                {authenticationStore.fullName} 
              </Text>

              {/* User email */}
              <View style={styles.emailContainer}>
                <Tooltip
                  anchor={() => (
                    <TouchableOpacity onPress={() => copyToClipboard(authenticationStore.user.email)}>
                      <Text
                        style={styles.email}
                        status='control'
                      >
                        {authenticationStore.user.email}
                      </Text>
                    </TouchableOpacity>
                  )}
                  visible={visible}
                  placement="bottom start"
                  onBackdropPress={() => setVisible(false)}>
                  Profile id copied to clipboard!
                </Tooltip>
              </View>
            </ImageOverlay>

            {/* Follow details buttons */}
            <ScrollView>
              <Text>User stats will be here</Text>
            </ScrollView>
          </Layout>
      </SafeAreaView>  
    )
})

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  email: {
    marginVertical: 8,
  },
  emailContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  notch: {
    backgroundColor: palette.white,
  },
  profileAvatar: {
    borderRadius: 62,
    height: 124,
    marginVertical: 16,
    width: 124,
  },

  profileName: {
    zIndex: 1,
  },
})