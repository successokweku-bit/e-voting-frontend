import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useCandidate } from "@/hooks/candidates/useCandidate";

interface ViewCandidateDialogProps {
    candidateId: number;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ViewCandidateDialog({ candidateId, open, onOpenChange }: ViewCandidateDialogProps) {
    const { data: candidate, isLoading, error } = useCandidate(candidateId, open);


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-xl">
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
                    <div className="grid grid-cols-2 gap-4 py-4">
                        <div className="col-span-2">
                            <label className="text-sm font-medium text-gray-500">Name</label>
                            <p className="text-lg capitalize">{candidate?.user_name || "N/A"}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Party</label>
                            <p className="capitalize">{candidate?.party_name || "N/A"}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Party Acronym</label>
                            <p className="uppercase">{candidate?.party_acronym || "N/A"}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Position</label>
                            <p className="capitalize">{candidate?.position_title || "N/A"}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Election</label>
                            <p className="capitalize">{candidate?.election?.election_title || "N/A"}</p>
                        </div>
                        <div className="col-span-2">
                            <label className="text-sm font-medium text-gray-500">Bio</label>
                            <p>{candidate?.bio || "N/A"}</p>
                        </div>
                        <div className="col-span-2">
                            <label className="text-sm font-medium text-gray-500">Manifesto</label>
                            {candidate?.manifestos && candidate?.manifestos.length > 0 ? (
                                <div className="mt-2 grid gap-2">
                                    {candidate?.manifestos.map((item: { title: string; description: string }, index: number) => (
                                        <div key={index} className="rounded-md border p-3 bg-muted/50">
                                            <div className="font-semibold text-sm">{item?.title}</div>
                                            <div className="text-sm text-muted-foreground mt-1">{item.description}</div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm">N/A</p>
                            )}
                        </div>
                    </div>
                ) : (
                    <div>No candidate found.</div>
                )}
            </DialogContent>
        </Dialog>
    );
}
