import { prisma } from "@/helper/prismaClient"
import { NextRequest } from "next/server"



export async function POST(request: NextRequest) {
    try {
        const {searchParams} = new URL(request.nextUrl)
        const code = searchParams.get('code')

        

       let user =  await prisma.user.findFirst({
            where:{
                verifyCode:code as string
            }
        })

        if (!user){
            return Response.json({message:"User not found with the code",})
        }

       let verifiedUser =await prisma.user.update({
        where:{
            username:user.username
        },
        data:{
            isVerified:true,
            verifyCode:null
        },
        select:{
            username:true,
            email:true,
            isVerified:true
        }
       })
        
        return Response.json({message:"User verified successfully",verifiedUser})


    } catch (error) {
        return Response.json({message:"Error verifying email", error})
    }
}