
export interface PasswordValidationResult {
  isValid: boolean;
  hasAtlestOneUpperCase: boolean;
  hasAtlestOneLowerCase: boolean;
  hasAtlestOneDigit: boolean;
  hasAtlestOneSpecialCharacter: boolean;
  hasAtlestEightCharacters: boolean;
  hasLessThanSixteenCharacters: boolean;
}

/**
 * validateEmailAddress - Validates an email address
 * @param email Email address to validate
 * @returns true if valid, false if not
 */
export const validateEmailAddress = (email: string): boolean => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

/**
 * validatePassword - Validates a person name
 * @param name Name to validate
 * @returns Ture if valid, false if not
 */
export const validateName = (name: string): boolean => {
  const re = /^[a-zA-Z]+$/;
  return re.test(String(name).toLowerCase());
}

export const validateSurname = (surname: string): boolean => {
  // A surname is composed by multiple names separated by a whitespace
  const names = surname.split(" ");
  for (const name of names) {
    if (!validateName(name)) {
      return false;
    }
  }
  return true
}

/**
 * validatePassword - Validates a password string
 * - at least one upper case letter
 * - one lower case letter
 * - one digit
 * - at least 1 special character
 * - at least 8 characters long
 * - maximum 16 characters long
 * @param password password to validate
 */
export const validatePassword = (password: string): PasswordValidationResult => {
  // Check for minimum length with regex
  const validationResult = {
    isValid: false,
    hasAtlestOneUpperCase: false,
    hasAtlestOneLowerCase: false,
    hasAtlestOneDigit: false,
    hasAtlestOneSpecialCharacter: false,
    hasAtlestEightCharacters: false,
    hasLessThanSixteenCharacters: false,
  }

  // regex to check for at least one upper case letter
  const upperCaseRegex = /[A-Z]/;
  // regex to check for at least one lower case letter
  const lowerCaseRegex = /[a-z]/;
  // regex to check for at least one digit
  const digitRegex = /[0-9]/;
  // regex to check for at least one special character
  const specialCharacterRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
  // regex to check for at least eight characters long
  const eightCharacterRegex = /.{8,}/;
  // regex to check for maximum sixteen characters long and at least 1 character
  const sixteenCharacterRegex = /^.{1,16}$/;

  // Test each regex and set the validation result
  validationResult.hasAtlestOneUpperCase = upperCaseRegex.test(password);
  validationResult.hasAtlestOneLowerCase = lowerCaseRegex.test(password);
  validationResult.hasAtlestOneDigit = digitRegex.test(password);
  validationResult.hasAtlestOneSpecialCharacter = specialCharacterRegex.test(password);
  validationResult.hasAtlestEightCharacters = eightCharacterRegex.test(password);
  validationResult.hasLessThanSixteenCharacters = sixteenCharacterRegex.test(password);

  // check if password is valid
  validationResult.isValid = validationResult.hasAtlestOneUpperCase &&
    validationResult.hasAtlestOneLowerCase &&
    validationResult.hasAtlestOneDigit &&
    validationResult.hasAtlestOneSpecialCharacter &&
    validationResult.hasAtlestEightCharacters &&
    validationResult.hasLessThanSixteenCharacters;

  // return validation result object
  return validationResult;
}