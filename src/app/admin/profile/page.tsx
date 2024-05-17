"use server";

import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUser } from "@/Repository/functionalities";
import { cookies } from "next/headers";
import Image from "next/image";
import ProfilePictureForm from "./_components/profile_change";

export default async function Profile() {
  const user = await getUser(JSON.parse(cookies().get("user")!.value).id);

  return (
    <main className="flex items-center justify-center flex-col gap-3 mt-10">
      <div className="flex items-center gap-5 self-start ml-[220px] mt-[20px] relative">
        <Image
          className="rounded-[50%] w-[100px] h-[100px]"
          src={user!.profilePicture}
          width={100}
          height={100}
          alt="profile"
        ></Image>
        <h1 className="text-3xl">{user!.name}</h1>
        <ProfilePictureForm />
      </div>
      <Card className="w-[1000px]">
        <Table className="h-[350px] text-xl">
          <TableBody>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableCell>{user!.id}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableCell>{user!.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableCell>{user!.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Role</TableHead>
              <TableCell>{user!.role}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </main>
  );
}
