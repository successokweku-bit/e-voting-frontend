import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useVoter } from "@/hooks/voter/useVoter";

interface ViewVoterDialogProps {
    voterId: number | string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ViewVoterDialog({ voterId, open, onOpenChange }: ViewVoterDialogProps) {
    const { data: voter, isLoading, error } = useVoter(String(voterId), open);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Voter Details</DialogTitle>
                    <DialogDescription>
                        View the details of the voter.
                    </DialogDescription>
                </DialogHeader>
                {isLoading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div className="text-red-500">Failed to load voter details.</div>
                ) : voter ? (
                    <div className="grid gap-4 py-4">
                        <div>
                            <label className="text-sm font-medium text-gray-500">Full Name</label>
                            <p className="text-lg font-semibold">{voter.full_name}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Email</label>
                            <p>{voter.email || "N/A"}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">NIN</label>
                            <p>{voter.nin || "N/A"}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">State of Residence</label>
                            <p>{voter.state_of_residence || "N/A"}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Date of Birth</label>
                            <p>{voter.date_of_birth ? voter.date_of_birth.replace(/-/g, '/') : "N/A"}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Status</label>
                            <p>{voter.is_active ? "Active" : "Inactive"}</p>
                        </div>
                    </div>
                ) : (
                    <div>No voter found.</div>
                )}
            </DialogContent>
        </Dialog>
    );
}
