import React, { FC } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { observer } from "mobx-react-lite"
import { DrawerScreenProps } from "@react-navigation/drawer"
import { DrawerParamList } from "../../navigators/components/navigators"
import { Avatar, Icon, Layout, TopNavigation, TopNavigationAction, Text, Tooltip, Divider } from '@ui-kitten/components'
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
    const { authenticationStore, greenhouseStore } = useStores()
    const [visible, setVisible] = React.useState(false);
  
    const copyToClipboard = (value: string) => {
      Clipboard.setString(value);
      setVisible(true)
    }

    // Load statistics from data store
    const [totalPlant, setTotalPlants] = React.useState(0)
    const [totalPlantsInGreenhouses, setTotalPlantsInGreenhouses] = React.useState(0)

    React.useEffect(() => {
      // Reset counter
      setTotalPlants(0)
      setTotalPlantsInGreenhouses(0)

      let inTotal = 0;
      let inGreenhouse = 0;

      // Load plants from data store
      greenhouseStore.greenhouses.forEach(greenhouse => {
        // For each plant in greenhouse, increase total plants by 1 and (if plant is not deleted) increase total plants in greenhouses by 1
        greenhouse.plants.forEach(plant => {
          inTotal += 1
          if (!plant.isDeleted) {
            inGreenhouse += 1
          } 
        })
      })

      // Update counter
      setTotalPlants(inTotal)
      setTotalPlantsInGreenhouses(inGreenhouse)
    }, [greenhouseStore.greenhouses])

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
              <Layout style={styles.stats}>
                <Text category={"h5"}>Total plants ever grown:</Text>
                <Text category={"h5"}>{totalPlant}</Text>
                <Divider style={styles.statsDivider} />
                <Text category={"h5"}>Total growing plants:</Text>
                <Text category={"h5"}>{totalPlantsInGreenhouses}</Text>
              </Layout>
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
  stats: {
    padding: 10
  },
  statsDivider: {
    marginBottom: 10,
    marginTop: 10
  }
})