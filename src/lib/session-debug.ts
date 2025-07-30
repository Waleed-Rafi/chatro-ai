// Session debugging utility
export const debugSession = () => {
  // Check cookies
  const cookies = document.cookie;

  // Check localStorage
  const supabaseAuthToken = localStorage.getItem(
    'sb-livzhkkfnbcjhxhcrgmg-auth-token'
  );

  // Check sessionStorage
  const sessionStorageKeys = Object.keys(sessionStorage);

  return {
    hasCookies: cookies.length > 0,
    hasLocalStorageToken: !!supabaseAuthToken,
    hasSessionStorage: sessionStorageKeys.length > 0,
  };
};
