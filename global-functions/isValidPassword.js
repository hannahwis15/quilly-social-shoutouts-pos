// Check if password is valid
// 1. More or equal than 8 alphanumeric characters
// 2. contains alphabet
// 3. contains numerical value
const isValidPassword = password => {
  if (!password) return false;

  if (password.length < 8) return false;

  const hasNumber = /\d/.test(password);
  const hasLetter = /[a-zA-Z]/.test(password);

  return hasNumber && hasLetter;
};

export default isValidPassword;
