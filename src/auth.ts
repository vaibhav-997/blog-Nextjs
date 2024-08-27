import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcryptjs from 'bcryptjs';
import {prisma} from "@/helper/prismaClient";

 
export const { handlers, auth } = NextAuth({
  providers: [
    Credentials({
     
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        const user = {
            username: credentials?.username,
            password: credentials?.password
          }
  
          if(!user.username || !user.password) return null
  
          const dbUser = await prisma.user.findUnique({
            where:{
              username: user.username
            }
          })
  
          if(!dbUser) return null
  
          const isCorrectPassword = await bcryptjs.compare(user.password, dbUser.password)
  
          if(!isCorrectPassword) return null
  
          return {
            id: dbUser.id.toString(),
            name: dbUser.username ,
          }  
      },
    }),
  ],
})