let base62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
export function toBase62(id:number){
    if(id==0){
        return "0";
    }
    let num=id;
    let result =""
    while(num>0){
        const rem=num%62
        result = base62[rem] + result 
        num=Math.floor(num/62)
    }
    return result
}