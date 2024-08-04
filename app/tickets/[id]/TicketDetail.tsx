import { Ticket } from "@prisma/client"
import React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import TicketStatusBadge from "@/components/TicketStatusBadge"
import TicketPriority from "@/components/TicketPriority"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import ReactMarkDown from "react-markdown"
import DeleteButton from "./DeleteButton"

interface Props {
  ticket: Ticket
}

const TicketDetail = ({ ticket }: Props) => {
  return (
    <div className="lg:grid lg:grid-cols-4">
      <Card className="mx-4 mb-4 lg:col-span-3 lg:mr-4">
        <CardHeader>
          <div className="flex justify-between mb-3">
            <TicketStatusBadge status={ticket.status} />
            <TicketPriority priority={ticket.priority} />
          </div>
          <CardTitle>{ticket.title}</CardTitle>
          <CardDescription>{`Created: ${ticket.createdAt.toLocaleDateString(
            "en-GB",
            {
              year: "2-digit",
              month: "2-digit",
              day: "2-digit",
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            }
          )}`}</CardDescription>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <ReactMarkDown>{ticket.description}</ReactMarkDown>
        </CardContent>
        <CardFooter>
          {`Last Updated: ${ticket.updatedAt.toLocaleDateString("en-GB", {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}`}
        </CardFooter>
      </Card>
      <div className="mt-3 mx-4 flex lg:flex-col lg:mx-0 gap-2">
        <Link href={`/tickets/edit/${ticket.id}`}>
          <Button className={`mr-3 mb-4 text-white-500 w-full min-w-32`}>
            Update
          </Button>
        </Link>
        <DeleteButton ticketId={ticket.id} />
        <Link href="/tickets">
          <Button className="text-white-500 w-full min-w-32">Back</Button>
        </Link>
      </div>
    </div>
  )
}

export default TicketDetail
