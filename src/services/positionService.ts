import { API_URL, getHeaders, getJsonAuthHeaders, getApiError } from "./apiUtils";
import type { Position } from "../types/types";

export const createPosition = async (data: Omit<Position, "position_id">) => {
  const formData = new FormData();
  formData.append("election_id", String(data.election_id));
  formData.append("title", data.title || "");
  formData.append("description", data.description || "");

  const response = await fetch(`${API_URL}/admin/positions`, {
    method: "POST",
    headers: getHeaders(),
    body: formData,
  });

  if (!response.ok) {
    const errorMessage = await getApiError(response, "Failed to create position");
    throw new Error(errorMessage);
  }

  return response.json();
};

export const getPositions = async () => {
  const response = await fetch(`${API_URL}/admin/positions`, {
    headers: getJsonAuthHeaders(),
  });

  if (!response.ok) {
    const errorMessage = await getApiError(response, "Failed to fetch positions");
    throw new Error(errorMessage);
  }

  const json = await response.json();
  return json.data || [];
};

export const getPosition = async (id: string) => {
  const response = await fetch(`${API_URL}/admin/positions/${id}`, {
    headers: getJsonAuthHeaders(),
  });

  if (!response.ok) {
    const errorMessage = await getApiError(response, "Failed to fetch position details");
    throw new Error(errorMessage);
  }

  return response.json();
};

export const updatePosition = async (id: string, data: Partial<Position>) => {
  const formData = new FormData();
  formData.append("election_id", String(data.election_id || ""));
  formData.append("title", data.title || "");
  formData.append("description", data.description || "");

  const response = await fetch(`${API_URL}/admin/positions/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: formData,
  });

  if (!response.ok) {
    const errorMessage = await getApiError(response, "Failed to update position");
    throw new Error(errorMessage);
  }

  return response.json();
};

export const deletePosition = async (id: string) => {
  const response = await fetch(`${API_URL}/admin/positions/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorMessage = await getApiError(response, "Failed to delete position");
    throw new Error(errorMessage);
  }

  return response.json();
};
