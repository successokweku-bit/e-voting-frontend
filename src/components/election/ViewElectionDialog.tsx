import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useElection } from "@/hooks/election/useElection";

interface ViewElectionDialogProps {
    electionId: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ViewElectionDialog({ electionId, open, onOpenChange }: ViewElectionDialogProps) {
    const { data: election, isLoading, error } = useElection(electionId, open);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Election Details</DialogTitle>
                    <DialogDescription>
                        View the details of the election.
                    </DialogDescription>
                </DialogHeader>
                {isLoading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div className="text-red-500">Failed to load election details.</div>
                ) : election ? (
                    <div className="grid gap-4 py-4">
                        <div>
                            <label className="text-sm font-medium text-gray-500">Title</label>
                            <p className="text-lg font-semibold">{election.title || "N/A"}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Start Date</label>
                            <p>{election.start_date || "N/A"}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">End Date</label>
                            <p>{election.end_date || "N/A"}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Status</label>
                            <p>{election.is_active ? "Active" : "Inactive"}</p>
                        </div>
                    </div>
                ) : (
                    <div>No election found.</div>
                )}
            </DialogContent>
        </Dialog>
    );
}
