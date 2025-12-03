import { API_URL, getAuthHeaders } from "./apiUtils";

export const getStates = async () => {
  const response = await fetch(`${API_URL}/api/states`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch states");
  const json = await response.json();
  return json.data.states;
};

export const getDashboardStats = async () => {
  const response = await fetch(`${API_URL}/admin/dashboard/stats`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch dashboard stats");
  const json = await response.json();
  return json.data;
};
