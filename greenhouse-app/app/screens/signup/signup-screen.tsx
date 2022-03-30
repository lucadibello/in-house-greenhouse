import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { AuthStackParamList } from "../../navigators/components/navigators"
import { useStores } from "../../models"
import { Alert, KeyboardAvoidingView, TouchableOpacity, View, StyleSheet, FlatList} from "react-native"
import { Icon, Input, Layout, Text, Button, List, ListItem } from "@ui-kitten/components"
import { palette } from "../../theme/palette"
import { PasswordValidationResult, validateEmailAddress, validatePassword } from "../../utils/validation"

const emptyPasswordValidationResult: PasswordValidationResult = {
  isValid: false,
  hasAtlestEightCharacters: false,
  hasAtlestOneUpperCase: false,
  hasAtlestOneDigit: false,
  hasAtlestOneLowerCase: false,
  hasAtlestOneSpecialCharacter: false,
  hasLessThanSixteenCharacters: false
}

const countHowManyValidated = (passwordValidationResult: PasswordValidationResult) => {
  let count = 0
  if (passwordValidationResult.hasAtlestEightCharacters) count++
  if (passwordValidationResult.hasAtlestOneUpperCase) count++
  if (passwordValidationResult.hasAtlestOneDigit) count++
  if (passwordValidationResult.hasAtlestOneLowerCase) count++
  if (passwordValidationResult.hasAtlestOneSpecialCharacter) count++
  if (passwordValidationResult.hasLessThanSixteenCharacters) count++
  return count 
}

  export const SignupScreen: FC<StackScreenProps<AuthStackParamList, "signup">> = observer(
  ({navigation}) => {
    // use authenticationStore
    const { authenticationStore } = useStores()

    // show password state
    const [showPassword, setShowPassword] = React.useState(false)

    // email and password input state value
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [confirmPassword, setConfirmPassword] = React.useState("")

    // email and password error validation flags
    const [emailError, setEmailError] = React.useState(false)
    const [passwordValidationResult, setPasswordValidationResult] = React.useState<PasswordValidationResult>(emptyPasswordValidationResult)
    const [confirmPasswordError, setConfirmPasswordError] = React.useState<boolean>(false)

    return (
      <KeyboardAvoidingView style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text
            category='h1'
            status='control'
          >
            Welcome.
          </Text>
          <Text
            category='s1'
            status='control'
          >
            Start your amazing journey with us!
          </Text>
        </View>

        {/* Form */}
        <Layout style={styles.formContainer}>
          {/* E-mail input */}
          <Input 
            placeholder='E-Mail'
            accessoryRight={<Icon name='person' fill='#8F9BB3'/>}
            value={email}
            status={emailError ? "danger" : (email.length !== 0 ? "success": "basic")}
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
            caption={() => {
              // Show how many password properties are valid out of the total
              return (
                <Text style={styles.passwordValidationStatus}>
                  { countHowManyValidated(passwordValidationResult) } out of 6 properties are valid
                </Text>
              )
            }}
            status={passwordValidationResult.isValid ? (password.length !== 0 ? "success" : "basic") : (password.length !== 0 ? "danger" : "basic")}
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

          {/* Confirm password input */}
          <Input
            placeholder='Confirm password'
            passwordRules="required: upper; required: lower; required: digit; max-consecutive: 2; minlength: 8; maxlength: 16"
            value={confirmPassword}
            disabled={!passwordValidationResult.isValid}
            status={confirmPasswordError ? (confirmPassword.length !== 0 ? "danger" : "control") : (confirmPassword.length !== 0 ? "success": "basic")}
            onChangeText={(confirmPasswordText) => {
              // Set text inside react state
              setConfirmPassword(confirmPasswordText)
              
              // set error if the password and confirm password are not the same
              setConfirmPasswordError(confirmPasswordText !== password)
            }}
            caption={() => {
              if (confirmPasswordError) {
                return <Text style={styles.confirmPasswordErrorCaption}>The two password does not match</Text>
              } else {
                return null
              }
            }}
            accessoryRight={<Icon name="lock" fill='#8F9BB3'/>}
            style={[styles.input, styles.passwordInput]}
          />
          <Layout>
            {/* Show to the user which properties of the password are not valid */}
            <List
              style={styles.passwordValidationList}
              persistentScrollbar={true}
              data={[
                {key: 'at least 8 characters', isValid: passwordValidationResult.hasAtlestEightCharacters},
                {key: 'at least one upper case', isValid: passwordValidationResult.hasAtlestOneUpperCase},
                {key: 'at least one digit', isValid: passwordValidationResult.hasAtlestOneDigit},
                {key: 'at least one lower case', isValid: passwordValidationResult.hasAtlestOneLowerCase},
                {key: 'at least one special character', isValid: passwordValidationResult.hasAtlestOneSpecialCharacter},
                {key: 'less than 16 characters', isValid: passwordValidationResult.hasLessThanSixteenCharacters}
              ].sort((a, b) => {
                // sort the list by the isValid flag
                if (a.isValid && !b.isValid) {
                  return 1
                } else if (!a.isValid && b.isValid) {
                  return -1
                }
                return 0
              })}
              renderItem={({item}) => (
                <ListItem
                  title={item.key}
                  accessoryLeft={item.isValid ? <Icon name="done-all-outline" fill='#228B22' /> : <Icon name="close-outline" fill="#FF5733"/>}
                />
              )}
            />
          </Layout>

          {/* Footer */}
          <Layout style={styles.footerContainer}>
            {/* Login button */}
            <Button style={[styles.input, styles.loginButton]} appearance='filled' status='primary' onPress={() => {
              // check if the email and password are valid
              if (validateEmailAddress(email) && validatePassword(password).isValid) {
                // Check if password and confirm password are the same
                if (password === confirmPassword) {
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
                  // notify user that the passwords are not the same
                  Alert.alert("Password error", "Passwords do not match. Please try again.", [{ text: "OK" }])
                  // Clear confirm password input
                  setConfirmPassword("")
                }
              } else {
                Alert.alert("Please, enter your email and password!")
              }
            }}>
              Sign up
            </Button>

            {/* Sign in button */}
            <Button style={styles.input} appearance='ghost' status='basic' onPress={() => navigation.navigate("login")} >
              You already got an account? Sign In
            </Button>
          </Layout>
        </Layout>
      </KeyboardAvoidingView>
    )
})

const styles = StyleSheet.create({
  confirmPasswordErrorCaption: {
    color: palette.angry,
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
  },
  footerContainer: {
    flex: 1,
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
    backgroundColor: palette.coolors.bluishGreen,
    justifyContent: 'center',
    minHeight: 230,
  },
  input: {
    margin: 10
  },
  loginButton: {
    backgroundColor: palette.coolors.bluishGreen,
  },
  passwordInput: {
    fontFamily: "opensans-regular",
  },
  passwordValidationList: {
    maxHeight: "70%",
  },
  passwordValidationStatus: {
    color: palette.lightGrey,
    textAlign: "center",
  }
})
