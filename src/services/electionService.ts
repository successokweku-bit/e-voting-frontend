import { API_URL, getAuthHeaders } from "./apiUtils";
import type { Election } from "../types/types";

export const createElection = async (data: Omit<Election, "id">) => {
  const response = await fetch(`${API_URL}/api/elections`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create election");
  return response.json();
};

export const getElections = async () => {
  const response = await fetch(`${API_URL}/admin/elections`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch elections");
  const json = await response.json();
  return json.data || [];
};

export const getElection = async (id: string) => {
  const response = await fetch(`${API_URL}/admin/elections/${id}`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch election");
  return response.json();
};

export const updateElection = async (id: string, data: Partial<Election>) => {
  const response = await fetch(`${API_URL}/admin/elections/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update election");
  return response.json();
};

export const deleteElection = async (id: string) => {
  const response = await fetch(`${API_URL}/admin/elections/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to delete election");
  return response.json();
};
