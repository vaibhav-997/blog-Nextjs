import { NextRequest } from "next/server";


export async function POST(request:NextRequest) {
    const reqBody:FormData = await request.formData()
    let image = reqBody.get('image')
    
    
    
}