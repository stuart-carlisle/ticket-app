import { NextRequest, NextResponse } from "next/server";
import { ticketPatchSchema } from "@/ValidationSchema/Ticket";
import prisma from "@/prisma/db";
import options from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

interface Props {
    params: { id: string }
}

export async function PATCH(request: NextRequest, { params }: Props){
    const session = await getServerSession(options)

    if(!session){
        console.log('authenticated')
        return NextResponse.json({error: "Not authenticated"},{status: 401})
    }
    if(session.user.role !== "ADMIN" && session.user.role !== "TECH"){
        console.log('Role')
        return NextResponse.json({error: "No Permissions to Update Ticket."},{status: 401})
    }
    console.log('through')
    const body = await request.json()
    const validation = ticketPatchSchema.safeParse(body)
    if(!validation.success){
        return NextResponse.json(validation.error.format(), {status: 400})
    }
    const ticket = await prisma.ticket.findUnique({where: {id: parseInt(params.id) }})
    if(!ticket){
    return NextResponse.json({error: "Ticket not Found"}, {status: 404})
    }
    if(body?.assignedToUserId){
        body.assignedToUserId = parseInt(body.assignedToUserId)
    }
    const updateTicket = await prisma.ticket.update({
        where: {id: ticket.id},
        data:{
            ...body,
        }
    })

    return NextResponse.json(updateTicket)
}

export async function DELETE(request: NextRequest, { params }: Props){
    const session = await getServerSession(options)
    if(!session){
        return NextResponse.json({error: "Not authenticated"},{status: 401})
    }
    if(session.user.role !== "ADMIN"){
        return NextResponse.json({error: "Not Admin."},{status: 401})
    }

    const ticket = await prisma.ticket.findUnique({
        where: {id: parseInt(params.id) }
    })
    if(!ticket){
    return NextResponse.json({error: "Ticket not Found"}, {status: 404})
    }

    await prisma.ticket.delete({
        where: {id: ticket.id}
    })

    return NextResponse.json("Ticket Deleted")
}