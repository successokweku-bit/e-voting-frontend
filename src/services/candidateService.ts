import { API_URL, getHeaders, getJsonAuthHeaders } from "./apiUtils";
import type { Candidate } from "../types/types";

export const createCandidate = async (data: FormData) => {

  const response = await fetch(`${API_URL}/admin/candidates`, {
    method: "POST",
    headers: getHeaders(),
    body: data,
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to create candidate");
  }
  return response.json();
};

export const getCandidates = async () => {
  const response = await fetch(`${API_URL}/admin/candidates`, {
    headers: getJsonAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch candidates");
  const json = await response.json();
  return json.data || [];
};

export const getCandidate = async (id: number) => {
  const response = await fetch(`${API_URL}/admin/candidates/${id}`, {
    headers: getJsonAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch candidate");
  const json = await response.json();
  return json.data;
};
export const getDashCandidates = async (electionId: number, positionId: number) => {
  const response = await fetch(`${API_URL}/api/elections/${electionId}/positions/${positionId}/candidates`, {
    headers: getJsonAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch candidate");
  const json = await response.json();
  return json.data;
};

export const updateCandidate = async (id: number, data: Partial<Candidate>) => {

  const formData = new FormData();
  formData.append("user_id", String(data.user_id || ""));
  formData.append("party_id", String(data.party_id || ""));
  formData.append("election_id", String(data.election_id || ""));
  formData.append("position_id", String(data.position_id || ""));
  formData.append("bio", data.bio || "");
  formData.append("manifestos", JSON.stringify(data.manifestos || []));

  const response = await fetch(`${API_URL}/admin/candidates/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: formData,
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to update candidate");
  }
  return response.json();
};

export const deleteCandidate = async (id: number) => {
  const response = await fetch(`${API_URL}/admin/candidates/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error("Failed to delete candidate");
  return response.json();
};
