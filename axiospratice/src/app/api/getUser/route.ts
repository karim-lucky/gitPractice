import User from "@/model/user";
import { NextResponse } from "next/server";




export async function GET(request: Request) {
   
  const users=await User.find({});
  console.log(users);
   return   NextResponse.json({
    users   ,
    MessageChannel:"Users fetched successfully"
  });
}
