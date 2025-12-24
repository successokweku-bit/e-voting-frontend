import { useParams, useNavigate } from "react-router-dom";
import { useElectionResults } from "@/hooks/election/useElection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { UserNav } from "@/components/UserNav";
import {
  ArrowLeft,
  Vote,
  CheckCircle2,
  ShieldCheck,
  Clock,
  TrendingUp,
  BarChart3
} from "lucide-react";
import type { SecureElectionStats, SecurePositionStats } from "@/types/types";

// Position Stats Card Component
const PositionStatsCard = ({ position, index }: { position: SecurePositionStats; index: number }) => {
  const totalVotes = position.total_votes || 0;
  const verifiedPercentage = totalVotes > 0 ? (position.verified_votes / totalVotes) * 100 : 0;
  const pendingPercentage = totalVotes > 0 ? (position.pending_votes / totalVotes) * 100 : 0;

  return (
    <Card
      className="overflow-hidden border-0 shadow-lg"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <CardHeader className="bg-linear-to-r from-[#134E4A] to-[#0D3D38] text-white p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <span className="text-lg font-bold">{index + 1}</span>
            </div>
            <CardTitle className="text-lg font-semibold">{position.position_title}</CardTitle>
          </div>
          <Badge className="bg-white/20 text-white border-0 hover:bg-white/30">
            {position.total_votes} total votes
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-5">
        <div className="space-y-4">
          {/* Verified Votes */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span className="font-medium text-sm">Verified Votes</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {verifiedPercentage.toFixed(1)}%
                </span>
                <span className="text-sm font-semibold text-emerald-600">
                  {position.verified_votes}
                </span>
              </div>
            </div>
            <div className="relative h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-emerald-500 to-green-500 transition-all duration-1000 ease-out"
                style={{ width: `${verifiedPercentage}%` }}
              />
            </div>
          </div>

          {/* Pending Votes */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-500" />
                <span className="font-medium text-sm">Pending Verification</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {pendingPercentage.toFixed(1)}%
                </span>
                <span className="text-sm font-semibold text-amber-600">
                  {position.pending_votes}
                </span>
              </div>
            </div>
            <div className="relative h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-amber-400 to-orange-500 transition-all duration-1000 ease-out"
                style={{ width: `${pendingPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Status Badge Component
const StatusBadge = ({ status }: { status: string }) => {
  const statusConfig: Record<string, { label: string; className: string }> = {
    ongoing: { label: "Ongoing", className: "bg-emerald-500 hover:bg-emerald-600 text-white border-0" },
    upcoming: { label: "Upcoming", className: "bg-blue-500 hover:bg-blue-600 text-white border-0" },
    ended: { label: "Ended", className: "bg-slate-500 hover:bg-slate-600 text-white border-0" },
    past: { label: "Completed", className: "bg-slate-500 hover:bg-slate-600 text-white border-0" },
  };
  const config = statusConfig[status] || { label: status || "Unknown", className: "bg-gray-500 text-white border-0" };
  return <Badge className={config.className}>{config.label}</Badge>;
};

// Stat Card Component
const StatCard = ({
  title,
  value,
  icon: Icon,
  className
}: {
  title: string;
  value: number;
  icon: React.ElementType;
  className?: string;
}) => (
  <div className={`bg-white/10 rounded-xl p-4 backdrop-blur-sm ${className || ''}`}>
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center">
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div>
        <p className="text-xs text-white/60 uppercase tracking-wider">{title}</p>
        <p className="text-2xl font-bold">{value.toLocaleString()}</p>
      </div>
    </div>
  </div>
);

export default function ElectionResults() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: statsData, isLoading, isError } = useElectionResults(Number(id) || 0) as {
    data: SecureElectionStats | undefined;
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

  if (isError || !statsData) {
    return (
      <div className="flex flex-col bg-slate-50 h-screen w-full items-center justify-center gap-4">
        <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
          <Vote className="h-8 w-8 text-red-500" />
        </div>
        <h2 className="text-xl font-semibold text-slate-800">Statistics not available</h2>
        <p className="text-muted-foreground">Unable to load statistics for this election.</p>
        <Button
          variant="outline"
          onClick={() => navigate("/")}
          className="mt-2"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </div>
    );
  }

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
          <div className="flex justify-between items-start mb-6">
            <Button
              variant="ghost"
              className="text-white/80 hover:text-white hover:bg-white/10 pl-0 transition-all"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            <UserNav />
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <StatusBadge status={statsData.election_status} />
                <Badge variant="outline" className="text-white border-white/30 bg-white/10">
                  <BarChart3 className="h-3 w-3 mr-1" />
                  Election Statistics
                </Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
                {statsData.election_name}
              </h1>
              <p className="text-white/70 text-lg max-w-xl">
                Secure voting statistics and verification status
              </p>
            </div>

            {/* Stats Summary */}
            <div className="flex flex-wrap gap-4">
              <StatCard
                title="Total Secure Votes"
                value={statsData.total_secure_votes}
                icon={Vote}
              />
              <StatCard
                title="Verification Attempts"
                value={statsData.verification_attempts}
                icon={ShieldCheck}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Position Statistics Section */}
      <div className="container mx-auto py-10 px-4 md:px-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-1 flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-[#134E4A]" />
              Position Statistics
            </h2>
            <p className="text-muted-foreground">
              Vote verification status across {statsData.position_statistics.length} position{statsData.position_statistics.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {statsData.position_statistics.length === 0 ? (
          <Card className="border-0 shadow-lg">
            <CardContent className="py-16 text-center">
              <BarChart3 className="h-16 w-16 mx-auto mb-4 text-slate-300" />
              <h3 className="text-xl font-semibold text-slate-700 mb-2">No Statistics Available</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Statistics for this election are not yet available.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {statsData.position_statistics.map((position: SecurePositionStats, index: number) => (
              <PositionStatsCard key={position.position_id} position={position} index={index} />
            ))}
          </div>
        )}
      </div>

      {/* Footer Note */}
      <div className="container mx-auto px-4 md:px-10 pb-10">
        <div className="bg-linear-to-r from-slate-100 to-slate-50 rounded-xl p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-[#134E4A]/10 flex items-center justify-center">
            <ShieldCheck className="h-5 w-5 text-[#134E4A]" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-700">Secure Voting Statistics</p>
            <p className="text-xs text-muted-foreground">
              All votes are cryptographically secured and can be independently verified
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
