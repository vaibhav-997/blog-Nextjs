import { prisma } from "@/helper/prismaClient"
import { getServerSession } from "next-auth"



export async function POST (request: Request){
    try {

        const  {title, description, image } = await request.json() 
        
        const session =await getServerSession()

        if(!title || !description || !image){
            return Response.json({message:"All fields must be provided"})
        }

        if(!session?.user){
            return Response.json({message:"Not Authorized"})
        }

        console.log(session)

        
            let user = await prisma.user.findUnique({
                where:{
                    username:session.user.name as string
                }
            })
        

            

        let post =  await prisma.posts.create({
            data:{
                title,description,image, userId:user?.id as number
            }
        })

        return Response.json({message:"Post successfully created", post})


    } catch (error) {
        return Response.json({message:"Error creating Blog Posts", error})
    }
}