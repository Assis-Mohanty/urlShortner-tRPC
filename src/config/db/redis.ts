import { createClient } from "redis";
import { serverConfig } from "..";

export const redisClient=createClient({
    url:serverConfig.REDIS_URL
})

redisClient.on('error',(err)=>{
    console.log("Redis Error ",err)
})

redisClient.on('connect',()=>{
    console.log("Redis client connected ")
})

export async function initRedis(){
    try {
        await redisClient.connect()
        console.log("Redis connected")
    } catch (error) {
        throw error 
    }
}

export async function stopRedis() {
    await redisClient.quit();
}