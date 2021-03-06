import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen, SignupScreen } from "../../screens";
import { AuthStackParamList } from "./navigators";

const Stack = createNativeStackNavigator<AuthStackParamList >();

// STACK NAVIGATOR
export const LoginAppStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="login"
      screenOptions={{  
        headerShown: false,
        animationTypeForReplace: 'push',
      }}
    >
      <Stack.Screen name="login" component={LoginScreen}/>
      <Stack.Screen name="signup" component={SignupScreen}/>
    </Stack.Navigator>
  )
}