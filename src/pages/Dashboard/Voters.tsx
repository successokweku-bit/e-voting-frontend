import { useState } from "react"
import { type ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, CircleFadingPlus, MoreVertical, Pencil, Trash } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { type User } from "@/types/types"
import { RegisterVoterDialog } from "@/components/RegisterVoterDialog"
import { EditVoterDialog } from "@/components/EditVoterDialog"
import { DeleteVoterDialog } from "@/components/DeleteVoterDialog"
import { useVoters } from "@/hooks/useVoters"

import { ViewVoterDialog } from "@/components/ViewVoterDialog"
import { Eye } from "lucide-react"

const VoterActions = ({ user }: { user: User }) => {
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

      <ViewVoterDialog
        voterId={user.id}
        open={showViewDialog}
        onOpenChange={setShowViewDialog}
      />
      <EditVoterDialog
        user={user}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
      />
      <DeleteVoterDialog
        voterId={user.id}
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
      />
    </>
  )
}

const columns: ColumnDef<User>[] = [
  {
    id: "serialNumber",
    header: "S/N",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "full_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Full Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "nin",
    header: "NIN",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "state_of_residence",
    header: "State",
  },
  {
    accessorKey: "is_active",
    header: "Status",
    cell: ({ row }) => {
      return row.original.is_active ? "Active" : "Inactive"
    }
  },
  {
    id: "actions",
    cell: ({ row }) => <VoterActions user={row.original} />,
  },
]

export default function Voters() {
  const { data: voters, isLoading } = useVoters()

   if (isLoading) {
    return <div className="container mx-auto md:px-10 py-10">Loading...</div>
  }

  const data = voters || []

  return (
    <div className="container mx-auto md:px-10 py-10 space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Voters</h1>
        <RegisterVoterDialog>
          <Button>Register Voter <CircleFadingPlus /></Button>
        </RegisterVoterDialog>
      </div>
      <DataTable columns={columns} data={data} searchKey="full_name" />
    </div>
  )
}
