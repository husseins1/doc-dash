'use server'


import z from "zod"
import { prisma } from "../db/db";
import { revalidatePath } from "next/cache";

const ApiKeySchema = z.object({
    id: z.string(),
    key: z.string(),

})
type ApiKey = z.infer<typeof ApiKeySchema>
export async function createApiKeyAction({id, key}: ApiKey){
    
    const validApiKey = ApiKeySchema.safeParse({id, key});

    if(!validApiKey.success){
        return {
            error: "Invalid API key",
            status: 400
        }
    }

    try {
        await prisma.apiKey.create({
            data: {
                id,
                key
            }
        })
        revalidatePath("/api-key");
        return {
            status: 200
        }
    } catch (error) {
        return {
            error,
            status: 500
        }
    }

}

export async function getApiKeyAction(id: string){
    
    try {
        const apiKey = await prisma.apiKey.findUnique({
            where: {
                id
            }
        })
        return apiKey
    } catch (error) {
        return {
            error,
            status: 500
        }
    }
}
export async function getBookingsAction(apiKey: string){
    const url = "https://api.cal.com/v2/bookings";
    const options = {
  method: 'GET',
  headers: {
    Authorization: apiKey,
    'cal-api-version': '2024-08-13'
  },
  body: undefined
};
try {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
} catch (error) {
  throw error;
}
}

export async function updateApiKeyAction(id: string, key: string, password: string){
    
    try {
        if(password !== process.env.API_CHANGE_PASSWORD){
            throw new Error("Invalid password");
        }

        const apiKey = await prisma.apiKey.update({
            where: {
                id
            },
            data: {
                key
            }
        })
        revalidatePath("/api-key");
        return {
            status: 200
        }
    } catch (error) {
        
        return {
            error,
            status: 500
        }
    }
}