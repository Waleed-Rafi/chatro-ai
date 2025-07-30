// Simple email validation test
export const testEmailValidation = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(email);

  console.log('🔍 Email validation test:');
  console.log('Email:', email);
  console.log('Regex valid:', isValid);
  console.log('Length:', email.length);
  console.log('Contains @:', email.includes('@'));
  console.log('Contains .:', email.includes('.'));

  return isValid;
};
