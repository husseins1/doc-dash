import {  getUser } from "@/lib/supabase/authServer";
import { getApiKeyAction } from "../actions/actions";
import FormApi from "@/components/my-components/FormApi";


export enum actionEnum {
    create= "create",
    update= "update"
};

export default async function Page() {
 const {data:{user}} = await getUser();
 
 let apiKey;
 let action: actionEnum =actionEnum.create;
 if(user){
  apiKey = await getApiKeyAction(user?.id);
    if(apiKey?.key){
        action = actionEnum.update;
    }
 } 
 
    return (
        <div className="min-h-[100vh] flex flex-col  justify-center gap-4 items-center">
            
            {apiKey?.key ? <h1 className="text-xl font-bold ">Update your API key</h1>: <h1 className="text-xl font-bold">Enter your API key</h1>}
            <FormApi id={user?.id} action={action} />
        </div>
    );
}