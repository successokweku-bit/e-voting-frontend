import { API_URL, getHeaders, getApiError } from "./apiUtils";
import type { LoginCredentials, RegisterCredentials } from "../types/types";

export const loginService = async (credentials: LoginCredentials) => {
  const formData = new URLSearchParams();
  formData.append("username", credentials.username);
  formData.append("password", credentials.password);

  const response = await fetch(`${API_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
  });

  if (!response.ok) {
    const errorMessage = await getApiError(response, "Email or password is incorrect");
    throw new Error(errorMessage);
  }

  return response.json();
};

export const registerService = async (credentials: RegisterCredentials) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorMessage = await getApiError(response, "Registration failed. Please try again");
    throw new Error(errorMessage);
  }

  return response.json();
};

export const changePassword = async (data: { currentPassword: string; newPassword: string; confirmPassword: string }) => {
  const formData = new FormData();
  formData.append("old_password", data.currentPassword);
  formData.append("new_password", data.newPassword);
  formData.append("confirm_password", data.confirmPassword);

  const response = await fetch(`${API_URL}/auth/change-password`, {
    method: "POST",
    headers: getHeaders(),
    body: formData,
  });

  if (!response.ok) {
    const errorMessage = await getApiError(response, "Failed to change password");
    throw new Error(errorMessage);
  }

  return response.json();
};
