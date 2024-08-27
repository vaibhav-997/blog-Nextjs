import { prisma } from "@/helper/prismaClient"
import { NextRequest } from "next/server"
import {v2 as cloudinary} from 'cloudinary'

cloudinary.config({ 
    cloud_name: 'dgidhfah9', 
    api_key: '853863647779199', 
    api_secret: '-IK5ZYGC6bgGN5Aj31buFvLqLVo' 
  });
//   cloudinary.config({ 
//     cloud_name: process.env.CLOUDINARY_NAME, 
//     api_key: process.env.CLOUDINARY_API_KEY, 
//     api_secret: process.env.CLOUDINARY_SECRET 
//   });
  
export async function DELETE (request: NextRequest) {
    try {
        
        const {searchParams } = new URL(request.nextUrl)
        const id = searchParams.get('id')
        
        
        if(!id){
            return Response.json({message:"Invalid id"})
        }
       
        const postById = await prisma.posts.findUnique({
            where:{id:Number(id)}
        })

        if(!postById){
            return Response.json({message:"Invalid post id"})
        }   
            let publicId;
            const parts = postById.image.split('/');
            const filename = parts[parts.length - 1];
            publicId = filename.split('.')[0]; // Remove the file extension
      
          
          // Delete the image using the public ID
          if (publicId) {
           
             let res = await cloudinary.uploader.destroy(publicId);
            
          } 
        
          

        let post = await prisma.posts.delete({
          where:{
            id:Number(id)
          }
        })
        return Response.json({message:"deleted posts successfully", post})

    } catch (error) {
        return Response.json({
            message:"error deleting blogs",
            error
        })
    }
}