import { useState } from "react"
import { type ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, CircleFadingPlus, MoreVertical, Pencil, Trash, Eye } from "lucide-react"
import { type Position } from "@/types/types"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CreatePositionDialog } from "@/components/position/CreatePositionDialog"
import { EditPositionDialog } from "@/components/position/EditPositionDialog"
import { DeletePositionDialog } from "@/components/position/DeletePositionDialog"
import { ViewPositionDialog } from "@/components/position/ViewPositionDialog"
import { usePositions } from "@/hooks/usePositions"
 
const PositionActions = ({ position }: { position: Position }) => {
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

      <ViewPositionDialog
        positionId={position.id}
        open={showViewDialog}
        onOpenChange={setShowViewDialog}
      />
      <EditPositionDialog
        position={position}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
      />
      <DeletePositionDialog
        positionId={position.id}
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
      />
    </>
  )
}

const columns: ColumnDef<Position>[] = [
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
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "election_title",
    header: "Election Title",
  },
  {
    id: "actions",
    cell: ({ row }) => <PositionActions position={row.original} />,
  },
]

export default function Positions() {
  const { data: positions, isLoading } = usePositions()

  if (isLoading) {
      return <div>Loading...</div>
  }

  const data = positions || [];

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Positions</h1>
        <CreatePositionDialog>
          <Button>
            Create Position <CircleFadingPlus className="ml-2 h-4 w-4" />
          </Button>
        </CreatePositionDialog>
      </div>
      <DataTable columns={columns} data={data} searchKey="title" />
    </div>
  )
}
