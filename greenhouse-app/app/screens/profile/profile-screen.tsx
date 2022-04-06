import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { DrawerScreenProps } from "@react-navigation/drawer"
import { DrawerParamList } from "../../navigators/components/navigators"
import { Text } from '@ui-kitten/components'

export const ProfileScreen: FC<DrawerScreenProps<DrawerParamList, "profile">> = observer(function ProfileScreen() {
  return (
    <Text>Test</Text>
  )
})
