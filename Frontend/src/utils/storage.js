// Save token to localStorage
export const setToken = (token) => {
  localStorage.setItem("token", token);
};

// Get token from localStorage
export const getToken = () => {
  return localStorage.getItem("token");
};

// Remove token from localStorage
export const removeToken = () => {
  localStorage.removeItem("token");
};

// Save user role ("user" or "admin")
export const setRole = (role) => {
  localStorage.setItem("role", role);
};

// Get stored role
export const getRole = () => {
  return localStorage.getItem("role");
};

// Remove stored role
export const removeRole = () => {
  localStorage.removeItem("role");
};

// Clear all authentication-related data
export const clearAuth = () => {
  removeToken();
  removeRole();
};

// Check whether user is authenticated
export const isAuthenticated = () => {
  return !!getToken();
};

// Check if current logged-in user is admin
export const isAdmin = () => {
  return getRole() === "admin";
};