import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useParty } from "@/hooks/useParty";

interface ViewPartyDialogProps {
    partyId: number;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ViewPartyDialog({ partyId, open, onOpenChange }: ViewPartyDialogProps) {
    const { data: party, isLoading, error } = useParty(partyId, open);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Party Details</DialogTitle>
                    <DialogDescription>
                        View the details of the political party.
                    </DialogDescription>
                </DialogHeader>
                {isLoading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div className="text-red-500">Failed to load party details.</div>
                ) : party ? (
                    <div className="grid gap-4 py-4">
                        <div>
                            <label className="text-sm font-medium text-gray-500">Name</label>
                            <p className="text-lg font-semibold">{party.name || "N/A"}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Acronym</label>
                            <p>{party.acronym || "N/A"}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Founded</label>
                            <p>{party.founded_date || "N/A"}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Description</label>
                            <p>{party.description || "N/A"}</p>
                        </div>
                    </div>
                ) : (
                    <div>No party found.</div>
                )}
            </DialogContent>
        </Dialog>
    );
}
