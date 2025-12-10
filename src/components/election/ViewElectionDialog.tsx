import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useElection } from "@/hooks/election/useElection";

interface ViewElectionDialogProps {
    electionId: number;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ViewElectionDialog({ electionId, open, onOpenChange }: ViewElectionDialogProps) {
    const { data: election, isLoading, error } = useElection(electionId, open);

    const formatDate = (dateString: string | null | undefined) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };
 
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Election Details</DialogTitle>
                    <DialogDescription>
                        View the details of the election.
                    </DialogDescription>
                </DialogHeader>
                {isLoading ? (
                    <div className="py-4 text-center">Loading...</div>
                ) : error ? (
                    <div className="text-red-500">Failed to load election details.</div>
                ) : election ? (
                    <div className="grid grid-cols-2 gap-4 py-4">
                        <div className="col-span-2">
                            <label className="text-sm font-medium text-gray-500">Title</label>
                            <p className="text-lg font-semibold">{election.title || "N/A"}</p>
                        </div>
                        <div className="col-span-2">
                            <label className="text-sm font-medium text-gray-500">Description</label>
                            <p>{election.description || "N/A"}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Election Type</label>
                            <p className="capitalize">{election.election_type || "N/A"}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">State</label>
                            <p>{election.state || "N/A"}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Start Date</label>
                            <p>{formatDate(election.start_date)}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">End Date</label>
                            <p>{formatDate(election.end_date)}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Status</label>
                            <p>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${election.is_active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                                    {election.is_active ? "Active" : "Inactive"}
                                </span>
                            </p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Positions</label>
                            <p>{election.position_count || 0} position(s)</p>
                        </div>
                        <div className="col-span-2">
                            <label className="text-sm font-medium text-gray-500">Created At</label>
                            <p className="text-sm text-muted-foreground">{formatDate(election.created_at)}</p>
                        </div>
                    </div>
                ) : (
                    <div>No election found.</div>
                )}
            </DialogContent>
        </Dialog>
    );
}
