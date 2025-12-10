import { useState } from "react"
import { type ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, CircleFadingPlus, MoreVertical, Pencil, Trash } from "lucide-react"
import { type Party } from "@/types/types"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CreatePartyDialog } from "@/components/party/CreatePartyDialog"
import { EditPartyDialog } from "@/components/party/EditPartyDialog"
import { DeletePartyDialog } from "@/components/party/DeletePartyDialog"
import { useParties } from "@/hooks/party/useParties"

import { ViewPartyDialog } from "@/components/party/ViewPartyDialog"
import { Eye } from "lucide-react"

const PartyActions = ({ party }: { party: Party }) => {
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

      <ViewPartyDialog
        partyId={party.id}
        open={showViewDialog}
        onOpenChange={setShowViewDialog}
      />
      <EditPartyDialog
        party={party}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
      />
      <DeletePartyDialog
        partyId={party.id}
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
      />
    </>
  )
}

const columns: ColumnDef<Party>[] = [
  {
    id: "serialNumber",
    cell: ({ row }) => row.index + 1,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          S/N
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Party Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "acronym",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Acronym
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "founded_date",
    header: "Founded",
    cell: ({ row }) => {
      const date = new Date(row.original.founded_date);
      return date.toLocaleDateString();
    }
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <div className="truncate max-w-sm">{row.original.description}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => <PartyActions party={row.original} />,
  },
]


export default function Parties() {
  const { data: parties, isLoading } = useParties()

  if (isLoading) {
    return <div className="container mx-auto md:px-10 py-10">Loading...</div>
  }

  const data = parties || []

  return (
    <div className="container mx-auto md:px-10 py-10 space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold ">Political Parties</h1>
        <CreatePartyDialog>
          <Button>Create Party <CircleFadingPlus /></Button>
        </CreatePartyDialog>
      </div>
      <DataTable columns={columns} data={data} searchKey="" />
    </div>
  )
}
