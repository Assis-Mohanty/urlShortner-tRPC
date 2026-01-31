import { IUrl, Url } from "../models/url.models"

export interface CreateURl{
    orginalUrl:string
    shortUrl:string
}

export interface UrlStats{
    id:string,
    orginalUrl:string,
    shortUrl:string,
    clicks:number,
    createdAt:Date,
    updatedAt:Date
}

export class UrlRepository{
    async create(data:CreateURl):Promise<IUrl>{
        const url=Url.create(data);
        return url
    }

    async findByShortUrl(shortUrl:string):Promise<IUrl|null>{
        return await Url.findOne({shortUrl});
    }
    async findAll(){
        const urls= await Url.find().select({
            _id:1,
            orginalUrl:1,
            shortUrl:1,
            clicks:1,
            createdAt:1,
            updatedAt:1
        }).sort({createdAt:-1})
        return urls.map(url=>({
            id:url._id?.toString()|| "",
            orginalUrl:url.orginalUrl,
            shortUrl:url.shortUrl,
            clicks:url.clicks,
            createdAt:url.createdAt,
            updatedAt:url.updatedAt
        }))
    }
    async incrementClick(shortUrl:string):Promise<void>{
        await Url.findOneAndUpdate({shortUrl},{$inc:{clicks:1}},{new:true})
        return 
    }

    async findStatsByShortUrl(shortUrl:string):Promise<UrlStats | null>{
        const url = await Url.findOne({shortUrl}).select({
           _id:1,
            orginalUrl:1,
            shortUrl:1,
            clicks:1,
            createdAt:1,
            updatedAt:1
        })
        if (!url) {
            return null;
        }
        return{
            id:url._id?.toString()|| "",
            orginalUrl:url.orginalUrl,
            shortUrl:url.shortUrl,
            clicks:url.clicks,
            createdAt:url.createdAt,
            updatedAt:url.updatedAt
        }

    }
}