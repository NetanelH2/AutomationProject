export const password = 'secret_sauce'

export const users = {
  standard: 'standard_user',
  lockedOut: 'locked_out_user',
  problem: 'problem_user',
  performanceGlitch: 'performance_glitch_user',
  error: 'error_user',
  visual: 'visual_user',
}

export const negativeLoginCases = [
  {
    name: 'locked_out_user should be blocked',
    username: users.lockedOut,
    password,
    expectedErrorContains: 'locked out',
  },
  {
    name: 'empty username',
    username: '',
    password,
    expectedErrorContains: 'Username is required',
  },
  {
    name: 'empty password',
    username: users.standard,
    password: '',
    expectedErrorContains: 'Password is required',
  },
  {
    name: 'empty username and password',
    username: '',
    password: '',
    expectedErrorContains: 'Username is required',
  },
  {
    name: 'wrong password',
    username: users.standard,
    password: 'wrong_password',
    expectedErrorContains: 'do not match any user',
  },
  {
    name: 'unknown username',
    username: 'unknown_user',
    password,
    expectedErrorContains: 'do not match any user',
  },
]

export const positiveLoginUsers = [
  { label: 'standard', username: users.standard },
  { label: 'problem', username: users.problem },
  { label: 'performance_glitch', username: users.performanceGlitch },
  { label: 'error', username: users.error },
  { label: 'visual', username: users.visual },
]

export const checkout = {
  firstName: 'Test',
  lastName: 'User',
  zip: '12345',
}

export const inventory = {
  addItemsCount: 2,
}

export const testData = {
  password,
  users,
  negativeLoginCases,
  positiveLoginUsers,
  checkout,
  inventory,
}