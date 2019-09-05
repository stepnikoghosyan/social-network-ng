export const AUTH_MESSAGES = {
  email: [
    {type: 'required', message: 'Email is required.'},
    {type: 'pattern', message: 'Please enter a valid email.'}
  ],
  password: [
    {type: 'required', message: 'Password is required.'},
    {type: 'pattern', message: 'Password must contain at least 8 characters, 1 symbol, 1 number.'}
  ],
  firstName: [
    {type: 'required', message: 'First name is required.'}
  ],
  lastName: [
    {type: 'required', message: 'Last name is required.'}
  ]
};

