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

export default async function Profile() {
  const user = await getUser(JSON.parse(cookies().get("user")!.value).id);

  return (
    <main>
      <h1 className="ml-[240px] mt-[110px] text-3xl">User Profile</h1>
      <Card className="w-[1000px] absolute top-[400px] left-1/2 -translate-x-1/2 -translate-y-1/2">
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
