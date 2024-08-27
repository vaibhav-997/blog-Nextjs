import { prisma } from "@/helper/prismaClient"
import { NextRequest } from "next/server"

export async function GET (request: NextRequest) {
    try {

        const {searchParams } = new URL(request.nextUrl)
        const id = searchParams.get('id')
        
        if(!id){
            return Response.json({message:"Invalid id"})
        }
       

        let post = await prisma.posts.findUnique({
          where:{
            id:Number(id)
          },
          include:{
            User:true
          }
        })
        return Response.json({message:"fetched posts successfully", post})

    } catch (error) {
        Response.json({
            message:"error getting blogs",
            error
        })
    }
}