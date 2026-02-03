import { serverConfig } from "../config";
import { CacheRepository } from "../repository/cache.repository";
import { UrlRepository } from "../repository/url.repository";

export class UrlService{
    constructor(
        private readonly cacheRepository:CacheRepository,
        private readonly urlRepository:UrlRepository
    ){}

    async createShortUrl(orginalUrl:string){
        const id = await this.cacheRepository.getNextId();
        const shortUrl = toBase62(id)
        const url= await this.urlRepository.create({
            orginalUrl:orginalUrl,
            shortUrl:shortUrl
        })
        await this.cacheRepository.setUrlMapping(shortUrl,orginalUrl)
        const baseUrl = serverConfig.BASE_URL
        const fullUrl=`${baseUrl}/${shortUrl}`
        return {
            id:url._id.toString(),
            shortUrl,
            orginalUrl,
            fullUrl,
            createdAt:url.createdAt,
            updatedAt:url.updatedAt
        }
    }
    async getLongUrl(shortUrl:string){
        const longUrl= await this.cacheRepository.getUrlMapping(shortUrl)
        if(longUrl){
            return longUrl
        }
        const longUrlFromRepository = await this.urlRepository.findByShortUrl(shortUrl)
        return longUrlFromRepository
    }
}