const API_AUTH = import.meta.env.VITE_API_AUTH;

//register
export const signupRequest = (user) =>
  new Request(`${API_AUTH}/api/auth/signup`, {
    credentials: "include",
    method: "POST",
    body: window.JSON.stringify(user),
    headers: { "Content-Type": "application/json" },
  });

//login
export const signinRequest = (userCredentials) =>
  new Request(`${API_AUTH}/api/auth/signin`, {
    credentials: "include",
    method: "POST",
    body: window.JSON.stringify(userCredentials),
    headers: {
      "Content-type": "application/json",
    },
  });

//logout
export const signoutRequest = () =>
  new Request(`${API_AUTH}/api/auth/signout`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  });

//forgot password
export const forgotPasswordRequest = (email) =>
  new Request(`${API_AUTH}/api/auth/forgotPassword`, {
    credentials: "include",
    method: "POST",
    body: window.JSON.stringify(email),
    headers: {
      "Content-Type": "application/json",
    },
  });

//reset pasword
export const resetPasswordRequest = (password, token) =>
  new Request(`${API_AUTH}/api/auth/resetPassword/${token}`, {
    credentials: "include",
    method: "POST",
    body: window.JSON.stringify(password),
    headers: {
      "Content-type": "application/json",
    },
  });

//verify
export const verifyRequest = () => new Request(
  `${API_AUTH}/api/auth/verify`, {
    credentials: "include",
    method: "GET",
  }
)
