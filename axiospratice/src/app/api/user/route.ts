import User from "@/model/user";
import { NextResponse } from "next/server";




 export async function POST(request: Request) {
    
console.log("API route called");
    const reqBody=await request.json();
    if(!reqBody){
        return new Response(JSON.stringify({
            message:"Invalid request"
        }),{status:400})
    }
    // const {name,email,password}=reqBody;
    // console.log(name,email,password);
    console.log(reqBody);
    const newuser=new User(reqBody);
    await newuser.save();
 
     return NextResponse.json({
         message:"User registered successfully"
     });
 }