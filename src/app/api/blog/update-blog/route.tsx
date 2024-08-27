import { prisma } from "@/helper/prismaClient"
import { getServerSession } from "next-auth"
import { NextRequest } from "next/server"
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'dgidhfah9', 
  api_key: '853863647779199', 
  api_secret: '-IK5ZYGC6bgGN5Aj31buFvLqLVo' 
});
// cloudinary.config({ 
//     cloud_name: process.env.CLOUDINARY_NAME, 
//     api_key: process.env.CLOUDINARY_API_KEY, 
//     api_secret: process.env.CLOUDINARY_SECRET 
//   });
  

export async function PATCH (request: NextRequest){
    try {
        const {searchParams} = new URL(request.nextUrl)
        const id = searchParams.get('id')
        const  {title, description, image } = await request.json() 
        
        const session =await getServerSession()
        console.log( image)
        if(!title || !description ){
            return Response.json({message:"All fields must be provided"})
        }

        if(!session?.user){
            return Response.json({message:"Not Authorized"})
        }

        let user = await prisma.user.findUnique({
            where:{
                username: session.user.name as string
            }
        })

        let searchPost = await prisma.posts.findUnique({
            where:{
                id:Number(id)
            }
        })
        

        let post =  await prisma.posts.update({
            where:{
                id:Number(id)
            },
            data:{
                title,description,image, userId:user?.id as number
            }
        })
        let publicId = '';

        // Extract the public ID from the image URL
        if (searchPost?.image) {
          const parts = searchPost.image.split('/');
          const filename = parts[parts.length - 1];
          publicId = filename.split('.')[0]; // Remove the file extension
        }
        
        // Delete the image using the public ID
        if (publicId) {
           await cloudinary.uploader.destroy(publicId);
          
        } 

        return Response.json({message:"Post successfully updated", post})


    } catch (error) {
        return Response.json({message:"Error updating Blog Posts", error})
    }
}