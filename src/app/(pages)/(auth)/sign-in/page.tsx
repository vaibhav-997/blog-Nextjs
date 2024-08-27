
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
  password: z.string().min(6, {message:"Password must be at least 6 characters"})
})


export default function SignInForm({type, code}:{type:string, code:string}) {

  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()


  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    
      username:"",
      password:""
    },
  })

  // 2. Define a submit handler.
  async function  onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true)
      if(type === 'password'){
        let res = await axios.post(`/api/auth/change-password?code=${code}`, values)
        console.log(res.data)
        toast({
          title:"Password Changed Succcessfully"
        })
        router.push('/')
        setLoading(false)
      }else {
        let res = await signIn('credentials',{ ...values,redirect:false})
      console.log(res)



      if (res?.status === 200 && res?.error === null){
        toast({
          title:"Logged in successfully"
        })
        router.push('/')
      }else if (res?.ok === false && res.status === 401 ){
        toast({
          title:"Invalid credentials"
        })
      }
      setLoading(false)
      }



      
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
        <CardTitle className="text-xl">{type === 'password' ? "Change Password" :"Sign Up"}</CardTitle>
        <CardDescription>
          Enter your information to create an account
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
                <FormField
                  control={ form.control }
                  name="password"
                  render={ ({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="********" { ...field } />
                      </FormControl>
                     
                      <FormMessage />
                    </FormItem>
                  ) }
                />
                <Button className="w-full" type="submit">{loading ? "Loading..." : (type === 'password' ? "Change Password":"Login")}</Button>
              </form>
            </Form>
          
           <div>
            {
              type === 'password' ? null : <div className="flex flex-col item-center justify-center w-full">
      
              <div className="mt-4 text-center text-sm">
                
                <Button onClick={() => router.push('/forgot-password')} variant={"link"} className="underline">
                  Forgot Password
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account ?{" "}
                <Button onClick={() => router.push('/sign-up')} variant={"link"} className="underline">
                  Sign up
                </Button>
              </div>
              </div>
            }
           </div>
           
      </CardContent>
    </Card>

  )

}