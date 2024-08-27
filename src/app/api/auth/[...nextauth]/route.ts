import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from 'bcryptjs';

import { prisma } from "@/helper/prismaClient";



const options:AuthOptions = {
  
  providers: [
    CredentialsProvider({
      credentials:{
        username:{label:'username', type:"text", placeholder:"Enter your username"},
        password:{label:'password', type:"password", placeholder:"Enter your password"},
      },
      async authorize(credentials) {
        
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
        // console.log("Logged in successfully", dbUser)
        return {
          id:dbUser.id.toString(),
          name: dbUser.username ,
          email:dbUser.email,

        }  
      },
    })
  
  ],
  callbacks:{
    async jwt({user,token}) {
        if (user) {
          token.id = user.id
          token.email = user.email
          token.name = user.name
          token.picture = user.image
        }

        return {
          id:token.id,
          name:token.name,
          email:token.email,
          picture:token.picture
        }
    },

    async session({token,session}) {

      
      if(session.user){
        
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }
      // console.log("token *************************** \n",token)
      // console.log("session *************************** \n",session)
      return {
          user:{
            id:token.id,
            email:session.user?.email,
            name:session.user?.name,
            image:session.user?.image
          },
          expires:session.expires
        }
    },
  },
  
  session:{
    strategy:"jwt"
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(options);

export {handler as GET, handler as POST};
