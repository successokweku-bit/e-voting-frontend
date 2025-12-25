import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { verifyVoteReceipt } from "@/services/electionService";
import { Loader2, CheckCircle2, XCircle, ArrowLeft, Vote, User, Flag, Clock, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { UserNav } from "@/components/UserNav";
import { Badge } from "@/components/ui/badge";
import type { VoteDetails } from "@/types/types";

export default function VerifyReceipt() {
  const [receiptCode, setReceiptCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [voteDetails, setVoteDetails] = useState<VoteDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleVerify = async () => {
    if (!receiptCode.trim()) {
      toast.error("Please enter a receipt code");
      return;
    }

    setIsLoading(true);
    setError(null);
    setVoteDetails(null);

    try {
      const result = await verifyVoteReceipt(receiptCode);
      if (result.status && result.data) {
        setVoteDetails(result.data);
      } else {
        setError(result.error || result.message || "Failed to verify receipt");
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to verify receipt";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    if (status === 'ongoing') return 'bg-emerald-500';
    if (status === 'past' || status === 'ended') return 'bg-slate-500';
    return 'bg-blue-500';
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-[#134E4A] text-white py-4 px-6 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="text-white/80 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-xl font-bold">Vote Verification</h1>
        </div>
        <UserNav />
      </header>

      <main className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
        <div className="w-full max-w-lg space-y-6">
          {/* Search Card */}
          <Card className="shadow-lg border-slate-200">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-lg bg-[#134E4A]/10 flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5 text-[#134E4A]" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-[#0F172A]">Verify Your Vote</CardTitle>
                </div>
              </div>
              <CardDescription>
                Enter the unique receipt code provided after you voted to verify that your vote was recorded correctly.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Input
                  placeholder="Enter Receipt Code (e.g. VR-AC92...)"
                  value={receiptCode}
                  onChange={(e) => setReceiptCode(e.target.value.toUpperCase())}
                  className="text-lg font-mono"
                  onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
                />
              </div>
              <Button
                className="w-full bg-[#134E4A] hover:bg-[#134E4A]/90 h-11 text-lg"
                onClick={handleVerify}
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                Verify Receipt
              </Button>
            </CardContent>
          </Card>

          {/* Success Result */}
          {voteDetails && (
            <Card className="shadow-lg border-0 bg-linear-to-br from-emerald-50 to-green-50 animate-in fade-in slide-in-from-bottom-4">
              <CardHeader className="pb-4">
                <div className="flex items-start gap-3">
                  <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-7 w-7 text-emerald-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-emerald-800">Vote Verified</CardTitle>
                    <p className="text-emerald-700 mt-1">Your vote has been successfully recorded in the system.</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Receipt Code */}
                <div className="bg-white/60 rounded-lg p-4 border border-emerald-200">
                  <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">Receipt Code</p>
                  <p className="text-lg font-mono font-bold text-slate-800">{voteDetails.vote_receipt}</p>
                </div>

                {/* Election Info */}
                <div className="bg-white/60 rounded-lg p-4 border border-emerald-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Vote className="h-4 w-4 text-slate-500" />
                      <span className="text-sm font-medium text-slate-600">Election</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-800">{voteDetails.election.title}</span>
                      <Badge className={`${getStatusColor(voteDetails.election.current_status)} text-white border-0 text-xs`}>
                        {voteDetails.election.current_status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Flag className="h-4 w-4 text-slate-500" />
                      <span className="text-sm font-medium text-slate-600">Type</span>
                    </div>
                    <span className="font-semibold text-slate-800 capitalize">{voteDetails.election.type}</span>
                  </div>
                </div>

                {/* Ballot Item */}
                <div className="bg-white/60 rounded-lg p-4 border border-emerald-200 space-y-3">
                  <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Your Vote</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-600">Position</span>
                    <span className="font-semibold text-slate-800">{voteDetails.ballot_item.position}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-600">Candidate</span>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-[#134E4A]" />
                      <span className="font-semibold text-slate-800">{voteDetails.ballot_item.candidate}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-600">Party</span>
                    <Badge variant="outline" className="font-semibold">{voteDetails.ballot_item.party}</Badge>
                  </div>
                </div>

                {/* Verification Status */}
                <div className="bg-white/60 rounded-lg p-4 border border-emerald-200 space-y-3">
                  <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Verification Status</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-slate-500" />
                      <span className="text-sm font-medium text-slate-600">Cast At</span>
                    </div>
                    <span className="text-sm font-medium text-slate-800">{formatDate(voteDetails.verification.timestamp)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-600">Status</span>
                    <Badge
                      className={`${voteDetails.verification.is_tallied
                        ? 'bg-emerald-500 hover:bg-emerald-600'
                        : 'bg-amber-500 hover:bg-amber-600'
                        } text-white border-0`}
                    >
                      {voteDetails.verification.status_label}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-600">Verified</span>
                    <span className={`text-sm font-semibold ${voteDetails.verification.is_verified ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {voteDetails.verification.is_verified ? 'Yes' : 'Pending'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-600">Tallied</span>
                    <span className={`text-sm font-semibold ${voteDetails.verification.is_tallied ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {voteDetails.verification.is_tallied ? 'Yes' : 'Pending'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Error Result */}
          {error && (
            <Card className="shadow-lg border-0 bg-linear-to-br from-red-50 to-rose-50 animate-in fade-in slide-in-from-bottom-4">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                    <XCircle className="h-7 w-7 text-red-600" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-red-800">Verification Failed</p>
                    <p className="text-red-700 mt-1">{error}</p>
                    <p className="text-sm text-red-600/70 mt-3">
                      Please check your receipt code and try again. If the problem persists, contact support.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
