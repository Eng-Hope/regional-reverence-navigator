import { Skeleton } from "@/components/ui/skeleton";
import ReligionFormAdd from "./_components/religion_add_form";
import db from "@/Repository/db";
import { Card } from "@/components/ui/card";

export default function Religion() {
    return (
        <main>
            <ReligionFormAdd />
            <ReligionSkeleton />
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
    const religions = await db.religion.findMany();

    return (
        <div>
            <Card>
                
            </Card>
        </div>
    )
}