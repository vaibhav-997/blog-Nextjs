import {prisma} from "@/helper/prismaClient"
import { Type, sendVerificationEmail } from "@/helper/sendVerificationEmail"
import bcryptjs from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid';
export async function POST(request:Request) {
    try {
        let {username} = await request.json()

        if (!username  ) {
            return Response.json({message:"All fields must be provided"})
        }

        let existingUser = await prisma.user.findUnique({
            where:{
                username, 
            }
        })

        if(!existingUser){
            return Response.json({message:"User not exists | Please register user first",})
        }

        
        const verifyCode = uuidv4()
        await prisma.user.update({
            where:{
                username
            },
            data:{
                verifyCode
            }
        })
        await sendVerificationEmail({username, email:existingUser.email,verifyCode, type:Type.PasswordReset})

        return Response.json({message:"Reset Password email sent successfully"})
        
    


        


    
        
        return Response.json({message:"User created successfully",existingUser})




    } catch (error) {
        return Response.json({message:"Error registering user", error})
    }
}