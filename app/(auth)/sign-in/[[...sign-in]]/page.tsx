import { signInWithGoogle } from "@/lib/supabase/authServer";
import { redirect } from "next/navigation";

export default function SignIn() {
    async function handleGoogleSignIn() {
        "use server";
        const { data, error } = await signInWithGoogle();
       
        if (data?.url) {
            // Use Next.js redirect helper for server actions
            
            redirect(data.url);
        }
        // Optionally handle error
        return null;
    }

    return (
        <form className="h-[100vh] flex flex-col items-center justify-center">
            <button formAction={handleGoogleSignIn} type="submit" className="p-8 text-xl">
                Sign in with Google
            </button>
        </form>
    );
}