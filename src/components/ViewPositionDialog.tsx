import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { usePosition } from "@/hooks/usePosition";

interface ViewPositionDialogProps {
    positionId: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ViewPositionDialog({ positionId, open, onOpenChange }: ViewPositionDialogProps) {
    const { data: position, isLoading, error } = usePosition(positionId, open);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Position Details</DialogTitle>
                    <DialogDescription>
                        View the details of the position.
                    </DialogDescription>
                </DialogHeader>
                {isLoading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div className="text-red-500">Failed to load position details.</div>
                ) : position ? (
                    <div className="grid gap-4 py-4">
                        <div>
                            <label className="text-sm font-medium text-gray-500">Title</label>
                            <p className="text-lg font-semibold">{position.title || "N/A"}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Description</label>
                            <p>{position.description || "N/A"}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Election ID</label>
                            <p>{position.election_id || "N/A"}</p>
                        </div>
                    </div>
                ) : (
                    <div>No position found.</div>
                )}
            </DialogContent>
        </Dialog>
    );
}
