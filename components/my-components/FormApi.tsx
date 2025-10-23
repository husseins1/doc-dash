'use client'

import { createApiKeyAction, updateApiKeyAction } from "@/app/actions/actions";
import { actionEnum } from "@/app/api-key/page";
import React, { useRef, useState, useTransition } from "react";
import { set } from "zod";

export default function FormApi({id,
    action
}:{
    id: string,
    action: actionEnum
}) {
    const formRef = useRef<HTMLFormElement | null>(null);
    const [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState<string | null>(null);
    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        const form = formRef.current;
        const data = new FormData(form);
        const key = data.get('key') as string;
        const password = data.get('password') as string;
        startTransition(async () => {
            let res;
            if(action === "create"){
               res = await createApiKeyAction({id, key});
                
            }else{
                res = await updateApiKeyAction(id,key, password);

            }
                if(res.status === 200){
                    setMessage("API key saved successfully.");
                    setTimeout(() => {
                        setMessage(null);
                    },3000)
                }else {
                    setMessage("Failed to save API key.");
                    setTimeout(() => {
                        setMessage(null);
                    },3000)
                }
            

        });
        form.reset();

        

        

    }
    return (
        <form ref = {formRef} onSubmit={handleSubmit}
            className="flex flex-col gap-4">

            <div className="flex flex-col gap-4">
                <label className="text-xl font-bold mr-4" htmlFor="key">API Key:</label>
                <input className="text-xl p-4 outline-2" type="text" id="key" name="key" />
                <label className="text-xl font-bold mr-4" htmlFor="password">Password:</label>

                <input className="text-xl p-4 outline-2" type="password" id="password" name="password" />
            </div>
            {isPending && <div>Loading...</div>}
            {message && <div>{message}</div>}
            <button className="block bg-blue-400 text-white py-4 px-6 text-lg mx-auto rounded-full cursor-pointer font-semibold" type="submit">Save Key</button>
        </form>
    );
}