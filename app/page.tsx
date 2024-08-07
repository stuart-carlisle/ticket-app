import DashboardChart from "@/components/DashboardChart"
import DashboardRecentTickets from "@/components/DashboardRecentTickets"
import prisma from "@/prisma/db"

const Dashboard = async () => {
  const tickets = await prisma.ticket.findMany({
    where: {
      NOT: { status: "CLOSED" },
    },
    orderBy: {
      updatedAt: "desc",
    },
    skip: 0,
    take: 5,
    include: {
      assignedToUser: true,
    },
  })
  const groupTickets = await prisma.ticket.groupBy({
    by: ["status"],
    _count: {
      id: true,
    },
  })

  const data = groupTickets.map((item) => {
    return {
      name: item.status,
      total: item._count.id,
    }
  })

  return (
    <div className="w-full mt-5">
      <div className="grid gap-4 md:grid-cols-2 px-2">
        <div>
          <DashboardRecentTickets tickets={tickets} />
        </div>
        <div>
          <DashboardChart data={data} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
