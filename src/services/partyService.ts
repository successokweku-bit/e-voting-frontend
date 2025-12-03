import { API_URL, getAuthHeaders } from "./apiUtils";
import type { Party } from "../types/types";

export const createParty = async (data: Omit<Party, "id" | "created_at" | "logo_url">) => {
  const response = await fetch(`${API_URL}/admin/parties`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create party");
  return response.json();
};

export const getParties = async (): Promise<Party[]> => {
  const response = await fetch(`${API_URL}/admin/parties`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch parties");
  const json = await response.json();
  return json.data || [];
};

export const getParty = async (id: string) => {
  const response = await fetch(`${API_URL}/admin/parties/${id}`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch party");
  return response.json();
};

export const updateParty = async (id: string, data: Partial<Party>) => {
  const response = await fetch(`${API_URL}/admin/parties/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update party");
  return response.json();
};

export const deleteParty = async (id: string | number) => {
  const response = await fetch(`${API_URL}/admin/parties/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to delete party");
  return response.json();
};
