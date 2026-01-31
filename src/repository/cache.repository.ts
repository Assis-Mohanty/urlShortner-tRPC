import { serverConfig } from "../config";
import { redisClient } from "../config/db/redis";
import { string } from 'zod';

export class CacheRepository{
    async getNextId():Promise<number>{
        const key = `url:${serverConfig.REDIS_COUNTER}`
        if(!redisClient.isOpen){
            await redisClient.connect()
        }
        const result=await redisClient.incr(key)
        return result
    }
    async setUrlMapping(shortUrl:string,orginalUrl:string){
        const key=`url:${shortUrl}`
        if(!redisClient.isOpen){
            await redisClient.connect()
        }
        await redisClient.set(key,orginalUrl,{EX:86400})
    }
    async getUrlMapping(shortUrl:string):Promise<string |null >{
        const key=`url:${shortUrl}`
        if(!redisClient.isOpen){
            await redisClient.connect()
        }
        const result = await redisClient.get(key)
        return result
    }
    async deleteUrlMapping(shortUrl:string):Promise<number |null >{
        const key=`url:${shortUrl}`
        if(!redisClient.isOpen){
            await redisClient.connect()
        }
        const result = await redisClient.del(key)
        return result
    }
}