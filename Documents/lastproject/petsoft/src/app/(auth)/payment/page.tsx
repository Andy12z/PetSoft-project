"use client";
import H1 from "@/components/h1";
import { createCheckoutSession } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
export default function Page({searchParams}: {searchParams:{ [key: string]: string | string[] | undefined }}
) {
  const [isPending,startTransition] = useTransition();
  const {data:session,update,status} = useSession(); 
  const router = useRouter();
  return (  
    <main className="flex flex-col justify-center items-center space-y-10">
      <H1>PetSoft access requires payment.</H1>
      {searchParams.success && ( 
            <Button
            onClick={async ()=>{
              await update(true);
              router.push("/app/dashboard");
            }}
            disabled = {status === "loading" || session?.user.hasAccess}
            >
              Access PetSoft
              </Button>
      )}
      {!searchParams.success && (

         <Button
      onClick={async() => 
        {
          startTransition(async() => {
          await createCheckoutSession();
          });
        }}
      >
      Buy lifetime access for $299
      </Button>
  
      )}
{searchParams.success && (
  <p className="text-sm text-green-700">
    Payment successful! You now have lifetime access to petsoft.</p>
)}
{
  searchParams.cancelled && (
  <p className="text-sm text-red-700">
    Payment cancelled. You can try again.</p>
  )
}   
    </main>
  );
}

function useSession():{ 
  update: any; 
} 
{
  throw new Error("Function not implemented.");
}





  