import z from Zod;
 export const shortnerSchema = z.object({
    url:
    z.string({required_error:"URL is required"})
    .trim()
    .url({message:"Please provide valid URL"})
    .max(25,{message:"Please provide valid URL"}),
    shorten:
    z.string()
    .trim()
    .min(1,{message:"change the short code"})
    .max(10,{message:"Short Code can't be more than 10 character."}),
 })