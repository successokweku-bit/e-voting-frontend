import { API_URL, getAuthHeaders } from "./apiUtils";
import type { Candidate } from "../types/types";

export const createCandidate = async (data: Omit<Candidate, "id">) => {
  const response = await fetch(`${API_URL}/admin/candidates`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create candidate");
  return response.json();
};

export const getCandidates = async () => {
  const response = await fetch(`${API_URL}/admin/candidates`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch candidates");
  const json = await response.json();
  return json.data || [];
};

export const getCandidate = async (id: string) => {
  const response = await fetch(`${API_URL}/admin/candidates/${id}`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch candidate");
  return response.json();
};

export const updateCandidate = async (id: string, data: Partial<Candidate>) => {
  const response = await fetch(`${API_URL}/admin/candidates/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update candidate");
  return response.json();
};

export const deleteCandidate = async (id: string) => {
  const response = await fetch(`${API_URL}/admin/candidates/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to delete candidate");
  return response.json();
};
