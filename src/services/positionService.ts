import { API_URL, getAuthHeaders } from "./apiUtils";
import type { Position } from "../types/types";

export const createPosition = async (data: Omit<Position, "id">) => {
  const response = await fetch(`${API_URL}/api/positions`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create position");
  return response.json();
};

export const getPositions = async () => {
  const response = await fetch(`${API_URL}/api/positions`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch positions");
  return response.json();
};

export const getPosition = async (id: string) => {
  const response = await fetch(`${API_URL}/api/positions/${id}`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch position");
  return response.json();
};

export const updatePosition = async (id: string, data: Partial<Position>) => {
  const response = await fetch(`${API_URL}/api/positions/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to update position");
  }

  return response.json();
};

export const deletePosition = async (id: string) => {
  const response = await fetch(`${API_URL}/api/positions/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to delete position");
  return response.json();
};
