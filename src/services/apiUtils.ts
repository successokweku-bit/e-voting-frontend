export const API_URL = import.meta.env.VITE_BASE_URL;

export const getHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};
export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/x-www-form-urlencoded",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const getJsonAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// Error message mapping for user-friendly messages
const errorMessageMap: Record<string, string> = {
  // Authentication errors
  "incorrect username or password": "Email or password is incorrect",
  "invalid credentials": "Email or password is incorrect",
  "wrong password": "The password you entered is incorrect",
  "invalid password": "The password you entered is incorrect",
  "user not found": "No account found with this email",
  "email not found": "No account found with this email",
  "invalid email": "Please enter a valid email address",
  "unauthorized": "Please log in to continue",
  "token expired": "Your session has expired. Please log in again",
  "invalid token": "Your session is invalid. Please log in again",

  // Registration errors
  "email already exists": "An account with this email already exists",
  "user already exists": "An account with this email already exists",
  "email already registered": "This email is already registered",

  // Password errors
  "password too short": "Password must be at least 8 characters",
  "passwords do not match": "Passwords do not match",
  "old password incorrect": "Current password is incorrect",
  "current password incorrect": "Current password is incorrect",
  "wrong old password": "Current password is incorrect",

  // Validation errors
  "validation error": "Please check your input and try again",
  "field required": "Please fill in all required fields",

  // Voting errors
  "already voted": "You have already voted for this position",
  "election not active": "This election is not currently active",
  "election ended": "This election has ended",
  "not eligible": "You are not eligible to vote in this election",

  // General errors
  "not found": "The requested resource was not found",
  "server error": "Something went wrong. Please try again later",
  "network error": "Unable to connect. Please check your internet connection",
};

export const mapErrorMessage = (error: string | undefined, defaultMessage: string): string => {
  if (!error) return defaultMessage;

  const lowerError = error.toLowerCase();

  // Check for exact matches first
  if (errorMessageMap[lowerError]) {
    return errorMessageMap[lowerError];
  }

  // Check for partial matches
  for (const [key, value] of Object.entries(errorMessageMap)) {
    if (lowerError.includes(key)) {
      return value;
    }
  }

  // Return the original error if no mapping found, or default
  return error || defaultMessage;
};

// Helper to extract error message from API response
export const getApiError = async (response: Response, defaultMessage: string): Promise<string> => {
  try {
    const errorData = await response.json();
    const rawError = errorData.error || errorData.message || errorData.detail;
    return mapErrorMessage(rawError, defaultMessage);
  } catch {
    return defaultMessage;
  }
};
