import db from "@/Repository/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cookies } from "next/headers";
import { Suspense } from "react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export type religion = {
    id: number;
    name: string;
    category: 'CHRISTIANITY'| 'ISLAMIC';
    subCategory: string | null;
    location: string;
    contact: string;
    imageUrl: string;
    createdAt: Date;
    userId: string;
}


export default function Religion({ religion }: {religion: religion}) {
  return (
    <Card key={religion.id} className="w-[90%]">
      <div className="flex justify-between pr-5">
        <CardHeader>
          <div className="flex flex-col gap-3">
            <CardTitle>{religion.name}</CardTitle>
            <CardDescription>
              {religion.category}{" "}
              {religion.subCategory && <Label> ({religion.subCategory})</Label>}
            </CardDescription>
          </div>
        </CardHeader>
        <Link href={`/user/religion/${religion.id}`} className="mt-8">
          <Button>
            <i className="bx bx-show"></i>
          </Button>
        </Link>
      </div>
      <CardContent>
        <Image
          src={religion.imageUrl}
          alt="image"
          width={900}
          height={90}
        ></Image>
      </CardContent>
      <CardFooter className="flex justify-between ">
        <Label>{religion.location}</Label>
        <Label>{religion.contact}</Label>
      </CardFooter>
    </Card>
  );
}
