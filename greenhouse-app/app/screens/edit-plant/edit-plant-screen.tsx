import React, { FC } from "react"
import { StyleSheet } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { Avatar, Button, Divider, Icon, Input, Layout, Text, TopNavigation, TopNavigationAction } from "@ui-kitten/components"
import { SafeAreaView } from "react-native-safe-area-context"
import { useStores } from "../../models"
import { observer } from "mobx-react-lite"
import { NavigatorParamList } from "../../navigators/components/navigators"

export const EditPlantScreen: FC<StackScreenProps<NavigatorParamList, "editPlant">> = observer(
  ({navigation}) => {
    // Load greenhouses from store
    const { navigationStore } = useStores()

    if (navigationStore.editPlantScreenParams.plant !== undefined) {
      // Input state generator
      const useInputState = (initialValue = '') => {
        const [value, setValue] = React.useState(initialValue);
        return { value, onChangeText: setValue };
      };

      // Create input states
      const nameInputState = useInputState(navigationStore.editPlantScreenParams.plant.name);
      const descriptionInputState = useInputState(navigationStore.editPlantScreenParams.plant.description);
      
      // Compute dates
      const createdAtDate = new Date(navigationStore.editPlantScreenParams.plant.created_at).toLocaleString()
      const updatedAtDate = new Date(navigationStore.editPlantScreenParams.plant.updated_at).toLocaleString()

      // Show greenhouse inforamtion
      return (
      <SafeAreaView style={[styles.container, styles.notch]}>
        <TopNavigation
          alignment='center'
          title={navigationStore.editPlantScreenParams.plant.name}
          subtitle='Edit plant information'
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

          {/* PLANT CREATION DATE */}
          <Input
            style={styles.input}
            status='primary'
            placeholder='Name'
            autoCapitalize="words"
            caption={"Plant creation date"}
            value={createdAtDate}
            disabled={true}            
          />

          {/* PLANT LAST UPDATE DATE  */}
          <Input
            style={styles.input}
            status='primary'
            placeholder='Name'
            autoCapitalize="words"
            caption={"Plant last update"}
            value={updatedAtDate}
            disabled={true}            
          />

          {/* UPDATE PLANT DATA */}
          <Button style={styles.applyChanges} onPress={() => {
            navigationStore.editPlantScreenParams.plant.updatePlant(
              {
                name: nameInputState.value,
                description: descriptionInputState.value
              }
            )
          }}>Apply changes</Button>
        </Layout>
      </SafeAreaView>
      )
    } else {
      return (
        <Text>NOOO UNDEFINED!!!</Text>
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