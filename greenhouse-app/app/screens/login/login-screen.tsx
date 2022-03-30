import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Alert, KeyboardAvoidingView, StyleSheet, View } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { Input, Layout, Text, Button, Icon } from "@ui-kitten/components"
import { AuthStackParamList } from "../../navigators/components/navigators"
import { palette } from "../../theme/palette"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useStores } from "../../models"
import { PasswordValidationResult, validateEmailAddress, validatePassword } from "../../utils/validation"

export const LoginScreen: FC<StackScreenProps<AuthStackParamList , "login">> = observer(
  ({navigation}) => {
    // use authenticationStore
    const { authenticationStore } = useStores()

    // show password state
    const [showPassword, setShowPassword] = React.useState(false)

    // email and password input state value
    const [email, setEmail] = React.useState<string>("")
    const [password, setPassword] = React.useState<string>("")

    // Email and password error validation flags
    const [emailError, setEmailError] = React.useState<boolean>(false)
    const [passwordValidationResult, setPasswordValidationResult] = React.useState<PasswordValidationResult>({
      isValid: false,
      hasAtlestEightCharacters: false,
      hasAtlestOneUpperCase: false,
      hasAtlestOneDigit: false,
      hasAtlestOneLowerCase: false,
      hasAtlestOneSpecialCharacter: false,
      hasLessThanSixteenCharacters: false
    })

    // Load data from keychain and set it inside inputs
    React.useEffect(() => {
      // load keychain data from environment
      authenticationStore.loadCredentials((response) => {
        // Check if success
        if (response.success) {
          // Set data inside react state
          setEmail(response.email)
          setPassword(response.password)

          // Log information
          console.tron.debug("Keychain data loaded successfully")
        } else {
          // Log error to tron
          console.tron.error("Keychain data loading failed", []);
        }
      })
    }, [])

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
            accessoryRight={<Icon name='person' fill='#8F9BB3'/>}
            value={email}
            status={emailError ? "danger" : "basic"}
            onChangeText={(emailText) => {
              // Set text inside react state
              setEmail(emailText)
              
              // validate email address and set error flag
              setEmailError(!validateEmailAddress(emailText))
            }}
            style={styles.input}
          />

          {/* Password input */}
          <Input
            placeholder='Password'
            passwordRules="required: upper; required: lower; required: digit; max-consecutive: 2; minlength: 8; maxlength: 16"
            value={password}
            status={passwordValidationResult.isValid ? "danger" : "basic"}
            onChangeText={(passwordText) => {
              // Set text inside react state
              setPassword(passwordText)
              
              // validate password and set error flag
              setPasswordValidationResult(validatePassword(passwordText))
            }}
            secureTextEntry={!showPassword}
            accessoryRight={
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Icon name={showPassword ? 'eye-outline' : 'eye-off-outline'} fill='#8F9BB3' />
              </TouchableOpacity>
            }
            style={[styles.input, styles.passwordInput]}
          />

          {/* Forgot password button */}
          <Button style={styles.input} appearance='ghost' status='info' >
            Forgot your password?
          </Button>

          {/* Footer */}
          <Layout style={styles.footerContainer}>
            {/* Login button */}
            <Button style={styles.input} appearance='filled' status='primary' onPress={() => {
              // check if user has defined email and password otherwise show error
              if (email.length > 0 && password.length > 0) {
                // Send login request to server (screen will be changed automatically)
                authenticationStore.login(email, password, (response) => {
                  // Check response error code for notification
                  if (response.errorCode === "LOGIN_ERROR") {
                    Alert.alert("Ooops..", "Wrong email or password", [{ text: "OK" }])
                  } else {
                    // Show generic alert that shows GraphQL error message
                    Alert.alert("Authentication error", response.errorMessage, [{ text: "OK" }])
                  }
                })
              } else {
                Alert.alert("Please, enter your email and password!")
              }
            }}>
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
    minHeight: 230,
  },
  input: {
    margin: 10
  },
  loginButton: {
    padding: 10
  },
  passwordInput: {
    fontFamily: "opensans-regular",
  }
})
