'use client'

import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import axios from 'axios';
import { Posts } from '@/app/page';
import { useRouter } from 'next/navigation';
import { SearchContext } from '@/components/SearchContext';
  

function Explore() {
    
    const [posts, setPosts]= useState<Posts[]>([])
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    

    const {searchText} = React.useContext(SearchContext)

    useEffect(()=>{
        ;(
            async ( )=> {
              setLoading(true)
              if(searchText ){
                console.log(searchText)
                let res = await axios.get(`/api/blog/get-all-blogs?search=${searchText}`)
                setPosts(res.data.posts)
                console.log(res.data)
                setLoading(false)

              }else{
                let res = await axios.get('/api/blog/get-all-blogs')
                setPosts(res.data.posts)
                console.log(res.data)
                setLoading(false)
              }
              setLoading(false)
            }
        )();
        },[searchText,])


  return (
<div>
  {
    loading ? <h1>Loading...</h1>:
    <div className='w-full h-full flex  flex-col  items-center my-4 '>
    <div className='text-4xl mb-6 font-bold text-orange-500 text-center'>
        <h1>Explore</h1>
    </div>
    <div className='w-full gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
    {
        posts.map((post) => (
            <Card key={post.id}>
  <CardHeader>
    <CardTitle>{post.title}</CardTitle>
    <CardDescription className='truncate overflow-hidden '>{post.description}</CardDescription>
  </CardHeader>
  <CardContent>
    <img src={post.image} alt={post.title} />
  </CardContent>
  <CardFooter>
    <Button onClick={() => router.push(`/explore/${post.id}`)} className='w-full bottom-0'>Explore</Button>
  </CardFooter>
</Card>
        ))
    }


    </div>
</div>
  }
</div>

  )
}

export default Explore