import { useParams, useNavigate } from "react-router-dom";
import { useElectionTracking } from "@/hooks/election/useElection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import {
  ArrowLeft,
  Vote,
  CheckCircle2,
  Clock,
  ListChecks,
  ShieldCheck,
  TrendingUp,
  Users,
  Trophy,
  Calendar,
  Activity
} from "lucide-react";
import type { ElectionTrackingData, TrackingPosition, TrackingCandidate, TimelineEvent } from "@/types/types";

// Stat Card Component
const StatCard = ({
  title,
  value,
  icon: Icon,
  gradient,
  delay
}: {
  title: string;
  value: number;
  icon: React.ElementType;
  gradient: string;
  delay: number;
}) => (
  <Card
    className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className={`absolute inset-0 ${gradient} opacity-10`} />
    <CardContent className="p-6 relative">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold tracking-tight">{value.toLocaleString()}</p>
        </div>
        <div className={`h-14 w-14 rounded-2xl ${gradient} flex items-center justify-center shadow-lg`}>
          <Icon className="h-7 w-7 text-white" />
        </div>
      </div>
    </CardContent>
  </Card>
);

// Position Card Component
const PositionCard = ({ position, index }: { position: TrackingPosition; index: number }) => {
  return (
    <Card
      className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <CardHeader className="bg-linear-to-r from-[#134E4A] to-[#0D3D38] text-white p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <span className="text-lg font-bold">{index + 1}</span>
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">{position.title}</CardTitle>
              {position.winner && (
                <p className="text-xs text-white/70 mt-0.5 flex items-center gap-1">
                  <Trophy className="h-3 w-3 text-amber-400" />
                  Winner: {position.winner}
                </p>
              )}
            </div>
          </div>
          <Badge className="bg-white/20 text-white border-0 hover:bg-white/30">
            {position.total_votes} votes
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-5">
        {position.candidates.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No candidates registered yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {position.candidates.map((candidate: TrackingCandidate, candidateIndex: number) => {
              const isWinner = position.winner === candidate.candidate_name;

              return (
                <div
                  key={candidate.candidate_id}
                  className="space-y-2"
                  style={{ animationDelay: `${(index * 100) + (candidateIndex * 50)}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{candidate.candidate_name}</span>
                      {isWinner && (
                        <Trophy className="h-4 w-4 text-amber-500" />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {candidate.percentage.toFixed(1)}%
                      </span>
                      <span className="text-sm font-semibold text-muted-foreground">
                        {candidate.vote_count} votes
                      </span>
                    </div>
                  </div>
                  <div className="relative h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ease-out ${isWinner
                        ? 'bg-linear-to-r from-[#134E4A] to-emerald-500'
                        : 'bg-linear-to-r from-slate-400 to-slate-500'
                        }`}
                      style={{ width: `${candidate.percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Status Badge Component
const StatusBadge = ({ status }: { status: string }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'ongoing':
        return {
          label: 'Ongoing',
          className: 'bg-emerald-500 hover:bg-emerald-600',
          icon: <span className="h-2 w-2 rounded-full bg-white mr-2 animate-pulse" />
        };
      case 'upcoming':
        return {
          label: 'Upcoming',
          className: 'bg-blue-500 hover:bg-blue-600',
          icon: <Clock className="h-3 w-3 mr-1" />
        };
      case 'past':
        return {
          label: 'Completed',
          className: 'bg-slate-500 hover:bg-slate-600',
          icon: <CheckCircle2 className="h-3 w-3 mr-1" />
        };
      default:
        return {
          label: status || 'Unknown',
          className: 'bg-gray-500 hover:bg-gray-600',
          icon: null
        };
    }
  };

  const config = getStatusConfig();

  return (
    <Badge className={`${config.className} text-white border-0 flex items-center`}>
      {config.icon}
      {config.label}
    </Badge>
  );
};

export default function ElectionTracking() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: trackingData, isLoading, isError } = useElectionTracking(Number(id) || 0) as {
    data: ElectionTrackingData | undefined;
    isLoading: boolean;
    isError: boolean;
  };

  if (isLoading) {
    return (
      <div className="flex bg-slate-50 h-screen w-full items-center justify-center">
        <div className="text-center">
          <Spinner className="size-12 text-[#134E4A] mx-auto mb-4" />
          <p className="text-muted-foreground animate-pulse">Loading election statistics...</p>
        </div>
      </div>
    );
  }

  if (isError || !trackingData) {
    return (
      <div className="flex flex-col bg-slate-50 h-screen w-full items-center justify-center gap-4">
        <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
          <Vote className="h-8 w-8 text-red-500" />
        </div>
        <h2 className="text-xl font-semibold text-slate-800">Election not found</h2>
        <p className="text-muted-foreground">Unable to load tracking data for this election.</p>
        <Button
          variant="outline"
          onClick={() => navigate("/dashboard/elections")}
          className="mt-2"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Elections
        </Button>
      </div>
    );
  }

  const { election, totals, positions, timeline } = trackingData;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Header */}
      <div className="relative bg-linear-to-br from-[#134E4A] via-[#0F3D39] to-[#0A2D2A] text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-300 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="relative container mx-auto py-8 px-4 md:px-10">
          <Button
            variant="ghost"
            className="text-white/80 hover:text-white hover:bg-white/10 mb-6 pl-0 transition-all"
            onClick={() => navigate("/dashboard/elections")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Elections
          </Button>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <StatusBadge status={election.status} />
                {election.status === 'ongoing' && (
                  <div className="flex items-center text-sm font-medium bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                    <span className="flex h-2 w-2 rounded-full bg-green-400 mr-2 animate-pulse" />
                    Live Tracking
                  </div>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
                {election.title}
              </h1>
              <p className="text-white/70 text-lg max-w-xl">
                Real-time election statistics and vote tracking
              </p>
            </div>

            <div className="flex flex-col gap-3 bg-white/10 rounded-xl p-4 backdrop-blur-sm min-w-[280px]">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-white/60" />
                <div>
                  <p className="text-xs text-white/50 uppercase tracking-wider">Start Date</p>
                  <p className="text-sm font-medium">{formatDate(election.start_date)}</p>
                </div>
              </div>
              <div className="border-t border-white/10" />
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-white/60" />
                <div>
                  <p className="text-xs text-white/50 uppercase tracking-wider">End Date</p>
                  <p className="text-sm font-medium">{formatDate(election.end_date)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="container mx-auto px-4 md:px-10 -mt-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard
            title="Total Votes Cast"
            value={totals.votes_cast}
            icon={Vote}
            gradient="bg-gradient-to-br from-[#134E4A] to-emerald-600"
            delay={0}
          />
          <StatCard
            title="Verified Votes"
            value={totals.verified_votes}
            icon={CheckCircle2}
            gradient="bg-gradient-to-br from-emerald-500 to-green-600"
            delay={100}
          />
          <StatCard
            title="Unverified Votes"
            value={totals.unverified_votes}
            icon={Clock}
            gradient="bg-gradient-to-br from-amber-500 to-orange-600"
            delay={200}
          />
          <StatCard
            title="Tallied Votes"
            value={totals.tallied_votes}
            icon={ListChecks}
            gradient="bg-gradient-to-br from-blue-500 to-indigo-600"
            delay={300}
          />
          <StatCard
            title="Receipt Verifications"
            value={totals.receipt_verifications}
            icon={ShieldCheck}
            gradient="bg-gradient-to-br from-purple-500 to-violet-600"
            delay={400}
          />
        </div>
      </div>

      {/* Positions Section */}
      <div className="container mx-auto py-10 px-4 md:px-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-1 flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-[#134E4A]" />
              Position Results
            </h2>
            <p className="text-muted-foreground">
              Vote distribution across {positions.length} position{positions.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {positions.length === 0 ? (
          <Card className="border-0 shadow-lg">
            <CardContent className="py-16 text-center">
              <Users className="h-16 w-16 mx-auto mb-4 text-slate-300" />
              <h3 className="text-xl font-semibold text-slate-700 mb-2">No Positions Yet</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Positions and candidates will appear here once they are added to the election.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {positions.map((position: TrackingPosition, index: number) => (
              <PositionCard key={position.position_id} position={position} index={index} />
            ))}
          </div>
        )}
      </div>

      {/* Vote Activity Timeline */}
      {timeline && timeline.length > 0 && (
        <div className="container mx-auto pb-10 px-4 md:px-10">
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-[#134E4A]" />
                <CardTitle className="text-xl font-bold text-slate-800">Vote Activity Timeline</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">Hourly vote distribution</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {timeline.map((event: TimelineEvent, index: number) => {
                  const maxVotes = Math.max(...timeline.map(e => e.votes), 1);
                  const percentage = (event.votes / maxVotes) * 100;
                  const formattedTime = new Date(event.hour).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  });

                  return (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-32 text-xs text-muted-foreground font-medium shrink-0">
                        {formattedTime}
                      </div>
                      <div className="flex-1 h-6 bg-slate-100 rounded-full overflow-hidden relative">
                        <div
                          className="absolute inset-y-0 left-0 bg-linear-to-r from-[#134E4A] to-emerald-500 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                        <div className="absolute inset-0 flex items-center justify-end pr-3">
                          <span className="text-xs font-semibold text-slate-600">
                            {event.votes} votes
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Footer Note */}
      <div className="container mx-auto px-4 md:px-10 pb-10">
        <div className="bg-linear-to-r from-slate-100 to-slate-50 rounded-xl p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-[#134E4A]/10 flex items-center justify-center">
            <ShieldCheck className="h-5 w-5 text-[#134E4A]" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-700">Secure Vote Tracking</p>
            <p className="text-xs text-muted-foreground">
              All votes are cryptographically secured and can be independently verified
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
