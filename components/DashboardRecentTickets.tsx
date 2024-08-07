import React from "react"
import TicketPriority from "@/components/TicketPriority"
import TicketStatusBadge from "@/components/TicketStatusBadge"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Prisma } from "@prisma/client"
import Link from "next/link"
import { CardContent } from "./ui/card"

type TicketWithUser = Prisma.TicketGetPayload<{
  include: { assignedToUser: true }
}>

const DashboardRecentTickets = ({ tickets }: { tickets: TicketWithUser[] }) => {
  return (
    <Card className="col-span-3" style={{ background: "#0c0a09" }}>
      <CardHeader>
        <CardTitle>Recently Updated</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {tickets
            ? tickets.map((ticket) => (
                <div className="flex items-center lg:min-h-15" key={ticket.id}>
                  <TicketStatusBadge status={ticket.status} />
                  <div className="ml-4 space-y-1">
                    <Link href={`ticket/${ticket.id}`}>
                      <p>{ticket.title}</p>
                      <p>{ticket.assignedToUser?.name || "Unassigned"}</p>
                    </Link>
                  </div>
                  <div className="ml-auto font-medium">
                    <TicketPriority priority={ticket.priority} />
                  </div>
                </div>
              ))
            : null}
        </div>
      </CardContent>
    </Card>
  )
}

export default DashboardRecentTickets
