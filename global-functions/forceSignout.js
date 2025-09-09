// used if the system return 401 response
const forceSignout = (navigation, setGlobalVariableValue) => {
  // clear the token
  setGlobalVariableValue({
    key: 'AUTHORIZATION_TOKEN',
    value: null,
  });

  // go back to login
  navigation.navigate('User - Login');
};

export default forceSignout;
