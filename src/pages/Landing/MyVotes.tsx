import { useNavigate } from "react-router-dom";
import { useMyVotes } from "@/hooks/election/useElection";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Calendar, Vote, CheckCircle2, Copy, ShieldCheck, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { UserNav } from "@/components/UserNav";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import type { MyVotesData, MyVotesHistoryItem, MyBallotItem } from "@/types/types";

// Status Badge Component
const StatusBadge = ({ status }: { status: string }) => {
  const statusConfig: Record<string, { label: string; className: string }> = {
    ongoing: { label: "Ongoing", className: "bg-emerald-500 hover:bg-emerald-600 text-white border-0" },
    upcoming: { label: "Upcoming", className: "bg-blue-500 hover:bg-blue-600 text-white border-0" },
    past: { label: "Completed", className: "bg-slate-500 hover:bg-slate-600 text-white border-0" },
  };
  const config = statusConfig[status] || { label: status || "Unknown", className: "bg-gray-500 text-white border-0" };
  return <Badge className={config.className}>{config.label}</Badge>;
};

// Ballot Item Component
const BallotItem = ({ ballot }: { ballot: MyBallotItem }) => {
  const copyReceipt = () => {
    navigator.clipboard.writeText(ballot.vote_receipt);
    toast.success("Receipt code copied to clipboard");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100 gap-4">
      <div className="flex-1">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
          {ballot.position_title}
        </p>
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <span className="font-semibold text-slate-900">{ballot.candidate_name}</span>
          {ballot.party_acronym && (
            <Badge variant="outline" className="text-xs">{ballot.party_acronym}</Badge>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatDate(ballot.cast_at)}
          </span>
          <Badge
            variant="outline"
            className={`text-xs ${ballot.status === 'Verified' ? 'text-green-600 border-green-200 bg-green-50' : 'text-amber-600 border-amber-200 bg-amber-50'}`}
          >
            {ballot.status === 'Verified' && <ShieldCheck className="h-3 w-3 mr-1" />}
            {ballot.status}
          </Badge>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <code className="text-xs bg-white border border-slate-200 px-2 py-1 rounded font-mono text-slate-700">
          {ballot.vote_receipt}
        </code>
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 shrink-0"
          onClick={copyReceipt}
          title="Copy receipt"
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

// Election History Item Component
const ElectionHistoryItem = ({ historyItem }: { historyItem: MyVotesHistoryItem }) => {
  const { election_details, my_ballot } = historyItem;

  return (
    <AccordionItem value={String(election_details.id)} className="border-b border-slate-100">
      <AccordionTrigger className="hover:bg-slate-50/50 px-4 rounded-lg hover:no-underline py-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4 text-left w-full group">
          <div className="bg-slate-100 p-2 rounded-md group-hover:bg-[#134E4A]/10 transition-colors">
            <Vote className="h-5 w-5 text-slate-500 group-hover:text-[#134E4A]" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900 group-hover:text-[#134E4A] transition-colors">
              {election_details.title}
            </h3>
            <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
              <span className="capitalize">{election_details.type}</span>
              <StatusBadge status={election_details.status} />
              <span className="text-xs">
                {my_ballot.length} vote{my_ballot.length !== 1 ? 's' : ''} cast
              </span>
            </div>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4">
        <div className="space-y-3 pt-2">
          {my_ballot.map((ballot, idx) => (
            <BallotItem key={idx} ballot={ballot} />
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default function MyVotes() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useMyVotes() as {
    data: MyVotesData | undefined;
    isLoading: boolean;
    error: Error | null;
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50">
        <div className="text-center">
          <Spinner className="size-10 text-[#134E4A] mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your voting history...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-screen w-full items-center justify-center bg-slate-50 gap-4">
        <Vote className="h-16 w-16 text-slate-300" />
        <h2 className="text-xl font-semibold text-slate-700">Failed to load voting history</h2>
        <p className="text-muted-foreground">{error.message}</p>
        <Button variant="outline" onClick={() => navigate("/")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </div>
    );
  }

  const summary = data?.summary;
  const history = data?.history || [];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-[#134E4A] text-white py-12 px-4 md:px-10">
        <div className="container mx-auto">
          <div className="flex justify-between items-start mb-8">
            <Button
              variant="ghost"
              className="text-white/80 hover:text-white hover:bg-white/10 pl-0 -ml-3"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            <UserNav />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">My Voting History</h1>
          <p className="text-white/80 text-lg max-w-2xl">
            View a comprehensive record of all elections you have participated in and your cast votes.
          </p>

          {/* Summary Stats */}
          {summary && (
            <div className="flex gap-6 mt-8">
              <div className="bg-white/10 rounded-lg px-6 py-4 backdrop-blur-sm">
                <p className="text-white/60 text-sm">Total Votes Cast</p>
                <p className="text-3xl font-bold">{summary.total_votes_cast}</p>
              </div>
              <div className="bg-white/10 rounded-lg px-6 py-4 backdrop-blur-sm">
                <p className="text-white/60 text-sm">Elections Attended</p>
                <p className="text-3xl font-bold">{summary.elections_attended}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto py-12 px-4 md:px-10">
        <Card className="border-none shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-[#134E4A]" />
              Election History
            </CardTitle>
            <CardDescription>Click on an election to view your voting choices and receipts.</CardDescription>
          </CardHeader>
          <CardContent>
            {history.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {history.map((historyItem) => (
                  <ElectionHistoryItem key={historyItem.election_details.id} historyItem={historyItem} />
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-12">
                <Vote className="h-16 w-16 mx-auto mb-4 text-slate-300" />
                <h3 className="text-lg font-semibold text-slate-700 mb-2">No Voting History</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  You haven't participated in any elections yet. When you cast your votes, they will appear here.
                </p>
                <Button
                  className="mt-6 bg-[#134E4A] hover:bg-[#134E4A]/90"
                  onClick={() => navigate("/")}
                >
                  Browse Elections
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Verify Vote Link */}
        {history.length > 0 && (
          <div className="mt-6 bg-linear-to-r from-slate-100 to-slate-50 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-[#134E4A]/10 flex items-center justify-center">
                <ShieldCheck className="h-5 w-5 text-[#134E4A]" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700">Verify Your Vote</p>
                <p className="text-xs text-muted-foreground">
                  Use your receipt code to independently verify your vote
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={() => navigate("/verify")}>
              Go to Verification
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
