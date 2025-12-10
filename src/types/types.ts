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

export interface ManifestoItem {
  title: string;
  description: string;
}

export interface Candidate {
  candidate_id: number;
  user_id: number;
  party_id: number;
  election_id: number;
  position_id: number;
  bio: string;
  manifestos: ManifestoItem[];
  
  user_name?: string;
  user_email?: string;
  party_name?: string;
  party_acronym?: string;
  position_title?: string;
  election?: Election;
}

export interface Election {
  election_id: number;
  title: string;
  election_title?: string;
  description: string | null;
  election_type: string;
  state: string;
  is_active: boolean;
  start_date: string;
  end_date: string;
  created_at: string;
  position_count: number;
}

export interface Position {
  position_id: number;
  title: string;
  description: string;
  election_id: number;
  election_title?: string;
  candidate_count?: number;
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
