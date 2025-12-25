import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { type ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, CircleFadingPlus, MoreVertical, Pencil, Trash, BarChart3 } from "lucide-react"
import { type Election } from "@/types/types"
import { Spinner } from "@/components/ui/spinner"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { CreateElectionDialog } from "@/components/election/CreateElectionDialog"
import { EditElectionDialog } from "@/components/election/EditElectionDialog"
import { DeleteElectionDialog } from "@/components/election/DeleteElectionDialog"
import { useElections } from "@/hooks/election/useElections"

import { ViewElectionDialog } from "@/components/election/ViewElectionDialog"
import { Eye } from "lucide-react"

const ElectionActions = ({ election }: { election: Election }) => {
  const navigate = useNavigate()
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
          <DropdownMenuItem onClick={() => navigate(`/dashboard/elections/${election.election_id}/tracking`)}>
            <BarChart3 className="mr-2 h-4 w-4" />
            Track
          </DropdownMenuItem>
          <DropdownMenuSeparator />
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
        electionId={election.election_id}
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const statusConfig: Record<string, { label: string; className: string }> = {
        ongoing: { label: "Ongoing", className: "bg-emerald-500 hover:bg-emerald-600 text-white border-0" },
        upcoming: { label: "Upcoming", className: "bg-blue-500 hover:bg-blue-600 text-white border-0" },
        past: { label: "Past", className: "bg-slate-500 hover:bg-slate-600 text-white border-0" },
      };
      const config = statusConfig[status] || { label: status || "Unknown", className: "bg-gray-500 text-white border-0" };
      return <Badge className={config.className}>{config.label}</Badge>;
    }
  },
  {
    id: "actions",
    cell: ({ row }) => <ElectionActions election={row.original} />,
  },
]



export default function Elections() {
  const { data: elections, isLoading } = useElections()

  if (isLoading) {
    return (
      <div className="flex bg-slate-50 h-screen w-full items-center justify-center">
        <Spinner className="size-10 text-[#134E4A]" />
      </div>
    );
  }

  const data = elections || []

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
