import { API_URL, getAuthHeaders, getApiError } from "./apiUtils";

export const getStates = async () => {
  const response = await fetch(`${API_URL}/api/states`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    const errorMessage = await getApiError(response, "Failed to fetch states");
    throw new Error(errorMessage);
  }
  const json = await response.json();
  return json.data.states;
};

export const getDashboardStats = async () => {
  const response = await fetch(`${API_URL}/admin/dashboard/stats`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    const errorMessage = await getApiError(response, "Failed to fetch dashboard stats");
    throw new Error(errorMessage);
  }
  const json = await response.json();
  return json.data;
};

// Forgot Password - Request Reset Token
export const requestPasswordReset = async (email: string) => {
  const formData = new FormData();
  formData.append("email", email);

  const response = await fetch(`${API_URL}/api/forgot-password`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorMessage = await getApiError(response, "Failed to send reset code");
    throw new Error(errorMessage);
  }

  return response.json();
};

// Forgot Password - Reset with Token
export const resetPassword = async (data: { otp_code: string; new_password: string }) => {
  const formData = new FormData();
  formData.append("otp_code", data.otp_code);
  formData.append("new_password", data.new_password);

  const response = await fetch(`${API_URL}/api/reset-password`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorMessage = await getApiError(response, "Failed to reset password. Please check your code and try again");
    throw new Error(errorMessage);
  }

  return response.json();
};
