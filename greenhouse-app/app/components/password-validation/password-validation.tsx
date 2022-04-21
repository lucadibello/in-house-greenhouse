import * as React from "react"
import { observer } from "mobx-react-lite"
import { PasswordValidationResult } from "../../utils/validation"
import { Layout, ListItem, Icon } from "@ui-kitten/components"

/**
 * Describe your component here
 */
export const PasswordValidation = observer(function PasswordValidation(props: {result: PasswordValidationResult}) {
  const data = [
    {key: 'at least 8 characters', isValid: props.result.hasAtlestEightCharacters},
    {key: 'at least one upper case', isValid: props.result.hasAtlestOneUpperCase},
    {key: 'at least one digit', isValid: props.result.hasAtlestOneDigit},
    {key: 'at least one lower case', isValid: props.result.hasAtlestOneLowerCase},
    {key: 'at least one special character', isValid: props.result.hasAtlestOneSpecialCharacter},
    {key: 'less than 16 characters', isValid: props.result.hasLessThanSixteenCharacters}
  ].sort((a, b) => {
    // sort the list by the isValid flag
    if (a.isValid && !b.isValid) {
      return 1
    } else if (!a.isValid && b.isValid) {
      return -1
    }
    return 0
  })

  return (
    <Layout>
      {/* Show to the user which properties of the password are not valid */}
      {data.map((item, index) => {
        return (
          <ListItem
            key={index}
            title={item.key}
            accessoryLeft={item.isValid ? <Icon name="done-all-outline" fill='#228B22' /> : <Icon name="close-outline" fill="#FF5733"/>}
          />
        )
      })}
    </Layout>
  )
})
