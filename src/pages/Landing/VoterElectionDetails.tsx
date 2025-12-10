import { useParams, useNavigate } from "react-router-dom";
import { useElection } from "@/hooks/election/useElection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, Users, ChevronRight, CheckSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { UserNav } from "@/components/UserNav";

// Mock positions data since we don't have an endpoint for it yet
const MOCK_POSITIONS = [
  {
    id: 1,
    title: "President of Nigeria",
    description: "Head of State and Government, Commander-in-Chief of the Armed Forces",
    icon: "1",
  },
  {
    id: 2,
    title: "Vice President",
    description: "Second-in-command to the President",
    icon: "2",
  },
  {
    id: 3,
    title: "Senator (Lagos Central)",
    description: "Representative for Lagos Central Senatorial District",
    icon: "3",
  },
  {
    id: 4,
    title: "Senator (Kano South)",
    description: "Representative for Kano South Senatorial District",
    icon: "4",
  },
  {
    id: 5,
    title: "Senator (Rivers East)",
    description: "Representative for Rivers East Senatorial District",
    icon: "5",
  },
];

const DUMMY_ELECTION = {
  election_id: 1,
  title: "2023 Nigerian General Elections",
  is_active: true,
  start_date: "Feb 25, 2023",
  end_date: "Feb 26, 2023",
} as never;

export default function VoterElectionDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: electionData, isLoading } = useElection(id || "");

  const election = electionData || DUMMY_ELECTION;

  if (isLoading && !election) {
    return <div className="p-10 container mx-auto">Loading election details...</div>;
  }

  if (!election) {
    return <div className="p-10 container mx-auto">Election not found.</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Section */}
      {/* Header Section */}
      <div className="bg-[#134E4A] text-white py-12 px-4 md:px-10">
        <div className="container mx-auto">
          <div className="flex justify-between items-start mb-8">
            <Button
              variant="ghost"
              className="text-white/80 hover:text-white hover:bg-white/10 pl-0 -ml-3"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Elections
            </Button>
            <UserNav />
          </div>

          <div className="flex items-center gap-4 mb-6">
            <Badge className="bg-[#10B981] hover:bg-[#059669] text-white border-none rounded-full px-3 py-1 text-sm font-medium">
              {election.is_active ? "Ongoing" : "Inactive"}
            </Badge>
            <div className="flex items-center text-sm font-medium text-white/90">
              <span className="flex h-2 w-2 rounded-full bg-white mr-2 animate-pulse"></span>
              Live
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">{election.title}</h1>
          <p className="text-white/80 text-lg md:text-xl mb-10 max-w-2xl leading-relaxed">
            Annual election for student body representatives
          </p>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-4 bg-white/10 rounded-xl p-4 pr-8 backdrop-blur-sm border border-white/10">
              <div className="bg-white/20 p-2.5 rounded-lg">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-white/70 uppercase font-semibold tracking-wider mb-0.5">Election Period</p>
                <p className="font-medium text-white text-base">{election.start_date} - {election.end_date}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/10 rounded-xl p-4 pr-8 backdrop-blur-sm border border-white/10">
              <div className="bg-white/20 p-2.5 rounded-lg">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-white/70 uppercase font-semibold tracking-wider mb-0.5">Total Participants</p>
                <p className="font-medium text-white text-base">2,847 voters</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Positions Section */}
      <div className="container mx-auto py-12 px-4 md:px-10">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-2">Election Positions</h2>
          <p className="text-muted-foreground text-lg">Select a position to view candidates and cast your vote</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {MOCK_POSITIONS.map((position) => (
            <Card
              key={position.id}
              className="group cursor-pointer hover:border-[#134E4A] hover:shadow-md transition-all duration-200"
              onClick={() => navigate(`/vote/elections/${id}/positions/${position.id}`)}
            >
              <CardContent className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-slate-100 flex items-center justify-center text-xl font-bold text-slate-600 group-hover:bg-[#134E4A]/10 group-hover:text-[#134E4A] transition-colors">
                    {position.id}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0F172A] mb-1">{position.title}</h3>
                    <p className="text-muted-foreground">{position.description}</p>
                  </div>
                </div>
                <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#134E4A] group-hover:text-white transition-all">
                  <CheckSquare className="h-5 w-5 hidden group-hover:block" />
                  <ChevronRight className="h-5 w-5 group-hover:hidden" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
