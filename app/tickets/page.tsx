import prisma from "@/prisma/db"
import DataTable from "./DataTable"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Pagination from "@/components/Pagination"
import StatusFilter from "@/components/StatusFilter"
import { Status, Ticket } from "@prisma/client"

export interface SearchParams {
  page: string
  status: Status
  orderBy: keyof Ticket
}

const Tickets = async ({ searchParams }: { searchParams: SearchParams }) => {
  const pageSize = 10
  const page = parseInt(searchParams.page) || 1

  const orderBy = searchParams.orderBy ? searchParams.orderBy : "createdAt"
  const statuses = Object.values(Status)

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined

  let where = {}
  //shows just open and started tickets as default
  if (status) {
    where = {
      status,
    }
  } else {
    where = {
      NOT: [{ status: "CLOSED" as Status }],
    }
  }
  const ticketCount = await prisma.ticket.count({
    where,
  })
  const tickets = await prisma.ticket.findMany({
    where,
    orderBy: {
      [orderBy]: searchParams.orderBy === "status" ? "asc" : "desc",
    },
    take: pageSize,
    skip: (page - 1) * pageSize,
  })
  return (
    <div>
      <div className="flex gap-2">
        <Link href="./tickets/new">
          <Button className="text-white-500 ml-3 xl:ml-0">New Ticket</Button>
        </Link>
        <StatusFilter />
      </div>
      <DataTable tickets={tickets} searchParams={searchParams} />
      <Pagination
        itemCount={ticketCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </div>
  )
}

export default Tickets
