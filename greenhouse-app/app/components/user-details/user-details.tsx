import * as React from "react"
import { StyleProp, ViewStyle, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { Avatar, Layout, Text, Tooltip } from "@ui-kitten/components"
import { User } from "../../models/user/user"
import { TouchableOpacity } from "react-native-gesture-handler"
import * as Clipboard from 'expo-clipboard';

export interface UserDetailsProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  user: User
  onUserPress?: () => void
}

/**
 * Describe your component here
 */
export const UserDetails = observer(function UserDetails(props: UserDetailsProps) {
  const [visible, setVisible] = React.useState(false);
  
  const copyToClipboard = (value: string) => {
    Clipboard.setString(value);
    setVisible(true)
  }
  
  return (
    <Layout style={props.style}>
      {/* User avatar */}
      <TouchableOpacity onPress={props.onUserPress}>
        <Avatar style={styles.avatar} size='medium' source={require('../../assets/plant-vase.png')}/>
      </TouchableOpacity>
      {/* Show user information */}
      <Layout style={styles.info}>
        <TouchableOpacity onPress={props.onUserPress}>
          <Text style={styles.boldText}>
            {props.user.name} {props.user.surname}
          </Text>
        </TouchableOpacity>
        
          
        <Tooltip
          anchor={() => (
            <TouchableOpacity onPress={() => copyToClipboard(props.user.email)}>
              <Text>{props.user.email}</Text>
            </TouchableOpacity>
          )}
          visible={visible}
          placement="bottom start"
          onBackdropPress={() => setVisible(false)}>
          User id copied to clipboard!
        </Tooltip>
      </Layout>

    </Layout>
  )
})

const styles = StyleSheet.create({
  avatar: {
    margin: 8,
  },
  boldText: {
    fontWeight: 'bold'
  },
  info: {
    paddingLeft: 15
  }
})
