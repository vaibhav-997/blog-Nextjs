'use client'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast';
import { Type } from '@/helper/sendVerificationEmail';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import SignInForm from '../../sign-in/page';

function VerifyEmail({params,}:{params:{id:string},}) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const verifyCode = params.id
    const searchParams  = useSearchParams()
    const type = searchParams.get('type')
    const {toast} = useToast()
    let handleVerifyEmail = async  () => {
        try {
            setLoading(true)
            let res = await axios.post(`/api/auth/verify?code=${verifyCode}`)
            toast({
                title:res.data.message
            })
            setLoading(false)
            router.push('/dashboard')
        } catch (error) {
            toast({
                title:"Error verifying email",
            })
            setLoading(false)
        }finally{
            setLoading(false)
        }
    }
    



  return (
    <div>
        {
            type === "email" ? 
            <div className='w-full '>
        <div className='w-full flex flex-col  gap-2 items-center justify-center   '>
            <h1 className='text-4xl text-orange-500 font-bold'>Verify your email</h1>
            <div className='flex items-center justify-center m-4'>
            <p><span>Click to verify email :  <Button onClick={handleVerifyEmail} > VerifyEmail</Button></span> </p>
           
            </div>
        </div>
    </div> :
    <SignInForm type='password' code={verifyCode} />
        }
    </div>
  )
}

export default VerifyEmail