
// Class that represents an authentication error
export class AuthenticationError extends Error {
  constructor(public errorMessage: string) {
    super(errorMessage)
  }
}