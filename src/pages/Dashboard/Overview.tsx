import Stats from "@/components/stats-04";
import { useElections } from "@/hooks/useElections";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreateElectionDialog } from "@/components/election/CreateElectionDialog";
import { RegisterVoterDialog } from "@/components/voter/RegisterVoterDialog";
import { CreateCandidateDialog } from "@/components/candidate/CreateCandidateDialog";
import { CreatePartyDialog } from "@/components/party/CreatePartyDialog";
import { Users, Vote, UserPlus, Flag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function Overview() {
  const { data: elections } = useElections();
  const { data: stats } = useDashboardStats();

  const displayElections = elections;

  // Sort elections by start date descending to show most recent first
  const recentElections = displayElections
    ?.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
    .slice(0, 3) || [];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Overview</h1>

      <Stats stats={stats} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Recent Elections</CardTitle>
            <CardDescription>
              The most recent elections created in the system.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentElections.length > 0 ? (
                recentElections.map((election) => (
                  <div key={election.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div className="space-y-1">
                      <p className="font-medium leading-none">{election.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(election.startDate), "MMM d, yyyy")} - {format(new Date(election.endDate), "MMM d, yyyy")}
                      </p>
                    </div>
                    <Badge variant={election.status === "Active" ? "default" : "secondary"}>
                      {election.status}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No elections found.</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Commonly used actions for managing the system.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <CreateElectionDialog>
              <Button className="w-full justify-start" variant="outline">
                <Vote className="mr-2 h-4 w-4" />
                Create New Election
              </Button>
            </CreateElectionDialog>

            <RegisterVoterDialog>
              <Button className="w-full justify-start" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Register New Voter
              </Button>
            </RegisterVoterDialog>

            <CreateCandidateDialog>
              <Button className="w-full justify-start" variant="outline">
                <UserPlus className="mr-2 h-4 w-4" />
                Add Candidate
              </Button>
            </CreateCandidateDialog>

            <CreatePartyDialog>
              <Button className="w-full justify-start" variant="outline">
                <Flag className="mr-2 h-4 w-4" />
                Add Political Party
              </Button>
            </CreatePartyDialog>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
