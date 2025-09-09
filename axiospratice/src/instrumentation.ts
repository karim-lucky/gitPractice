import { connectDb } from "@/lib/connectDb";



export function register(){
    console.log("Instrumentation registered");
    connectDb();
    console.log("DB connected from instrumentation");
}