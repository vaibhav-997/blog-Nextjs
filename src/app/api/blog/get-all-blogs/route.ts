import { prisma } from "@/helper/prismaClient"
import { NextRequest } from "next/server"
import { title } from "process"

export async function GET (request: NextRequest) {
    try {

        const {searchParams } = new URL(request.nextUrl)
        const search = searchParams.get('search')
       

        if(search ) {
            let posts = await prisma.posts.findMany({
                where: {
                  OR: [
                    { title: { contains:search, mode:'insensitive'} },
                    { description: {  contains:search, mode:"insensitive" } }
                  ]
                }
              });
            return Response.json({message:"fetched posts successfully", posts})
        }

        let posts = await prisma.posts.findMany({
           
        })
        return Response.json({message:"fetched posts successfully", posts})

    } catch (error) {
        Response.json({
            message:"error getting blogs",
            error
        })
    }
}