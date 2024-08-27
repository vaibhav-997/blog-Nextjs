'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Posts } from '@/app/page';


export interface Post extends Posts {
  User:{
    username:string
  }
}

function PostById({params}:{params:{id:string}}) {

  const id = params.id 
  const [post, setPost] = useState<Post>()
  useEffect(() => {;(
    async () => {
      try {
        let res =   await axios.get(`/api/blog/get-post-by-id?id=${id}`)
        // console.log(res.data)
        setPost(res.data.post)
      } catch (error) {
        console.log(error)
      }
    }
  )();},[id])
  
   return (
    <div className='w-full flex items-center justify-center'>
      <div className='w-full flex items-center justify-center flex-col space-y-8'>
        <div className='text-2xl text-orange-500 font-bold'>
             <h1>{post?.title}</h1>
            <p className='text-lg'>author: {post?.User.username}</p>
        </div>
        <div>
          <img src={post?.image} alt={post?.title} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: post?.description as string }} />;
      <div>
        
      </div>
      </div>
    </div>
  )
}

export default PostById