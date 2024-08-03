import React from "react"
import { Status } from "@prisma/client"
import { Badge } from "./ui/badge"

interface Props {
  status: Status
}

const statusMap: Record<
  Status,
  { label: string; color: "bg-red-400" | "bg-blue-400" | "bg-green-400" }
> = {
  OPEN: { label: "open", color: "bg-red-400" },
  STARTED: { label: "started", color: "bg-blue-400" },
  CLOSED: { label: "closed", color: "bg-green-400" },
}

const TicketStatusBadge = ({ status }: Props) => {
  return (
    <Badge
      className={`${statusMap[status].color} text-background hover:${statusMap[status].color}`}
    >
      {statusMap[status].label}
    </Badge>
  )
}

export default TicketStatusBadge
