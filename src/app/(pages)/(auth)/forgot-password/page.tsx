
"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { useRouter } from "next/navigation"
import axios from "axios"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { signIn } from "next-auth/react"

const formSchema = z.object({
  
  username: z.string().min(3, {message:"Username must be at least 3 character"}).max(10, {message:"Username must be at maximum of 10 characters"}),
 
})


export default function ForgotPassword() {

  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()


  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    
      username:"",
     
    },
  })

  // 2. Define a submit handler.
  async function  onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true)
      let res = await axios.post('/api/auth/forgot-password',values)
      console.log(res)

      toast({
        title:res.data.message
      })


      



      
      setLoading(false)
    } catch (error) {
      
       console.log(error)
      
      setLoading(false)
    }finally{
      setLoading(false)
    }
  }

  return (


    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Forgot Password Email</CardTitle>
        <CardDescription>
          Enter your information to update your password
        </CardDescription>
      </CardHeader>
      <CardContent>
        
            <Form { ...form }>
              <form onSubmit={ form.handleSubmit(onSubmit) } className="space-y-4">

                <FormField
                  control={ form.control }
                  name="username"
                  render={ ({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="eg.Jhon" { ...field } />
                      </FormControl>
                      
                      <FormMessage />
                    </FormItem>
                  ) }
                />
                
                <Button className="w-full" type="submit">{loading ? "Sending Email..." : "Get Email"}</Button>
              </form>
            </Form>
          
            <div className="flex flex-col item-center justify-center w-full">
      
        
        
        </div>
           
      </CardContent>
    </Card>

  )

}