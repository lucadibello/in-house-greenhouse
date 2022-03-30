import React, { FC } from "react"
import { Alert, StyleSheet } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { Avatar, Button, Divider, Icon, Input, Layout, Text, TopNavigation, TopNavigationAction } from "@ui-kitten/components"
import { SafeAreaView } from "react-native-safe-area-context"
import { useStores } from "../../models"
import { observer } from "mobx-react-lite"
import { NavigatorParamList } from "../../navigators/components/navigators"

export const AddPlantScreen: FC<StackScreenProps<NavigatorParamList, "addPlant">> = observer(
  ({navigation}) => {
    // Load greenhouses from store
    const { navigationStore } = useStores()

    if (navigationStore.greenhouseScreenParams.greenhouse !== undefined) {
      // Input state generator
      const useInputState = (initialValue = '') => {
        const [value, setValue] = React.useState(initialValue);
        return { value, onChangeText: setValue };
      };

      // Create input states
      const nameInputState = useInputState();
      const descriptionInputState = useInputState();
      
      // Show greenhouse inforamation
      return (
      <SafeAreaView style={[styles.container, styles.notch]}>
        <TopNavigation
          alignment='center'
          title={"Add new plant"}
          subtitle={'Add new plant inside "' + navigationStore.greenhouseScreenParams.greenhouse.name + '"'}
          accessoryLeft={<TopNavigationAction icon={<Icon name='arrow-back'/>} onPress={() => navigation.goBack()} />}
        />
        <Divider />

        <Layout style={styles.avatarContainer}>
          <Avatar size='giant' style={styles.avatar} source={require('../../assets/plant-vase.png')}/>
        </Layout>

        
        <Layout style={styles.form}>
          {/* PLANT NAME */}
          <Input
            style={styles.input}
            status='primary'
            placeholder='Name'
            autoCapitalize="words"
            caption={"Plant name"}
            {...nameInputState}
          />

          {/* PLANT DESCRIPTION */}
          <Input
            style={styles.input}
            status='primary'
            placeholder='Plant description'
            autoCapitalize="words"
            caption={"Plant description"}
            {...descriptionInputState}
          />

          {/* UPDATE PLANT DATA */}
          <Button style={styles.applyChanges} onPress={() => {
            // Check data
            if (nameInputState.value.length > 0) {
              // Save data through API
              navigationStore.greenhouseScreenParams.greenhouse.addPlant({
                name: nameInputState.value,
                description: descriptionInputState.value
              })
              // Go back
              navigation.goBack()
            } else {
              Alert.alert("You have to specify a valid name!")
            }
          }}>Create plant</Button>
        </Layout>
      </SafeAreaView>
      )
    } else {
      return (
        <SafeAreaView>
          <Text>TEST</Text>
        </SafeAreaView>
      )
    }
  }
)

const notchColor = '#FFF'
const styles = StyleSheet.create({
  applyChanges: {
    marginTop: 10
  },
  avatar: {
    height: 128,
    width: 128
  },
  avatarContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 8,
  },
  container: {
    flex: 1
  },
  form: {
    alignContent: 'space-between',
    flex: 1,
    flexDirection: 'column',
    padding: 10
  },
  input: {
    margin: 2,
  },
  notch: {
    backgroundColor: notchColor,
  }
})