// Check whether an email is valid or not by the following criteria :
// 1. There’s at least one character before the @ (no spaces or @ inside the part).
// 2. There’s an @.
// 3. There’s at least one character before and after the . in the domain part.
//
// emailRegex.test(email) returns true if the email matches, false otherwise.
const isValidEmail = email => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default isValidEmail;
