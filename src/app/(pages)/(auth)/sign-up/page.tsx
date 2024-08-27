
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

const formSchema = z.object({
  username: z.string().min(3, {message:"Username must be at least 3 character"}).max(10, {message:"Username must be at maximum of 10 characters"}),
  email: z.string().email(),
  password: z.string().min(6, {message:"Password must be at least 6 characters"})
})


export default function ProfileForm() {

  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email:"",
      password:""
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true)
      let res = await axios.post('/api/auth/registration', values)
      console.log(res.data)
      toast({
        title:res?.data?.message,
        description:"Email sent successfully | Please verify your email"
      })
      router.push('/sign-in')
      setLoading(false)
    } catch (error) {
      console.log(error)
      toast({
        title:"Errro in user registration"
      })
      setLoading(false)
    }finally{
      setLoading(false)
    }
  }

  return (


    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
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
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  ) }
                />
                <FormField
                  control={ form.control }
                  name="email"
                  render={ ({ field }) => (
                    <FormItem>
                      <FormLabel>email</FormLabel>
                      <FormControl>
                        <Input placeholder="eg.Jhon@example.com" { ...field } />
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
                        <Input placeholder="*********" { ...field } />
                      </FormControl>
                     
                      <FormMessage />
                    </FormItem>
                  ) }
                />
                <Button className="w-full" type="submit">{loading ? "Loading..." : "Sign Up"}</Button>
              </form>
            </Form>
          
            <div className="flex flex-col item-center justify-center w-full">
      
        <div className="mt-4 text-center text-sm">
          Don't have an account ?{" "}
          <Button  onClick={() => router.push('/sign-in')} variant={"link"} className="underline">
            Sign in
          </Button>
        </div>
        </div>
           
      </CardContent>
    </Card>

  )

}