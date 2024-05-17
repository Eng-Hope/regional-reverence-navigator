"use server";

import Event from "@/app/user/religion/_components/event";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import db from "@/Repository/db";
import { getUser } from "@/Repository/functionalities";
import { cookies } from "next/headers";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function ReligionDescription({
  params,
}: {
  params: { id: String };
}) {
  const id = Number(params.id);
  const religion = await db.religion.findUnique({
    where: {
      id: id,
    },
  });

  console.log(religion);

  if (!religion) {
    return notFound();
  }

    const events = await db.event.findMany({
        where: {
            religion: {
                id:religion.id
            }
        }
    });
  return (
    <main className="mt-10 mx-[100px] flex flex-col gap-8 mb-[50px]">
      <Card>
        <CardHeader>
          <CardTitle>Religion Service ({religion.name})</CardTitle>
          <CardDescription>
            {religion.category}{" "}
            {religion.subCategory && `(${religion.subCategory})`}
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>About</CardTitle>
          <CardContent className="flex flex-col gap-3">
            <div>
              <Label>Location: </Label> {religion.location}
            </div>

            <div>
              <Label>Contact: </Label> {religion.contact}
            </div>
            <Image
              className="w-screen"
              src={religion.imageUrl}
              width={100}
              height={100}
              alt="image"
            ></Image>
          </CardContent>
        </CardHeader>
      </Card>

      <div className="flex flex-col gap-10 px-[100px] py-[50px]">
        <div className="flex justify-between">
          <CardHeader>
            <CardTitle>Events</CardTitle>
          </CardHeader>
        </div>
        {events.map((event) => (
         <Event event={event} />
        ))}
      </div>
    </main>
  );
}
