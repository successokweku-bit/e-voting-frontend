import { API_URL, getHeaders, getJsonAuthHeaders } from "./apiUtils";
import type { Election } from "../types/types";

export const createElection = async (data: Omit<Election, "election_id" | "created_at" | "position_count">) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("election_type", data.election_type);
  formData.append("state", data.state);
  formData.append("is_active", String(data.is_active));
  formData.append("start_date", data.start_date.split("T")[0]);
  formData.append("end_date", data.end_date.split("T")[0]);

  const response = await fetch(`${API_URL}/admin/elections`, {
    method: "POST",
    headers: getHeaders(),
    body: formData,
  });
  if (!response.ok) throw new Error("Failed to create election");
  return response.json();
};


export const getElections = async () => {
  const response = await fetch(`${API_URL}/admin/elections`, {
    headers: getJsonAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch elections");
  const json = await response.json();
  return json.data || [];
};

export const getElection = async (id: number) => {
  const response = await fetch(`${API_URL}/admin/elections/${id}`, {
    headers: getJsonAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch election");
  const json = await response.json();
  return json.data;
};
export const getDashElection = async (id: number) => {
  const response = await fetch(`${API_URL}/api/elections/${id}`, {
    headers: getJsonAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch election");
  const json = await response.json();
  return json.data;
};
export const getDashActiveElections = async () => {
  const response = await fetch(`${API_URL}/api/elections/active`, {
    headers: getJsonAuthHeaders(),
  });

  if (!response.ok) throw new Error("Failed to fetch election");
  const json = await response.json();
  return json.data;
};
export const getDashPastElections = async () => {
  const response = await fetch(`${API_URL}/api/past`, {
    headers: getJsonAuthHeaders(),
  });

  if (!response.ok) throw new Error("Failed to fetch election");
  const json = await response.json();
  return json.data;
};
export const getDashUpcomingElections = async () => {
  const response = await fetch(`${API_URL}/api/upcoming`, {
    headers: getJsonAuthHeaders(),
  });

  if (!response.ok) throw new Error("Failed to fetch election");
  const json = await response.json();
  return json.data;
};

export const updateElection = async (id: string, data: Partial<Election>) => {
  const formData = new FormData();
  formData.append("title", data.title || "");
  formData.append("description", data.description || "");
  formData.append("election_type", data.election_type || "");
  formData.append("state", data.state || "");
  formData.append("is_active", String(data.is_active ?? false));
  formData.append("start_date", data.start_date ? data.start_date.split("T")[0] : "");
  formData.append("end_date", data.end_date ? data.end_date.split("T")[0] : "");

  const response = await fetch(`${API_URL}/admin/elections/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: formData,
  });
  if (!response.ok) throw new Error("Failed to update election");
  return response.json();
};


export const deleteElection = async (id: string) => {
  const response = await fetch(`${API_URL}/admin/elections/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error("Failed to delete election");
  return response.json();
};

export const voteSecure = async (electionId: number, positionId: number, candidateId: number) => {
  const formData = new FormData();
  formData.append("candidate_id", String(candidateId));
  const response = await fetch(`${API_URL}/api/elections/${electionId}/positions/${positionId}/vote-secure`, {
    method: "POST",
    headers: getHeaders(),
    body: formData,

  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || errorData.message || "Failed to cast vote");
  }
  return response.json();

};

export const verifyVoteReceipt = async (receiptCode: string) => {
  const formData = new FormData();
  formData.append("vote_receipt", receiptCode);
  const response = await fetch(`${API_URL}/api/vote/verify-receipt`, {
    method: "POST",
    headers: getHeaders(),
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || errorData.message || "Failed to verify receipt");
  }
  return response.json();
};





export const getMyVote = async (electionId: number) => {
  const response = await fetch(`${API_URL}/api/elections/${electionId}/my-vote`, {
    headers: getJsonAuthHeaders(),
  });
  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error("Failed to fetch vote details");
  }
  const json = await response.json();
  return json.data;
};


