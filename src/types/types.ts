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
  profile_image_url?: string;

  user_name?: string;
  user_email?: string;
  party_name?: string;
  party_acronym?: string;
  position_title?: string;
  election?: Election;
}

export interface PublicParty {
  id: number;
  name: string;
  description: string;
  logo_url: string | null;
}

export interface PublicElection {
  id: number;
  title: string;
  description: string;
  election_type: string;
  state: string;
  start_date: string;
  end_date: string;
  total_votes?: number;
}

export interface VoterCandidate {
  id: number;
  user_id: number;
  name: string;
  position_id: number;
  bio: string;
  manifestos: ManifestoItem[];
  profile_image_url?: string;
  party: PublicParty;
  election: PublicElection;
}

export interface Election {
  election_id: number;
  title: string;
  election_title?: string;
  description: string;
  election_type: string;
  state: string;
  is_active: boolean;
  status?: 'past' | 'ongoing' | 'upcoming';
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

export interface ElectionPosition {
  id: number;
  title: string;
  description: string;
  election_id: number;
  candidates: Candidate[];
}

export interface ElectionDetails {
  id: number;
  title: string;
  description: string;
  election_type: string;
  state: string;
  is_active: boolean;
  start_date: string;
  end_date: string;
  created_at: string;
  positions: ElectionPosition[];
  total_votes: number;
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

export interface PositionStatistics {
  position_id: number;
  position_title: string;
  total_votes: number;
  verified_votes: number;
  pending_votes: number;
}

export interface SecureElectionStatistics {
  election_id: number;
  election_name: string;
  total_secure_votes: number;
  verification_attempts: number;
  position_statistics: PositionStatistics[];
  election_status: string;
}

// Election Tracking Types
export interface TrackingCandidate {
  candidate_id: number;
  candidate_name: string;
  vote_count: number;
  percentage: number;
}

export interface TrackingPosition {
  position_id: number;
  title: string;
  total_votes: number;
  winner?: string;
  candidates: TrackingCandidate[];
}

export interface TrackingTotals {
  votes_cast: number;
  verified_votes: number;
  unverified_votes: number;
  tallied_votes: number;
  receipt_verifications: number;
}

export interface TrackingElection {
  id: number;
  title: string;
  status: string;
  is_active: boolean;
  start_date: string;
  end_date: string;
}

export interface TimelineEvent {
  hour: string;
  votes: number;
}

export interface ElectionTrackingData {
  election: TrackingElection;
  totals: TrackingTotals;
  positions: TrackingPosition[];
  timeline: TimelineEvent[];
}

// My Votes Types
export interface MyVotesSummary {
  total_votes_cast: number;
  elections_attended: number;
}

export interface MyBallotItem {
  position_title: string;
  candidate_name: string;
  party_acronym: string;
  vote_receipt: string;
  cast_at: string;
  status: string;
}

export interface MyVotesElectionDetails {
  id: number;
  title: string;
  status: string;
  type: string;
}

export interface MyVotesHistoryItem {
  election_details: MyVotesElectionDetails;
  my_ballot: MyBallotItem[];
}

export interface MyVotesData {
  summary: MyVotesSummary;
  history: MyVotesHistoryItem[];
}

// Secure Election Statistics Types (for /api/elections/{id}/secure-statistics)
export interface SecurePositionStats {
  position_id: number;
  position_title: string;
  total_votes: number;
  verified_votes: number;
  pending_votes: number;
}

export interface SecureElectionStats {
  election_id: number;
  election_name: string;
  total_secure_votes: number;
  verification_attempts: number;
  position_statistics: SecurePositionStats[];
  election_status: string;
}

// Vote Details/Verification Types (for /api/vote/details-by-receipt)
export interface VoteVerification {
  is_verified: boolean;
  is_tallied: boolean;
  status_label: string;
  timestamp: string;
}

export interface VoteElectionInfo {
  id: number;
  title: string;
  type: string;
  current_status: string;
}

export interface VoteBallotItem {
  position: string;
  candidate: string;
  party: string;
}

export interface VoteDetails {
  vote_receipt: string;
  verification: VoteVerification;
  election: VoteElectionInfo;
  ballot_item: VoteBallotItem;
}
