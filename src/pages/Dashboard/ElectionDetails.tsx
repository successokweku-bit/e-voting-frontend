import { useParams, useNavigate } from "react-router-dom";
import { useElection } from "@/hooks/useElection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, Users, ChevronRight, CheckSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock positions data since we don't have an endpoint for it yet
const MOCK_POSITIONS = [
    {
        id: 1,
        title: "Student Body President",
        description: "Lead the student government and represent all students",
        icon: "1",
    },
    {
        id: 2,
        title: "Vice President",
        description: "Assist the president and lead special initiatives",
        icon: "2",
    },
    {
        id: 3,
        title: "Treasurer",
        description: "Manage student government budget and finances",
        icon: "3",
    },
    {
        id: 4,
        title: "Secretary",
        description: "Maintain records and communications",
        icon: "4",
    },
];

import { DUMMY_ELECTIONS } from "@/constants/dummyData";

export default function ElectionDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: electionData, isLoading } = useElection(id || "");

    const election = electionData || DUMMY_ELECTIONS.find(e => e.id === id);

    if (isLoading && !election) {
        return <div className="p-10">Loading election details...</div>;
    }

    if (!election) {
        return <div className="p-10">Election not found.</div>;
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header Section */}
            <div className="bg-[#134E4A] text-white py-10 px-4 md:px-10">
                <div className="container mx-auto">
                    <Button
                        variant="ghost"
                        className="text-white/80 hover:text-white hover:bg-white/10 mb-6 pl-0"
                        onClick={() => navigate("/elections/active")}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Elections
                    </Button>

                    <div className="flex items-center gap-3 mb-4">
                        <Badge className="bg-green-500 hover:bg-green-600 text-white border-none">
                            {election.status === "Active" ? "Ongoing" : election.status}
                        </Badge>
                        <div className="flex items-center text-sm font-medium">
                            <span className="flex h-2 w-2 rounded-full bg-white mr-2"></span>
                            Live
                        </div>
                    </div>

                    <h1 className="text-4xl font-bold mb-2">{election.title}</h1>
                    <p className="text-white/80 text-lg mb-8 max-w-2xl">
                        Annual election for student body representatives
                    </p>

                    <div className="flex flex-wrap gap-6">
                        <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3 pr-6 backdrop-blur-sm">
                            <div className="bg-white/20 p-2 rounded-md">
                                <Calendar className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-xs text-white/60 uppercase font-semibold tracking-wider">Election Period</p>
                                <p className="font-medium">{election.startDate} - {election.endDate}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3 pr-6 backdrop-blur-sm">
                            <div className="bg-white/20 p-2 rounded-md">
                                <Users className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-xs text-white/60 uppercase font-semibold tracking-wider">Total Participants</p>
                                <p className="font-medium">2,847 voters</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Positions Section */}
            <div className="container mx-auto py-12 px-4 md:px-10">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-[#0F172A] mb-2">Election Positions</h2>
                    <p className="text-muted-foreground text-lg">Select a position to view candidates and cast your vote</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    {MOCK_POSITIONS.map((position) => (
                        <Card
                            key={position.id}
                            className="group cursor-pointer hover:border-[#134E4A] hover:shadow-md transition-all duration-200"
                            onClick={() => navigate(`/elections/${id}/vote/${position.id}`)} // Placeholder route
                        >
                            <CardContent className="p-6 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-lg bg-slate-100 flex items-center justify-center text-xl font-bold text-slate-600 group-hover:bg-[#134E4A]/10 group-hover:text-[#134E4A] transition-colors">
                                        {position.id}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-[#0F172A] mb-1">{position.title}</h3>
                                        <p className="text-muted-foreground">{position.description}</p>
                                    </div>
                                </div>
                                <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#134E4A] group-hover:text-white transition-all">
                                    <CheckSquare className="h-5 w-5 hidden group-hover:block" />
                                    <ChevronRight className="h-5 w-5 group-hover:hidden" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
