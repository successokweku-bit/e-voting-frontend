import { API_URL, getAuthHeaders } from "./apiUtils";
import type { RegisterCredentials } from "../types/types";

export const getVoters = async () => {
  const response = await fetch(`${API_URL}/admin/users`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch voters");
  const data = await response.json();
  return data.data;
};

export const getVoter = async (id: string) => {
  const response = await fetch(`${API_URL}/admin/users/${id}`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch voter");
  const data = await response.json();
  return data.data;
};

export const updateVoter = async (id: string, data: Partial<RegisterCredentials>) => {
  const formData = new FormData();
  // formData.append("user_id", data.user_id || "");
  formData.append("nin", data.nin || "");
  formData.append("is_active", String(data.is_active ?? ""));
  formData.append("is_verified", String(data.is_verified ?? ""));
  formData.append("email", data.email || "");
  formData.append("full_name", data.full_name || "");
  formData.append("state_of_residence", data.state_of_residence || "");
  formData.append("date_of_birth", data.date_of_birth || "");

  const response = await fetch(`${API_URL}/admin/users/${id}`, {
    method: "PUT",
    headers: {
      ...(localStorage.getItem("token") ? { Authorization: `Bearer ${localStorage.getItem("token")}` } : {}),
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to update voter");
  }

  return response.json();
};

export const deleteVoter = async (id: string) => {
  const response = await fetch(`${API_URL}/admin/users/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to delete voter");
  }

  return response.json();
};
