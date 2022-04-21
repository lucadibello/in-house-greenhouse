import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { AuthStackParamList } from "../../navigators/components/navigators"
import { useStores } from "../../models"
import { Alert, TouchableOpacity, View, StyleSheet } from "react-native"
import { Icon, Input, Layout, Text, Button } from "@ui-kitten/components"
import { palette } from "../../theme/palette"
import { PasswordValidationResult, validateEmailAddress, validateName, validatePassword, validateSurname } from "../../utils/validation"
import { ScrollView } from "react-native-gesture-handler"
import { PasswordValidation } from "../../components"

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
    const [name, setName] = React.useState("")
    const [surname, setSurname] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [confirmPassword, setConfirmPassword] = React.useState("")

    // email and password error validation flags
    const [nameError, setNameError] = React.useState(false)
    const [surnameError, setSurnameError] = React.useState(false)
    const [emailError, setEmailError] = React.useState(false)
    const [passwordValidationResult, setPasswordValidationResult] = React.useState<PasswordValidationResult>(emptyPasswordValidationResult)
    const [confirmPasswordError, setConfirmPasswordError] = React.useState<boolean>(false)

    return (
      <ScrollView style={styles.container}>
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

          {/* Name input */}
          <Input 
            placeholder='Name'
            accessoryRight={<Icon name='person' fill='#8F9BB3'/>}
            value={name}
            status={nameError ? "danger" : (name.length !== 0 ? "success": "basic")}
            onChangeText={(nameText) => {
              // to lower case
              nameText = nameText.toLowerCase().trim()

              // capitalize first letter
              nameText = nameText.charAt(0).toUpperCase() + nameText.slice(1)

              // Set text inside react state
              setName(nameText)
              
              // validate email address and set error flag
              setNameError(!validateName(nameText))
            }}
            style={styles.input}
          />

          {/* Surname input */}
          <Input 
            placeholder='Surname'
            accessoryRight={<Icon name='person' fill='#8F9BB3'/>}
            value={surname}
            status={surnameError ? "danger" : (surname.length !== 0 ? "success": "basic")}
            onChangeText={(surnameText) => {
              // Split each word of the name
              const nameWords = surnameText.split(" ")
              // Capitalize each word's first letter
              const capitalizedNameWords = nameWords.map(word => {
                return word.charAt(0).toUpperCase() + word.slice(1)
              })
              // Join the words with a space
              const capitalizedSurname = capitalizedNameWords.join(" ")

              // Set text inside react state
              setSurname(capitalizedSurname) 
              
              // validate email address and set error flag
              setSurnameError(!validateSurname(capitalizedSurname))
            }}
            style={styles.input}
          />

          {/* E-mail input */}
          <Input 
            placeholder='E-Mail'
            accessoryRight={<Icon name='person' fill='#8F9BB3'/>}
            value={email}
            status={emailError ? "danger" : (email.length !== 0 ? "success": "basic")}
            onChangeText={(emailText) => {
              // to lower case
              emailText = emailText.toLowerCase().trim()

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
              // Remove spaces from password
              passwordText = passwordText.trim()

              // Set text inside react state
              setPassword(passwordText.trim())
              
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
            secureTextEntry={true}
            onChangeText={(confirmPasswordText) => {
              // remove whitespace
              confirmPasswordText = confirmPasswordText.trim()

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

          <PasswordValidation result={passwordValidationResult} />

          {/* Footer */}
          <Layout style={styles.footerContainer}>
            {/* Login button */}
            <Button style={[styles.input, styles.loginButton]} appearance='filled' status='primary' onPress={() => {
              // check if the email and password are valid
              if (validateName(name) && validateSurname(surname) && validateEmailAddress(email) && validatePassword(password).isValid) {
                // Check if password and confirm password are the same
                if (password === confirmPassword) {
                  // Send login request to server (screen will be changed automatically)
                  authenticationStore.register(name, surname, email, password, (response) => {
                    // Show generic alert that shows GraphQL error message
                    Alert.alert("Authentication error", response.errorMessage, [{ text: "OK" }])
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
      </ScrollView>
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
  passwordValidationStatus: {
    color: palette.lightGrey,
    textAlign: "center",
  }
})
