"use server"
import db from "@/Repository/db";
import Religion from "../user/religion/_components/religion";
import { religion } from "./user_religion_list";

export default async function SearchReligion({name}:{name: String}) {
  const religions = await db.religion.findMany({
    where: {
      OR: [
        {
          name: {
            contains: `${name}`,
          },
        },
      ],
    },
  });
    return (
      <section className="grid grid-cols-2 gap-[100px] p-[50px] mt-[80px]">
        {religions &&
          religions.map(({ religion }: { religion: religion }) => (
            <Religion key={religion.id} religion={religion}></Religion>
          ))}
      </section>
    );
}