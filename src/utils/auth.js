export const isLoggedIn = () => {
  return !!localStorage.getItem("loggedIn");
};

export const logout = () => {
  localStorage.removeItem("loggedIn");
  window.location.href = "/login";
};