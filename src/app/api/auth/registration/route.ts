import {prisma} from "@/helper/prismaClient"
import { Type, sendVerificationEmail } from "@/helper/sendVerificationEmail"
import bcryptjs from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid';
export async function POST(request:Request) {
    try {
        let {username, email, password} = await request.json()

        if (!username || !email || !password) {
            return Response.json({message:"All fields must be provided"})
        }

        let existingUser = await prisma.user.findUnique({
            where:{
                email: email, 
            }
        })

        if(existingUser){
            return Response.json({message:"User already exists",})
        }
        const salt = await bcryptjs.genSalt(10)
        let hashedPassword = await bcryptjs.hash(password, salt )
        
    
        const verifyCode = uuidv4()


        const user = await prisma.user.create({
            data:{
                username, email, password:hashedPassword, verifyCode:verifyCode
            },
            select:{
                username:true,
                email:true,
                verifyCode:true,
                isVerified:true
            }
        })

        console.log(user)


        const res = await sendVerificationEmail({username, email, verifyCode, type:Type.EmailVerification})
        console.log(res)
        return Response.json({message:"User created successfully",user})




    } catch (error) {
        return Response.json({message:"Error registering user", error})
    }
}