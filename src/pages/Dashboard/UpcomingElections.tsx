import { type ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { useElections } from "@/hooks/useElections"
import { DUMMY_ELECTIONS } from "@/constants/dummyData"
import { type Election } from "@/types/types"

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
    accessorKey: "startDate",
    header: "Start Date",
  },
  {
    accessorKey: "endDate",
    header: "End Date",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
]

export default function UpcomingElections() {
  const { data: elections } = useElections()

  const displayElections = elections || DUMMY_ELECTIONS
  const data = displayElections?.filter((e) => e.status === "Upcoming") || []

  // if (isLoading) {
  //   return <div className="container mx-auto py-10">Loading...</div>
  // }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Upcoming Elections</h1>
      <DataTable columns={columns} data={data} searchKey="title" />
    </div>
  )
}
