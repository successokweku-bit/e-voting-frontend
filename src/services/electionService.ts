import { API_URL, getHeaders, getJsonAuthHeaders, getApiError } from "./apiUtils";
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

  if (!response.ok) {
    const errorMessage = await getApiError(response, "Failed to create election");
    throw new Error(errorMessage);
  }

  return response.json();
};


export const getElections = async () => {
  const response = await fetch(`${API_URL}/admin/elections`, {
    headers: getJsonAuthHeaders(),
  });

  if (!response.ok) {
    const errorMessage = await getApiError(response, "Failed to fetch elections");
    throw new Error(errorMessage);
  }

  const json = await response.json();
  return json.data || [];
};

export const getElection = async (id: number) => {
  const response = await fetch(`${API_URL}/admin/elections/${id}`, {
    headers: getJsonAuthHeaders(),
  });

  if (!response.ok) {
    const errorMessage = await getApiError(response, "Failed to fetch election details");
    throw new Error(errorMessage);
  }

  const json = await response.json();
  return json.data;
};

export const getDashElection = async (id: number) => {
  const response = await fetch(`${API_URL}/api/elections/${id}`, {
    headers: getJsonAuthHeaders(),
  });

  if (!response.ok) {
    const errorMessage = await getApiError(response, "Failed to fetch election details");
    throw new Error(errorMessage);
  }

  const json = await response.json();
  return json.data;
};

export const getDashActiveElections = async () => {
  const response = await fetch(`${API_URL}/api/elections/active`, {
    headers: getJsonAuthHeaders(),
  });

  if (!response.ok) {
    const errorMessage = await getApiError(response, "Failed to fetch active elections");
    throw new Error(errorMessage);
  }

  const json = await response.json();
  return json.data;
};

export const getDashPastElections = async () => {
  const response = await fetch(`${API_URL}/api/past`, {
    headers: getJsonAuthHeaders(),
  });

  if (!response.ok) {
    const errorMessage = await getApiError(response, "Failed to fetch past elections");
    throw new Error(errorMessage);
  }

  const json = await response.json();
  return json.data;
};

export const getDashUpcomingElections = async () => {
  const response = await fetch(`${API_URL}/api/upcoming`, {
    headers: getJsonAuthHeaders(),
  });

  if (!response.ok) {
    const errorMessage = await getApiError(response, "Failed to fetch upcoming elections");
    throw new Error(errorMessage);
  }

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

  if (!response.ok) {
    const errorMessage = await getApiError(response, "Failed to update election");
    throw new Error(errorMessage);
  }

  return response.json();
};


export const deleteElection = async (id: string) => {
  const response = await fetch(`${API_URL}/admin/elections/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorMessage = await getApiError(response, "Failed to delete election");
    throw new Error(errorMessage);
  }

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

  const data = await response.json();

  // Check both HTTP status and response body status
  if (!response.ok || data.status === false) {
    const rawError = data.error || data.message;
    // Map voting-specific errors
    if (rawError?.toLowerCase().includes("already voted")) {
      throw new Error("You have already voted for this position");
    }
    if (rawError?.toLowerCase().includes("not active")) {
      throw new Error("This election is not currently active");
    }
    if (rawError?.toLowerCase().includes("ended")) {
      throw new Error("This election has ended");
    }
    throw new Error(rawError || "Failed to cast vote. Please try again");
  }

  return data;
};

export const verifyVoteReceipt = async (receiptCode: string) => {
  const formData = new FormData();
  formData.append("vote_receipt", receiptCode);

  const response = await fetch(`${API_URL}/api/vote/details-by-receipt`, {
    method: "POST",
    headers: getHeaders(),
    body: formData,
  });

  if (!response.ok) {
    const errorMessage = await getApiError(response, "Invalid receipt code. Please check and try again");
    throw new Error(errorMessage);
  }

  return response.json();
};


export const getMyVote = async () => {
  const response = await fetch(`${API_URL}/api/my-votes`, {
    headers: getJsonAuthHeaders(),
  });

  if (!response.ok) {
    if (response.status === 404) return null;
    const errorMessage = await getApiError(response, "Failed to fetch your voting history");
    throw new Error(errorMessage);
  }

  const json = await response.json();
  return json.data;
};

export const getElectionTracking = async (id: number) => {
  const response = await fetch(`${API_URL}/admin/elections/${id}/tracking`, {
    headers: getJsonAuthHeaders(),
  });

  if (!response.ok) {
    const errorMessage = await getApiError(response, "Failed to fetch election tracking data");
    throw new Error(errorMessage);
  }

  const json = await response.json();
  return json.data;
};

export const getElectionResults = async (id: number) => {
  const response = await fetch(`${API_URL}/api/elections/${id}/secure-statistics`, {
    headers: getJsonAuthHeaders(),
  });

  if (!response.ok) {
    const errorMessage = await getApiError(response, "Failed to fetch election results");
    throw new Error(errorMessage);
  }

  const json = await response.json();
  return json.data;
};
