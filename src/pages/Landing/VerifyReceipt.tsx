import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { verifyVoteReceipt } from "@/services/electionService";
import { Loader2, CheckCircle2, XCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { UserNav } from "@/components/UserNav";

export default function VerifyReceipt() {
  const [receiptCode, setReceiptCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleVerify = async () => {
    if (!receiptCode.trim()) {
      toast.error("Please enter a receipt code");
      return;
    }

    setIsLoading(true);
    setError(null);
    setVerificationResult(null);

    try {
      const result = await verifyVoteReceipt(receiptCode);
      setVerificationResult(result);
    } catch (err: any) {
      setError(err.message || "Failed to verify receipt");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b py-4 px-6 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-xl font-bold text-[#134E4A]">Vote Verification</h1>
        </div>
        <UserNav />
      </header>

      <main className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
        <Card className="w-full max-w-md shadow-lg border-slate-200">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-[#0F172A]">Verify Your Vote</CardTitle>
            <CardDescription>
              Enter the unique receipt code provided after you voted to verify that your vote was recorded.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Input
                placeholder="Enter Receipt Code (e.g. VR-AC92...)"
                value={receiptCode}
                onChange={(e) => setReceiptCode(e.target.value)}
                className="text-lg"
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

            {verificationResult && (
              <div className="mt-6 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200 animate-in fade-in slide-in-from-bottom-2">
                <div className="flex items-start gap-3 mb-3">
                  <CheckCircle2 className="h-6 w-6 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-lg">Verification Successful</p>
                    <p className="mt-1">{verificationResult.message || "This receipt is valid and your vote has been recorded."}</p>
                  </div>
                </div>

                {verificationResult.data && (
                  <div className="mt-4 pt-4 border-t border-green-200/60 space-y-3 text-sm">
                    {verificationResult.data.election_name && (
                      <div className="flex justify-between">
                        <span className="font-semibold opacity-80">Election:</span>
                        <span className="text-right font-medium">{verificationResult.data.election_name}</span>
                      </div>
                    )}
                    {verificationResult.data.position_title && (
                      <div className="flex justify-between">
                        <span className="font-semibold opacity-80">Position:</span>
                        <span className="text-right font-medium">{verificationResult.data.position_title}</span>
                      </div>
                    )}
                    {verificationResult.data.cast_at && (
                      <div className="flex justify-between">
                        <span className="font-semibold opacity-80">Time Cast:</span>
                        <span className="text-right font-medium">
                          {new Date(verificationResult.data.cast_at).toLocaleString()}
                        </span>
                      </div>
                    )}
                    {verificationResult.data.vote_hash && (
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold opacity-80">Vote Hash:</span>
                        <code className="text-xs bg-green-100/50 p-2 rounded break-all border border-green-200">
                          {verificationResult.data.vote_hash}
                        </code>
                      </div>
                    )}
                    {verificationResult.data.tallied !== undefined && (
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-semibold opacity-80">Status:</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${verificationResult.data.tallied ? 'bg-green-200 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {verificationResult.data.tallied ? 'Tallied & Counted' : 'Pending Tally'}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {error && (
              <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-start gap-3 border border-red-200 animate-in fade-in slide-in-from-bottom-2">
                <XCircle className="h-6 w-6 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-lg">Verification Failed</p>
                  <p className="mt-1">{error}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
