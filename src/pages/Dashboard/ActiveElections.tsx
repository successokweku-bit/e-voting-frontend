import { useElections } from "@/hooks/useElections";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

import { DUMMY_ELECTIONS } from "@/constants/dummyData";

export default function ActiveElections() {
  const { data: elections, isLoading } = useElections();
  const navigate = useNavigate();

  const displayElections = elections || DUMMY_ELECTIONS;

  const activeElections = displayElections?.filter(e => e.status === "Active") || [];

  if (isLoading) {
    return <div className="p-10">Loading elections...</div>;
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-10">
      <div className="mb-8">
        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-green-100 text-green-800 mb-4">
          <span className="flex h-2 w-2 rounded-full bg-green-600 mr-2"></span>
          Live Now
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-[#0F172A] mb-2">Active Elections</h1>
        <p className="text-muted-foreground text-lg">Cast your vote in ongoing elections</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {activeElections.length > 0 ? (
          activeElections.map((election) => (
            <Card key={election.id} className="flex flex-col border-slate-200 shadow-sm hover:shadow-md transition-shadow">
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
                    <p className="text-slate-500">{election.startDate} - {election.endDate}</p>
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
                  onClick={() => navigate(`/elections/${election.id}`)}
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
  );
}
