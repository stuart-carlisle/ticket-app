import prisma from "@/prisma/db"
import { userSchema } from "@/ValidationSchema/Users"
import bcrypt from "bcryptjs"
import { NextRequest, NextResponse } from "next/server"
import options from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

interface Props {
    params: {id:string}
}

export async function PATCH(request:NextRequest, {params}: Props){
    const session = await getServerSession(options)

    if(!session){
        return NextResponse.json({error: "Not authenticated"},{status: 401})
    }
    if(session.user.role !== "ADMIN"){
        return NextResponse.json({error: "Not Admin."},{status: 401})
    }

    const body = await request.json()
    const validation = userSchema.safeParse(body)

    if(!validation.success){
        return NextResponse.json(validation.error.format(), { status: 400 })
    }

    const user = await prisma.user.findUnique({
        where: {id:parseInt(params.id)}
    })

    if(!user){
        return NextResponse.json({error: "User Not Found."}, { status: 400 })
    }

    if(body?.password && body.password != ""){
        const hashPassword = await bcrypt.hash(body.password, 10)
        body.password = hashPassword
    }else{
        delete body.password
    }

    if(user.username !== body.username){
        const duplicateUsername = await prisma.user.findUnique({
            where: {
                username: body.username
            }
        })
        if(duplicateUsername){
            return NextResponse.json(
                { message: "Duplicate Username"},
                { status: 409 }
            )
        }
    }

    const updateUser = await prisma.user.update({
        where:{id:user.id},
        data: {
            ...body
        }
    })

    return NextResponse.json(updateUser)
}