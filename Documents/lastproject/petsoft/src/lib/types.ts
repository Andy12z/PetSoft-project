import { Pet } from "@prisma/client";
export type PetEssentials = Omit<Pet,"id" | "createdAt" | "updatedAt" | "userId">;
export type AuthFormState = {
  message: string | undefined;
};
