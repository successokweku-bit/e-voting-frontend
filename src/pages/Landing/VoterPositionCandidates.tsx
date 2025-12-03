import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useCandidates } from "@/hooks/useCandidates";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2, CheckSquare, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

// Mock positions data
const POSITIONS_DATA: Record<string, { title: string; description: string }> = {
  "1": { title: "Student Body President", description: "Lead the student government and represent all students" },
  "2": { title: "Vice President", description: "Assist the president and lead special initiatives" },
  "3": { title: "Treasurer", description: "Manage student government budget and finances" },
  "4": { title: "Secretary", description: "Maintain records and communications" },
};

const DUMMY_CANDIDATES = [
  {
    id: "1",
    name: "David Kim",
    party: "Progressive Student Alliance",
    position: "Vice President",
    election_id: "1",
    bio: "Sophomore with experience in student organizations",
    initials: "DK",
    priorities: [
      "Student organization funding",
      "Campus diversity initiatives",
      "Community partnerships"
    ]
  },
  {
    id: "2",
    name: "Emma Rodriguez",
    party: "Students United",
    position: "Vice President",
    election_id: "1",
    bio: "Junior passionate about student engagement",
    initials: "ER",
    priorities: [
      "More social events",
      "Career development resources",
      "Athletic program support"
    ]
  }
] as any[];

export default function VoterPositionCandidates() {
  const { electionId, positionId } = useParams<{ electionId: string; positionId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { data: candidates, isLoading } = useCandidates();
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [isVoteDialogOpen, setIsVoteDialogOpen] = useState(false);

  // Filter candidates for this election and position (mock logic for position matching)
  // In a real app, we'd filter by position ID or name. 
  // Here I'll just show all candidates for the election for demo purposes, 
  // or filter if position matches candidate.position
  const positionInfo = POSITIONS_DATA[positionId || ""] || { title: "Position", description: "Select a candidate to cast your vote" };
  const positionTitle = positionInfo.title;

  const displayCandidates = candidates || DUMMY_CANDIDATES;

  const positionCandidates = displayCandidates?.filter(
    (c) => c.election_id === electionId && c.position === positionTitle
  ) || [];

  const handleSelectCandidate = (candidateId: string) => {
    setSelectedCandidateId(candidateId);
  };

  const handleSubmitVote = () => {
    if (!selectedCandidateId) {
      toast.error("Please select a candidate.");
      return;
    }
    if (!isAuthenticated) {
      toast.error("You must be logged in to vote.");
      navigate("/login", { state: { from: location } });
      return;
    }
    const candidate = positionCandidates.find(c => c.id === selectedCandidateId);
    if (candidate) {
      setIsVoteDialogOpen(true);
    }
  };

  const confirmVote = () => {
    const candidate = positionCandidates.find(c => c.id === selectedCandidateId);
    if (candidate) {
      toast.success(`Vote cast for ${candidate.name}!`);
      setIsVoteDialogOpen(false);
      navigate(`/vote/elections/${electionId}`);
    }
  };

  if (isLoading && !candidates && !DUMMY_CANDIDATES) {
    return <div className="p-10 container mx-auto">Loading candidates...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-[#134E4A] text-white py-12 px-4 md:px-10">
        <div className="container mx-auto">
          <Button
            variant="ghost"
            className="text-white/80 hover:text-white hover:bg-white/10 mb-8 pl-0 -ml-3"
            onClick={() => navigate(`/vote/elections/${electionId}`)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Positions
          </Button>

          <div className="mb-6">
            <Badge variant="outline" className="text-white border-white/20 bg-white/10 hover:bg-white/20 px-4 py-1.5 text-sm font-normal rounded-full gap-2">
              <CheckSquare className="w-4 h-4" />
              Candidate Selection
            </Badge>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">{positionInfo.title}</h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl leading-relaxed">
            {positionInfo.description}
          </p>
        </div>
      </div>

      <div className="container mx-auto py-12 px-4 md:px-10">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-2">Meet the Candidates</h2>
          <p className="text-muted-foreground text-lg">Review each candidate's platform and select your choice</p>
        </div>

        {positionCandidates.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {positionCandidates.map((candidate) => (
              <Card 
                key={candidate.id} 
                className={`relative cursor-pointer transition-all duration-200 ${
                  selectedCandidateId === candidate.id 
                    ? 'border-[#134E4A] shadow-md ring-2 ring-[#134E4A]/20' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}
                onClick={() => handleSelectCandidate(candidate.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center text-xl font-bold text-slate-600">
                        {candidate.initials}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#0F172A] mb-1">{candidate.name}</h3>
                        <p className="text-sm text-muted-foreground">{candidate.party}</p>
                      </div>
                    </div>
                    <div 
                      className={`h-6 w-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                        selectedCandidateId === candidate.id
                          ? 'border-[#134E4A] bg-[#134E4A]'
                          : 'border-slate-300'
                      }`}
                    >
                      {selectedCandidateId === candidate.id && (
                        <div className="h-3 w-3 rounded-full bg-white" />
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 mb-4">{candidate.bio}</p>

                  <div className="bg-slate-50 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-[#0F172A] mb-3 flex items-center gap-2">
                      <div className="h-1 w-1 bg-[#134E4A] rounded-full"></div>
                      Platform & Priorities
                    </h4>
                    <ul className="space-y-2">
                      {candidate.priorities?.map((priority: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                          <Check className="h-4 w-4 text-[#134E4A] mt-0.5 shrink-0" />
                          <span>{priority}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    className={`w-full mt-4 ${
                      selectedCandidateId === candidate.id
                        ? 'bg-[#134E4A] hover:bg-[#134E4A]/90'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectCandidate(candidate.id);
                    }}
                  >
                    Select Candidate
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground text-lg">No candidates found for this position.</p>
            <p className="text-sm text-slate-500 mt-2">
              (Ensure candidates are created with position "{positionTitle}" and election ID "{electionId}")
            </p>
          </div>
        )}

        {positionCandidates.length > 0 && (
          <div className="mt-8 flex justify-end">
            <Button
              size="lg"
              className="bg-[#134E4A] hover:bg-[#134E4A]/90 px-8"
              onClick={handleSubmitVote}
              disabled={!selectedCandidateId}
            >
              <CheckCircle2 className="mr-2 h-5 w-5" />
              Submit Vote
            </Button>
          </div>
        )}
      </div>

      <Dialog open={isVoteDialogOpen} onOpenChange={setIsVoteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Your Vote</DialogTitle>
            <DialogDescription>
              Are you sure you want to vote for this candidate? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {selectedCandidateId && (() => {
            const candidate = positionCandidates.find(c => c.id === selectedCandidateId);
            return candidate ? (
              <div className="flex items-center gap-4 py-4 bg-slate-50 rounded-lg px-4 my-2">
                <div className="h-12 w-12 rounded-full bg-slate-200 flex items-center justify-center shrink-0 text-lg font-bold text-slate-600">
                  {candidate.initials}
                </div>
                <div>
                  <h4 className="font-bold text-[#0F172A]">{candidate.name}</h4>
                  <p className="text-sm text-muted-foreground">{candidate.party}</p>
                </div>
              </div>
            ) : null;
          })()}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsVoteDialogOpen(false)}>Cancel</Button>
            <Button className="bg-[#134E4A] hover:bg-[#134E4A]/90" onClick={confirmVote}>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Confirm Vote
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
