import { API_URL, getHeaders, getJsonAuthHeaders } from "./apiUtils";
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
  if (!response.ok) throw new Error("Failed to create position");
  return response.json();
};

export const getPositions = async () => {
  const response = await fetch(`${API_URL}/admin/positions`, {
    headers: getJsonAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch positions");
  const json = await response.json();
  return json.data || [];
};

export const getPosition = async (id: string) => {
  const response = await fetch(`${API_URL}/admin/positions/${id}`, {
    headers: getJsonAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch position");
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
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to update position");
  }

  return response.json();
};

export const deletePosition = async (id: string) => {
  const response = await fetch(`${API_URL}/admin/positions/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error("Failed to delete position");
  return response.json();
};
