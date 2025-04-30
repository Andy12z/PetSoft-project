import { z } from "zod";
import { DEFAULT_PET_IMAGE } from "./constants";
export const petIdSchema =z.string().cuid();
export const petFormSchema =z.object({
  name:z.string().trim().min(1,{message:"Name is required"}).max(100),
  ownerName:z.string().trim().min(1,{message:"Owner name is  required"}).max(100),
  imageUrl:z.union([z.literal(""),z.string().trim().url({message:"Image URL is required"}),
  ]),
  age:z.coerce.number().int().positive().max(9999),
  notes:z.union([z.literal(""),z.string().trim().min(1,{message:"Notes are required"}).max(1000)]),
    })
    .transform((data)   => ({
      ...data,
    imageUrl:
    data.imageUrl  ||
      DEFAULT_PET_IMAGE,
  
}));                                               
export type TPetForm=z.infer<typeof petFormSchema>;
export const authSchema = z.object({
  email:z.string().email().max(100),
  password:z.string().max(100),
  subscription:z.union([z.literal("free"),z.literal("premium")]),
});
export type TAuth = z.infer<typeof authSchema>;




