import { useParams, useNavigate } from "react-router-dom";
import { useDashElection } from "@/hooks/election/useElection";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, Users, ChevronRight, CheckSquare, Vote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { UserNav } from "@/components/UserNav";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default function VoterElectionDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: election, isLoading } = useDashElection(Number(id) || 0);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner className="size-10 text-[#134E4A]" />
      </div>
    );
  }

  if (!election) {
    return <div className="p-10 container mx-auto">Election not found.</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
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
            {election.is_active && (
              <div className="flex items-center text-sm font-medium text-white/90">
                <span className="flex h-2 w-2 rounded-full bg-white mr-2 animate-pulse"></span>
                Live
              </div>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight capitalize">{election.title}</h1>
          <p className="text-white/80 text-lg md:text-xl mb-10 max-w-2xl leading-relaxed">
            {election.description || `${election.election_type} election for ${election.state}`}
          </p>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-4 bg-white/10 rounded-xl p-4 pr-8 backdrop-blur-sm border border-white/10">
              <div className="bg-white/20 p-2.5 rounded-lg">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-white/70 uppercase font-semibold tracking-wider mb-0.5">Election Period</p>
                <p className="font-medium text-white text-base">{formatDate(election.start_date)} - {formatDate(election.end_date)}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/10 rounded-xl p-4 pr-8 backdrop-blur-sm border border-white/10">
              <div className="bg-white/20 p-2.5 rounded-lg">
                <Vote className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-white/70 uppercase font-semibold tracking-wider mb-0.5">Total Votes</p>
                <p className="font-medium text-white text-base">{election.total_votes.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/10 rounded-xl p-4 pr-8 backdrop-blur-sm border border-white/10">
              <div className="bg-white/20 p-2.5 rounded-lg">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-white/70 uppercase font-semibold tracking-wider mb-0.5">Positions</p>
                <p className="font-medium text-white text-base">{election.positions?.length || 0} positions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Positions Section */}
      <div className="py-12 px-4 md:px-10">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-2">Election Positions</h2>
          <p className="text-muted-foreground text-lg">Select a position to view candidates and cast your vote</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {election.positions && election.positions.length > 0 ? (
            election.positions.map((position, index) => (
              <Card
                key={position.id}
                className="group cursor-pointer hover:border-[#134E4A] hover:shadow-md transition-all duration-200"
                onClick={() => navigate(`/vote/elections/${id}/positions/${position.id}`)}
              >
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-slate-100 flex items-center justify-center text-xl font-bold text-slate-600 group-hover:bg-[#134E4A]/10 group-hover:text-[#134E4A] transition-colors">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#0F172A] mb-1">{position.title}</h3>
                      <p className="text-muted-foreground">{position.description}</p>
                      <p className="text-sm text-slate-500 mt-1">
                        {position.candidates?.length || 0} candidate{(position.candidates?.length || 0) !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#134E4A] group-hover:text-white transition-all">
                    <CheckSquare className="h-5 w-5 hidden group-hover:block" />
                    <ChevronRight className="h-5 w-5 group-hover:hidden" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-muted-foreground">
              No positions available for this election.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
