import { API_URL, getHeaders, getJsonAuthHeaders, getApiError } from "./apiUtils";
import type { Party } from "../types/types";

export const createParty = async (data: Omit<Party, "id" | "created_at" | "logo_url">) => {
  const formData = new FormData();
  formData.append("name", data.name || "");
  formData.append("acronym", data.acronym || "");
  formData.append("founded_date", data.founded_date || "");
  formData.append("description", data.description || "");

  const response = await fetch(`${API_URL}/admin/parties`, {
    method: "POST",
    headers: getHeaders(),
    body: formData,
  });

  if (!response.ok) {
    const errorMessage = await getApiError(response, "Failed to create party");
    throw new Error(errorMessage);
  }

  return response.json();
};

export const getParties = async (): Promise<Party[]> => {
  const response = await fetch(`${API_URL}/admin/parties`, {
    headers: getJsonAuthHeaders(),
  });

  if (!response.ok) {
    const errorMessage = await getApiError(response, "Failed to fetch parties");
    throw new Error(errorMessage);
  }

  const json = await response.json();
  return json.data || [];
};

export const getParty = async (id: string) => {
  const response = await fetch(`${API_URL}/admin/parties/${id}`, {
    headers: getJsonAuthHeaders(),
  });

  if (!response.ok) {
    const errorMessage = await getApiError(response, "Failed to fetch party details");
    throw new Error(errorMessage);
  }

  const json = await response.json();
  return json.data || [];
};

export const updateParty = async (id: string, data: Partial<Party>) => {
  const formData = new FormData();
  formData.append("name", data.name || "");
  formData.append("acronym", data.acronym || "");
  formData.append("founded_date", data.founded_date || "");
  formData.append("description", data.description || "");

  const response = await fetch(`${API_URL}/admin/parties/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: formData,
  });

  if (!response.ok) {
    const errorMessage = await getApiError(response, "Failed to update party");
    throw new Error(errorMessage);
  }

  return response.json();
};

export const deleteParty = async (id: string | number) => {
  const response = await fetch(`${API_URL}/admin/parties/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorMessage = await getApiError(response, "Failed to delete party");
    throw new Error(errorMessage);
  }

  return response.json();
};
