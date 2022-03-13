import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { StyleSheet, View } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Avatar, Button, Divider, Icon, Input, Layout, Text, TopNavigation, TopNavigationAction } from "@ui-kitten/components"
import { RouteProp, useRoute } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"

export const EditPlantScreen: FC<StackScreenProps<NavigatorParamList, "greenhouse">> = observer(
  ({navigation}) => {
    // Read route params
    const route = useRoute<RouteProp<NavigatorParamList, 'editPlant'>>();

    // Input state generator
    const useInputState = (initialValue = '') => {
      const [value, setValue] = React.useState(initialValue);
      return { value, onChangeText: setValue };
    };

    // Create input states
    const nameInputState = useInputState(route.params.plant.name);
    const descriptionInputState = useInputState(route.params.plant.description);
    
    // Compute dates
    const createdAtDate = new Date(route.params.plant.created_at).toLocaleString()
    const updatedAtDate = new Date(route.params.plant.updated_at).toLocaleString()

    // Show greenhouse inforamtion
    return (
      <SafeAreaView style={[styles.container, styles.notch]}>
        <TopNavigation
          alignment='center'
          title={route.params.plant.name}
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
            editable={false}            
          />

          {/* PLANT LAST UPDATE DATE  */}
          <Input
            style={styles.input}
            status='primary'
            placeholder='Name'
            autoCapitalize="words"
            caption={"Plant last update"}
            value={updatedAtDate}
            editable={false}            
          />

          <Button style={styles.applyChanges}>Apply changes</Button>
        </Layout>
      </SafeAreaView>
    )
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