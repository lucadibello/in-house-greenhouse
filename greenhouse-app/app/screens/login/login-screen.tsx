import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { KeyboardAvoidingView, StyleSheet, View } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { Input, Layout, Text, Button, Icon } from "@ui-kitten/components"
import { AuthStackParamList } from "../../navigators/components/navigators"
import { palette } from "../../theme/palette"
import { TouchableOpacity } from "react-native-gesture-handler"

export const LoginScreen: FC<StackScreenProps<AuthStackParamList , "login">> = observer(
  ({navigation}) => {

    // show password state
    const [showPassword, setShowPassword] = React.useState(false)

    return (
      <KeyboardAvoidingView style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text
            category='h1'
            status='control'
          >
            Hello!
          </Text>
          <Text
            category='s1'
            status='control'
          >
            Sign in to your account
          </Text>
        </View>

        {/* Form */}
        <Layout style={styles.formContainer}>
          {/* E-mail input */}
          <Input 
            placeholder='E-Mail'
            accessoryRight={<Icon name='cube' fill='#8F9BB3'/>}

            style={styles.input}
          />

          {/* Password input */}
          <Input
            placeholder='Password'
            passwordRules="required: upper; required: lower; required: digit; max-consecutive: 2; minlength: 8; maxlength: 16"
            secureTextEntry={!showPassword}
            accessoryRight={
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Icon name={showPassword ? 'eye-outline' : 'eye-off-outline'} fill='#8F9BB3' />
              </TouchableOpacity>
            }
            style={styles.input}
          />

          {/* Forgot password button */}
          <Button style={styles.input} appearance='ghost' status='info' >
            Forgot your password?
          </Button>

          {/* Footer */}
          <Layout style={styles.footerContainer}>
            {/* Login button */}
            <Button style={styles.input} appearance='filled' status='primary' >
              Login
            </Button>

            {/* Sign in button */}
            <Button style={styles.input} appearance='ghost' status='basic' onPress={() => navigation.navigate("signup")} >
              Don't have an account? Sign Up
            </Button>
          </Layout>
        </Layout>
      </KeyboardAvoidingView>
    )
})

const styles = StyleSheet.create({
  alignedBottom: {
    alignItems: 'flex-end',
    flex: 1,
  },
  container: {
    flex: 1,
  },
  footerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  forgotPassword: {
    alignContent: 'flex-end'
  },
  forgotPasswordContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  formContainer: {
    alignContent: 'space-between',
    flex: 1,
    flexDirection: 'column',
    padding: 10
  },
  headerContainer: {
    alignItems: 'center',
    backgroundColor: palette.primaryBlue,
    justifyContent: 'center',
    minHeight: 400,
  },
  input: {
    margin: 10
  },
  loginButton: {
    padding: 10
  }
})