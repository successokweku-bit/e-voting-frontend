import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Dashboard/Login";
import Register from "./pages/Dashboard/Register";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import Overview from "./pages/Dashboard/Overview";
import Candidates from "./pages/Dashboard/Candidates";
import Positions from "./pages/Dashboard/Positions";
import Parties from "./pages/Dashboard/Parties";
import Voters from "./pages/Dashboard/Voters";
import Elections from "./pages/Dashboard/Elections";
import ActiveElections from "./pages/Dashboard/ActiveElections";
import UpcomingElections from "./pages/Dashboard/UpcomingElections";
import PastElections from "./pages/Dashboard/PastElections";
import ElectionDetails from "./pages/Dashboard/ElectionDetails";
import Profile from "./pages/Dashboard/Profile";
import VoterLanding from "./pages/Landing/VoterLanding";
import VoterElectionDetails from "./pages/Landing/VoterElectionDetails";
import VoterPositionCandidates from "./pages/Landing/VoterPositionCandidates";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Voter Routes - Separate from Dashboard */}
        <Route path="/" element={<VoterLanding />} />
        <Route path="/vote/elections/:id" element={<VoterElectionDetails />} />
        <Route path="/vote/elections/:electionId/positions/:positionId" element={<VoterPositionCandidates />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Overview />} />
            <Route path="/dashboard/candidates" element={<Candidates />} />
            <Route path="/dashboard/positions" element={<Positions />} />
            <Route path="/dashboard/parties" element={<Parties />} />
            <Route path="/dashboard/voters" element={<Voters />} />
            <Route path="/dashboard/elections" element={<Elections />} />
            <Route path="/dashboard/elections/active" element={<ActiveElections />} />
            <Route path="/dashboard/elections/upcoming" element={<UpcomingElections />} />
            <Route path="/dashboard/elections/past" element={<PastElections />} />
            <Route path="/dashboard/elections/:id" element={<ElectionDetails />} />
            <Route path="/dashboard/profile" element={<Profile />} />
          </Route>

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
