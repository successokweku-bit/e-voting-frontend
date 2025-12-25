import { API_URL, getHeaders, getJsonAuthHeaders, getApiError } from "./apiUtils";
import type { RegisterCredentials } from "../types/types";

export const getVoters = async () => {
  const response = await fetch(`${API_URL}/admin/users`, {
    headers: getJsonAuthHeaders(),
  });

  if (!response.ok) {
    const errorMessage = await getApiError(response, "Failed to fetch voters");
    throw new Error(errorMessage);
  }

  const data = await response.json();
  return data.data;
};

export const getVoter = async (id: string) => {
  const response = await fetch(`${API_URL}/admin/users/${id}`, {
    headers: getJsonAuthHeaders(),
  });

  if (!response.ok) {
    const errorMessage = await getApiError(response, "Failed to fetch voter details");
    throw new Error(errorMessage);
  }

  const data = await response.json();
  return data.data;
};

export const updateVoter = async (id: string, data: Partial<RegisterCredentials>) => {
  const formData = new FormData();
  formData.append("nin", data.nin || "");
  formData.append("is_active", String(data.is_active ?? ""));
  formData.append("is_verified", String(data.is_verified ?? ""));
  formData.append("email", data.email || "");
  formData.append("full_name", data.full_name || "");
  formData.append("state_of_residence", data.state_of_residence || "");
  formData.append("date_of_birth", data.date_of_birth || "");

  const response = await fetch(`${API_URL}/admin/users/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: formData,
  });

  if (!response.ok) {
    const errorMessage = await getApiError(response, "Failed to update voter");
    throw new Error(errorMessage);
  }

  return response.json();
};

export const deleteVoter = async (id: string) => {
  const response = await fetch(`${API_URL}/admin/users/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorMessage = await getApiError(response, "Failed to delete voter");
    throw new Error(errorMessage);
  }

  return response.json();
};
