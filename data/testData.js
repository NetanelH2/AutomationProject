// split the data to their own file to make it more maintainable and reusable across the tests
export const testData = {
  password: 'secret_sauce',

  users: {
    standard: 'standard_user',
    lockedOut: 'locked_out_user',
    problem: 'problem_user',
    performanceGlitch: 'performance_glitch_user',
    error: 'error_user',
    visual: 'visual_user',
  },

  checkout: {
    firstName: 'Test',
    lastName: 'User',
    zip: '12345',
  },

  inventory: {
    addItemsCount: 2,
  },
}
