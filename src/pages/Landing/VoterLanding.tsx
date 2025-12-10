import { useElections } from "@/hooks/election/useElections";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, ArrowRight, Clock, ShieldCheck, Vote } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { UserNav } from "@/components/UserNav";

const DUMMY_ELECTIONS = [
  {
    election_id: 1,
    title: "2023 Nigerian General Elections",
    is_active: true,
    start_date: "Feb 25, 2023",
    end_date: "Feb 26, 2023",
  },
  {
    election_id: 2,
    title: "2023 Gubernatorial Elections",
    is_active: false,
    start_date: "Mar 11, 2023",
    end_date: "Mar 12, 2023",
  },
  {
    election_id: 3,
    title: "FCT Area Council Elections",
    is_active: false,
    start_date: "May 20, 2023",
    end_date: "May 20, 2023",
  }
] as any[];

export default function VoterLanding() {
  const { data: elections } = useElections();
  const navigate = useNavigate();

  const displayElections = elections || DUMMY_ELECTIONS;

  const activeElections = displayElections?.filter(e => e.is_active) || [];
  const upcomingElections = displayElections?.filter(e => !e.is_active) || [];

  // if (isLoading) {
  //     return <div className="p-10 container mx-auto">Loading elections...</div>;
  // }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Header */}
      <div className="bg-[#134E4A] text-white py-16 px-4 md:px-10">
        <div className="container mx-auto">
          <div className="flex justify-between items-start mb-6">
            <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
              <ShieldCheck className="mr-2 h-4 w-4" />
              Secure & Transparent Voting
            </div>
            <UserNav />
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Your Voice,<br />
            <span className="text-[#F59E0B]">Your Vote</span>
          </h1>

          <p className="text-white/80 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
            Participate in democratic elections with confidence. VoteHub provides a secure,
            accessible platform for exercising your fundamental right to vote.
          </p>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-4 bg-white/10 rounded-xl p-4 pr-8 backdrop-blur-sm border border-white/10">
              <div className="bg-white/20 p-3 rounded-lg">
                <Vote className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">{activeElections.length}</p>
                <p className="text-sm text-white/70 font-medium">Active Elections</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/10 rounded-xl p-4 pr-8 backdrop-blur-sm border border-white/10">
              <div className="bg-white/20 p-3 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">3,003</p>
                <p className="text-sm text-white/70 font-medium">Total Voters</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-12 px-4 md:px-10">
        {/* Active Elections Section */}
        <div className="mb-12">
          <div className="mb-8">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-green-100 text-green-800 mb-4">
              <span className="flex h-2 w-2 rounded-full bg-green-900 mr-2"></span>
              Live Now
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-[#0F172A] mb-2">Active Elections</h2>
            <p className="text-muted-foreground text-lg">Cast your vote in ongoing elections</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activeElections.length > 0 ? (
              activeElections.map((election) => (
                <Card key={election.election_id} className="flex flex-col border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary" className="bg-[#0F3D3E] text-white hover:bg-[#0F3D3E]/90">
                        Ongoing
                      </Badge>
                      <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
                    </div>
                    <CardTitle className="text-xl font-bold text-[#0F172A] leading-tight">
                      {election.title}
                    </CardTitle>
                    <p className="text-muted-foreground mt-2 text-sm">
                      Annual election for student body representatives
                    </p>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-4">
                    <div className="flex items-start space-x-3 text-sm text-slate-600">
                      <div className="bg-slate-100 p-2 rounded-md">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">Election Period</p>
                        <p className="text-slate-500">{election.start_date} - {election.end_date}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 text-sm text-slate-600">
                      <div className="bg-slate-100 p-2 rounded-md">
                        <Users className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">Total Participants</p>
                        <p className="text-slate-500">2,847 voters</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button
                      className="w-full bg-[#0F4C4F] hover:bg-[#0F4C4F]/90 text-white"
                      onClick={() => navigate(`/vote/elections/${election.election_id}`)}
                    >
                      Vote Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-muted-foreground">
                No active elections found.
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Elections Section */}
        <div>
          <div className="mb-8">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-blue-100 text-blue-800 mb-4">
              <Clock className="h-3 w-3 mr-2" />
              Coming Soon
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-[#0F172A] mb-2">Upcoming Elections</h2>
            <p className="text-muted-foreground text-lg">Prepare for future elections</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcomingElections.length > 0 ? (
              upcomingElections.map((election) => (
                <Card key={election.election_id} className="flex flex-col border-slate-200 shadow-sm hover:shadow-md transition-shadow opacity-90">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50">
                        Upcoming
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-bold text-[#0F172A] leading-tight">
                      {election.title}
                    </CardTitle>
                    <p className="text-muted-foreground mt-2 text-sm">
                      Starts on {election.start_date}
                    </p>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-4">
                    <div className="flex items-start space-x-3 text-sm text-slate-600">
                      <div className="bg-slate-100 p-2 rounded-md">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">Election Period</p>
                        <p className="text-slate-500">{election.start_date} - {election.end_date}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button
                      variant="outline"
                      className="w-full"
                      disabled
                    >
                      Opens Soon
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-muted-foreground">
                No upcoming elections found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
