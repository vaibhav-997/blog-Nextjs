'use client'
import React, { useRef } from 'react';
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
import { Label } from "@radix-ui/react-dropdown-menu"
import { ChangeEvent, useState } from "react"
import axios from "axios"

import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { Editor as TinyMCEEditor } from '@tinymce/tinymce-react';

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string(),

})

export default function AddBlog() {

  const [image, setImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [editorData, setEditorData] = useState('')
  const { toast } = useToast()
  const router = useRouter()

  const editorRef = useRef<any>(null);

  

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: ""
    },
  })

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    if (e.target.files) {
      const file = e.target.files[0]
      setImage(file)
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (image) {
      try {
        setLoading(true)
        let formData = new FormData()
        formData.append('file', image)
        formData.append('upload_preset', 'inft6m7o')
        
        let res = await axios.post('https://api.cloudinary.com/v1_1/dgidhfah9/upload', formData)
        let postData = {
          title: values.title,
          description: '' ,
          image: res.data.secure_url
        }
        if (editorRef.current) {
         
         postData.description = editorRef.current.getContent()
        }
        console.log(postData)
        let postRes = await axios.post('/api/blog/add-blog', postData)
        
        toast({
          title: postRes.data.message
        })
        setLoading(false)
        router.push('/')
      } catch (error) {
        console.log(error)
        toast({
          title: "Error submitting post"
        })
        setLoading(false)

      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className="flex flex-col ">

      <div className="w-full text-center font-bold text-4xl">
        <h1 className="text-orange-600">Add Blog</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="eg.title" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <TinyMCEEditor
            apiKey='g359glor3aplwritauqirq4lis480hem9cf8fk0zsun7pz6u'
            onInit={(evt, editor) => editorRef.current = editor}
            initialValue="<p>This is the initial content of the editor.</p>"
            init={{
              height: 500,
              menubar: false,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
          />
        
          <div>
            <Label>Image</Label>
            <Input type="file" onChange={(e: ChangeEvent<HTMLInputElement>) => handleFileChange(e)} name="image" />
          </div>

          <Button type="submit">{loading ? "Submitting..." : "Submit"}</Button>
        </form>
      </Form>
    </div>
  )
}
