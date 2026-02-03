import { urlProcedure } from "../routers/trpc/url.trpc";
import z from 'zod';
import { UrlRepository } from "../repository/url.repository";
import { CacheRepository } from "../repository/cache.repository";
import { UrlService } from "../service/url.service";

export const UrlController = {
    create:urlProcedure
    .input(
        z.object({
            orginalUrl:z.string().url('Invalid url')
        })
    ).mutation(async ({input})=>{
        const urlService = new UrlService(new CacheRepository,new UrlRepository)
        urlService.createShortUrl(input.orginalUrl) 
    }),
    getLongUrl:urlProcedure
    .input(
        z.object({
            shortUrl:z.string().min(1,"short url is required")
        })
    )
    .query(async({input})=>{
        const urlservice = new UrlService(new CacheRepository,new UrlRepository)
        urlservice.getLongUrl(input.shortUrl)
    })
}
