import prisma from "@/prisma/db"
import DataTable from "./DataTable"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const Tickets = async () => {
  const tickets = await prisma.ticket.findMany()
  return (
    <div>
      <Link href="./tickets/new">
        <Button className="text-white-500">New Ticket</Button>
      </Link>
      <DataTable tickets={tickets} />
    </div>
  )
}

export default Tickets
