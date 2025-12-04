import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useCandidate } from "@/hooks/useCandidate";
import { useElections } from "@/hooks/useElections";

interface ViewCandidateDialogProps {
    candidateId: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ViewCandidateDialog({ candidateId, open, onOpenChange }: ViewCandidateDialogProps) {
    const { data: candidate, isLoading, error } = useCandidate(candidateId, open);
    const { data: elections } = useElections();

    const electionTitle = elections?.find((e) => e.id === candidate?.election_id)?.title || candidate?.election_id || "N/A";

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Candidate Details</DialogTitle>
                    <DialogDescription>
                        View the details of the candidate.
                    </DialogDescription>
                </DialogHeader>
                {isLoading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div className="text-red-500">Failed to load candidate details.</div>
                ) : candidate ? (
                    <div className="grid gap-4 py-4">
                        <div>
                            <label className="text-sm font-medium text-gray-500">Name</label>
                            <p className="text-lg font-semibold">{candidate.name || "N/A"}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Party</label>
                            <p>{candidate.party || "N/A"}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Position</label>
                            <p>{candidate.position || "N/A"}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Election</label>
                            <p>{electionTitle}</p>
                        </div>
                    </div>
                ) : (
                    <div>No candidate found.</div>
                )}
            </DialogContent>
        </Dialog>
    );
}
