'use client'
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import {v2 as cloudinary} from 'cloudinary';
import { CldUploadButton, CloudinaryUploadWidgetInfo, CloudinaryUploadWidgetResults } from 'next-cloudinary';

export interface Inputs {
  image: FileList;
}

export default function Home() {



  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    
    // const formData = new FormData();
    // formData.append("file", data.image[0]);
    // formData.append('upload_preset', "inft6m7o")

    // let res = await axios.post('https://api.cloudinary.com/v1_1/dgidhfah9/upload',formData)
    // console.log("secure_url : " ,res.data.secure_url)


  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form onSubmit={handleSubmit(onSubmit)}>
      
 
 <CldUploadButton  onSuccess={(result : any ) => console.log(result?.info?.secure_url)} uploadPreset="inft6m7o" />
        
        <button type="submit">Save</button>
      </form>
    </main>
  );
}
