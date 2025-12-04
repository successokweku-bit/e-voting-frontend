export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  nin: string;
  email: string;
  full_name: string;
  state_of_residence: string;
  date_of_birth: string;
  password?: string;
  is_active?: boolean;
  is_verified?: boolean;
}

export interface User {
  id: number;
  nin: string;
  full_name: string;
  email: string;
  state_of_residence: string;
  date_of_birth: string | null;
  role: string;
  is_active: boolean;
  is_verified: boolean;
  profile_image_url: string | null;
  registration_date: string;
  created_at: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface Party {
  id: number;
  name: string;
  acronym: string;
  founded_date: string;
  description: string;
  logo_url: string;
  created_at: string;
}

export interface Candidate {
  id: string;
  user_id: string;
  party_id: string;
  election_id: string;
  position_id: string;
  name?: string;
  party?: string;
  position?: string;
}

export interface Election {
  id: string;
  title: string;
  status: "Upcoming" | "Active" | "Completed";
  startDate: string;
  endDate: string;
}

export interface Position {
  id: string;
  title: string;
  description: string;
  election_id: string;
  election_title?: string;
}

export interface State {
  name: string;
  code: string;
}

export interface DashboardStats {
  total_users: number;
  active_users: number;
  inactive_users: number;
  admin_users: number;
  regular_users: number;
  total_votes: number;
  total_elections: number;
  total_candidates: number;
  total_parties: number;
  active_elections: number;
}
