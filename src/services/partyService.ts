import { API_URL, getHeaders, getJsonAuthHeaders } from "./apiUtils";
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
  if (!response.ok) throw new Error("Failed to create party");
  return response.json();
};

export const getParties = async (): Promise<Party[]> => {
  const response = await fetch(`${API_URL}/admin/parties`, {
    headers: getJsonAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch parties");
  const json = await response.json();
  return json.data || [];
};

export const getParty = async (id: string) => {
  const response = await fetch(`${API_URL}/admin/parties/${id}`, {
    headers: getJsonAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch party");
  return response.json();
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
  if (!response.ok) throw new Error("Failed to update party");
  return response.json();
};

export const deleteParty = async (id: string | number) => {
  const response = await fetch(`${API_URL}/admin/parties/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error("Failed to delete party");
  return response.json();
};
