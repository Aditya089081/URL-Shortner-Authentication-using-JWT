import z from "zod";
export const ShortLinkSchema = z.object({
    url:
    z.string()
    .url()
    .trim()
    .min(4,{message:"Please Provide Valid link."})
    .max(50,{message:"Please Provide Valid link."}),
    shorten:
    z.string()
    .trim()
    .max(10,{message:"Short Code can't be more than 10 character."}),
})
export const LoginUserSchema = z.object({
    email:
    z.string()
    .trim()
    .email({message:"Please enter a valid email Address."})
    .max(25,{message:"Please enter a valid email."}),
    password:
    z.string()
    .trim()
    .min(6,{message:"Password must be at least 6 character long."})
    .max(25,{message:"Password can't be more than 25 character"}),
})
export const registerUserSchema = LoginUserSchema.extend({
    name:
    z.string()
    .trim()
    .min(3,{message:"Name must be at least 3 character long."})
    .max(25,{message:"Name can't be more than 25 character"}),
        
})