import { prisma } from "@/helper/prismaClient"
import { getServerSession } from "next-auth"

export async function GET(request: Request){
    try {
        const session = await getServerSession()


        let postsByUser = await prisma.posts.findMany({
            where:{
                User:{
                    username:session?.user?.name as string
                },
            
            },
            include:{
                likes:true
            }
        })

        return Response.json({
            message:"Blogs fetched successfully",
            postsByUser
        })



    } catch (error)    {
        return Response.json({message:"Error getting blogs", error})
    }
}