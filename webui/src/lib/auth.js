export async function signIn(email) {
  const fetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  };
  try {
    const response = await fetch('http://localhost:8001/signin', fetchOptions);
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export function isLoggedIn() {
  return !!window.localStorage.authToken;
}
