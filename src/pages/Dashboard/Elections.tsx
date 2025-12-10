import { useState } from "react"
import { type ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, CircleFadingPlus, MoreVertical, Pencil, Trash } from "lucide-react"
import { type Election } from "@/types/types"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CreateElectionDialog } from "@/components/election/CreateElectionDialog"
import { EditElectionDialog } from "@/components/election/EditElectionDialog"
import { DeleteElectionDialog } from "@/components/election/DeleteElectionDialog"
import { useElections } from "@/hooks/election/useElections"

import { ViewElectionDialog } from "@/components/election/ViewElectionDialog"
import { Eye } from "lucide-react"

const ElectionActions = ({ election }: { election: Election }) => {
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

      <ViewElectionDialog
        electionId={election.election_id.toString()}
        open={showViewDialog}
        onOpenChange={setShowViewDialog}
      />
      <EditElectionDialog
        election={election}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
      />
      <DeleteElectionDialog
        electionId={election.election_id.toString()}
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
      />
    </>
  )
}

const columns: ColumnDef<Election>[] = [
  {
    id: "serialNumber",
    header: "S/N",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "start_date",
    header: "Start Date",
    cell: ({ row }) => {
      const date = row.getValue("start_date") as string;
      return date ? new Date(date).toLocaleDateString() : "";
    }
  },
  {
    accessorKey: "end_date",
    header: "End Date",
    cell: ({ row }) => {
      const date = row.getValue("end_date") as string;
      return date ? new Date(date).toLocaleDateString() : "";
    }
  },
  {
    accessorKey: "is_active",
    header: "Status",
    cell: ({ row }) => {
      return row.getValue("is_active") ? "Active" : "Inactive";
    }
  },
  {
    id: "actions",
    cell: ({ row }) => <ElectionActions election={row.original} />,
  },
]


import { DUMMY_ELECTIONS } from "@/constants/dummyData"

export default function Elections() {
  const { data: elections } = useElections()

  // if (isLoading) {
  //   return <div className="container mx-auto md:px-10 py-10">Loading...</div>
  // }

  const data = elections || DUMMY_ELECTIONS

  return (
    <div className="container mx-auto md:px-10 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold  ">All Elections</h1>
        <CreateElectionDialog>
          <Button>Create Election <CircleFadingPlus /></Button>
        </CreateElectionDialog>
      </div>
      <DataTable columns={columns} data={data} searchKey="title" />
    </div>
  )
}
