import { useState } from "react"
import { type ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, CircleFadingPlus, MoreVertical, Pencil, Trash } from "lucide-react"
import { type Candidate } from "@/types/types"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CreateCandidateDialog } from "@/components/CreateCandidateDialog"
import { EditCandidateDialog } from "@/components/EditCandidateDialog"
import { DeleteCandidateDialog } from "@/components/DeleteCandidateDialog"
import { useElections } from "@/hooks/useElections"
import { useCandidates } from "@/hooks/useCandidates"

import { ViewCandidateDialog } from "@/components/ViewCandidateDialog"
import { Eye } from "lucide-react"

const CandidateActions = ({ candidate }: { candidate: Candidate }) => {
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showViewDialog, setShowViewDialog] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setShowViewDialog(true)}>
            <Eye className="mr-2 h-4 w-4" />
            View
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowDeleteDialog(true)} className="text-red-600">
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ViewCandidateDialog
        candidateId={candidate.id}
        open={showViewDialog}
        onOpenChange={setShowViewDialog}
      />
      <EditCandidateDialog
        candidate={candidate}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
      />
      <DeleteCandidateDialog
        candidateId={candidate.id}
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
      />
    </>
  )
}


const ElectionCell = ({ electionId }: { electionId: string }) => {
  const { data: elections } = useElections()
  const election = elections?.find((e) => e.id === electionId)
  return <div>{election?.title || electionId}</div>
}

const columns: ColumnDef<Candidate>[] = [
  {
    id: "serialNumber",
    header: "S/N",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "party",
    header: "Party",
  },
  {
    accessorKey: "position",
    header: "Position",
  },
  {
    accessorKey: "election_id",
    header: "Election",
    cell: ({ row }) => <ElectionCell electionId={row.original.election_id} />,
  },
  {
    id: "actions",
    cell: ({ row }) => <CandidateActions candidate={row.original} />,
  },
]


import { DUMMY_CANDIDATES } from "@/constants/dummyData"

export default function Candidates() {
  const { data: candidates } = useCandidates()

  // if (isLoading) {
  //   return <div className="container mx-auto md:px-10  py-10">Loading...</div>
  // }

  const data = candidates || DUMMY_CANDIDATES

  return (
    <div className="container mx-auto md:px-10  py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold  ">Candidates</h1>
        <CreateCandidateDialog>
          <Button>Create Candidate <CircleFadingPlus /></Button>
        </CreateCandidateDialog>
      </div>
      <DataTable columns={columns} data={data} searchKey="name" />
    </div>
  )
}
