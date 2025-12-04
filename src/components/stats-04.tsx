import { Card, CardContent } from "@/components/ui/card";
import { Users, UserCheck, UserX, Shield, Vote, Flag, UserPlus, CheckCircle } from "lucide-react";
import { type DashboardStats } from "@/types/types";

interface StatsProps {
  stats?: DashboardStats;
  totalElections?: number;
  activeElections?: number;
  totalParties?: number;
  totalCandidates?: number;
  totalVotes?: number;
}

export default function Stats({ stats, }: StatsProps) {
  const data = [
    {
      name: "Total Voters",
      stat: stats?.total_users ?? 0,
      icon: Users,
      color: "text-blue-500",
    },
    {
      name: "Active Voters",
      stat: stats?.active_users ?? 0,
      icon: UserCheck,
      color: "text-green-500",
    },
    {
      name: "Inactive Voters",
      stat: stats?.inactive_users ?? 0,
      icon: UserX,
      color: "text-red-500",
    },


    {
      name: "Total Elections",
      stat: stats?.total_elections ?? 0,
      icon: Vote,
      color: "text-indigo-500",
    },
    {
      name: "Active Elections",
      stat: stats?.active_elections ?? 0,
      icon: Shield,
      color: "text-emerald-500",
    },
    {
      name: "Total Parties",
      stat: stats?.total_parties ?? 0,
      icon: Flag,
      color: "text-pink-500",
    },
    {
      name: "Total Candidates",
      stat: stats?.total_candidates ?? 0,
      icon: UserPlus,
      color: "text-cyan-500",
    },
    {
      name: "Total Votes Casted",
      stat: stats?.total_votes ?? 0,
      icon: CheckCircle,
      color: "text-yellow-500",
    },
  ];

  return (
    <div className="flex items-center justify-center w-full">
      <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 w-full">
        {data.map((item) => (
          <Card key={item.name} className="p-6 py-4 w-full hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className="flex items-center justify-between">
                <dt className="text-sm font-medium text-muted-foreground">
                  {item.name}
                </dt>
                <item.icon className={`h-5 w-5 ${item.color}`} />
              </div>
              <dd className="text-3xl font-semibold text-foreground mt-2 flex items-center gap-2">
                {item.stat.toLocaleString()}
              </dd>
            </CardContent>
          </Card>
        ))}
      </dl>
    </div>
  );
}
