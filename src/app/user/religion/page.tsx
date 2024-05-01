import { Skeleton } from "@/components/ui/skeleton";
import ReligionFormAdd from "./_components/religion_add_form";
import db from "@/Repository/db";
import { cookies } from "next/headers";
import { Suspense } from "react";
import Religion from "./_components/religion";

export default function ReligionagPage() {
    return (
        <main>
            <ReligionFormAdd />
            <Suspense fallback={<ReligionSkeleton />}>
                <ReligionList />
           </Suspense>
        </main>
    )
}

export async function ReligionSkeleton(){
   return (
     <div className="flex flex-col gap-10 px-10">
       <div className="flex gap-10 px-3 content-between w-screen">
         <Skeleton className="h-[325px] w-[47%] rounded-xl" />
         <Skeleton className="h-[325px] w-[47%] rounded-xl" />
       </div>
       <div className="flex gap-10 px-3 content-between w-screen">
         <Skeleton className="h-[325px] w-[47%] rounded-xl" />
         <Skeleton className="h-[325px] w-[47%] rounded-xl" />
       </div>
     </div>
   );
}

export async function ReligionList() {
    const id = JSON.parse(cookies().get("user")!.value).id;
    const religions = await db.religion.findMany({
        where: {
            user: {
                id: id,
            }
        }
    });
    return (
      <div className="grid grid-cols-2 gap-10 m-[50px]">
        {religions.map((religion) => (
         <Religion religion={religion} />
        ))}
      </div>
    );
}