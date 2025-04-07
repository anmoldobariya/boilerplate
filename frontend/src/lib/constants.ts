export const AUTH_TOKEN = 'authToken';

export const SignInFields = [
  {
    label: 'Email',
    name: 'email',
    placeholder: 'Enter email'
  },
  {
    label: 'Password',
    name: 'password',
    placeholder: 'Enter password',
    type: "password"
  }
] as const;

export const SignUpFields = [
  {
    label: 'Name',
    name: 'name',
    placeholder: 'Enter name'
  },
  ...SignInFields
] as const;
