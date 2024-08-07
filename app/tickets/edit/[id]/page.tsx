import options from "@/app/api/auth/[...nextauth]/options"
import prisma from "@/prisma/db"
import { getServerSession } from "next-auth"
import dynamic from "next/dynamic"

const TicketForm = dynamic(() => import("@/components/TicketForm"), {
  ssr: false,
})

interface Props {
  params: { id: string }
}

const EditTicket = async ({ params }: Props) => {
  const session = await getServerSession(options)
  if (session?.user.role !== "ADMIN" && session?.user.role !== "TECH") {
    return <p className="text-destructive">Admin or Tech Access Required</p>
  }
  const ticket = await prisma?.ticket.findUnique({
    where: {
      id: parseInt(params.id),
    },
  })

  if (!ticket) {
    return <p className="text-destructive ">No Ticket Found</p>
  }

  return (
    <>
      <TicketForm ticket={ticket} />
    </>
  )
}

export default EditTicket
