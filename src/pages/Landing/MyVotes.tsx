import { useNavigate } from "react-router-dom";
import { useDashActiveElections, useDashPastElections, useMyVote } from "@/hooks/election/useElection";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Calendar, Vote, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { UserNav } from "@/components/UserNav";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const VoteDetails = ({ electionId }: { electionId: number }) => {
  const { data: myVote, isLoading, error } = useMyVote(electionId);

  if (isLoading) return <div className="py-4 text-center text-sm text-muted-foreground"><Spinner className="inline-block size-4 mr-2" /> Loading vote details...</div>;

  if (error || !myVote) return <div className="py-4 text-center text-sm text-muted-foreground">No vote record found or failed to load.</div>;

  // myVote structure: { "PositionName": { "CandidateName": candidateObject? or just name? } } 
  // Based on "list positions and candidates they voted for", let's assume the API returns:
  // { positions: [ { positionTitle: "Gov", candidateName: "Name", partyName: "Party" } ] }
  // OR returns list of Vote objects.
  // The provided API response wasn't shown, so I have to guess or handle generic object.
  // Let's assume it returns an array of vote details or an object keyed by position.

  // Handling robustly:
  let voteList = [];
  if (Array.isArray(myVote)) {
    voteList = myVote;
  } else if (typeof myVote === 'object') {
    // If it's like the tally result { Position: Candidate }
    voteList = Object.entries(myVote).map(([pos, cand]) => ({ position: pos, candidate: cand }));
  }

  if (voteList.length === 0) return <div className="py-4 text-center text-sm text-yellow-600">You did not participate in this election.</div>;

  return (
    <div className="space-y-4 pt-2">
      {voteList.map((vote: any, idx: number) => (
        <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              {vote.position_title || vote.position || 'Position'}
            </p>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span className="font-semibold text-slate-900">{vote.candidate_name || vote.candidate || 'Unknown Candidate'}</span>
            </div>
          </div>
          {vote.party_acronym && (
            <Badge variant="outline">{vote.party_acronym}</Badge>
          )}
        </div>
      ))}
    </div>
  );
};

export default function MyVotes() {
  const navigate = useNavigate();
  // Fetch both active and past elections to show full history
  const { data: activeElections, isLoading: activeLoading } = useDashActiveElections();
  const { data: pastElections, isLoading: pastLoading } = useDashPastElections();

  const isLoading = activeLoading || pastLoading;
  const allElections = [...(activeElections || []), ...(pastElections || [])];

  // deduplicate by id just in case
  const uniqueElections = Array.from(new Map(allElections.map(item => [item.id, item])).values())
    .sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime());

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner className="size-10 text-[#134E4A]" />
      </div>
    );
  }

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
        </div>
      </div>

      <div className="container mx-auto py-12 px-4 md:px-10">
        <Card className="border-none shadow-sm bg-white">
          <CardHeader>
            <CardTitle>Election History</CardTitle>
            <CardDescription>Click on an election to verify your voting choices.</CardDescription>
          </CardHeader>
          <CardContent>
            {uniqueElections.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {uniqueElections.map((election) => (
                  <AccordionItem key={election.id} value={String(election.id)} className="border-b border-slate-100">
                    <AccordionTrigger className="hover:bg-slate-50/50 px-4 rounded-lg hover:no-underline py-4">
                      <div className="flex flex-col md:flex-row md:items-center gap-4 text-left w-full group">
                        <div className=" bg-slate-100 p-2 rounded-md group-hover:bg-[#134E4A]/10 transition-colors">
                          <Vote className="h-5 w-5 text-slate-500 group-hover:text-[#134E4A]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900 group-hover:text-[#134E4A] transition-colors">{election.title}</h3>
                          <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(election.end_date).toLocaleDateString()}
                            </span>
                            <Badge variant={election.end_date && new Date(election.end_date) < new Date() ? "secondary" : "default"} className="text-[10px] h-5">
                              {election.end_date && new Date(election.end_date) < new Date() ? "Ended" : "Active"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <VoteDetails electionId={election.id} />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-12 text-slate-500">
                No elections found in your history.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
