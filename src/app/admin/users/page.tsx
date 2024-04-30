"use server";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import db from "@/Repository/db";
import UsersInteraction, { UserListSkeleton } from "./_components/UserInteraction";
import { Suspense } from "react";
import { MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSubContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { deleteUser } from "@/Repository/functionalities";
import DeleteUserLabel from "./_components/deleteUser";


export default async function Users() {
  return (
    <main className="mx-10">
      <UsersInteraction />
      <Suspense fallback={
        <UserListSkeleton />
      }>
        <UserList />
      </Suspense>
    </main>
  );
}


async function UserList() {
  const users = await db.user.findMany();
  return (
    
    <Table className="text-md">
      <TableCaption>A list of users</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Id</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.id}</TableCell>
            <TableCell className="font-medium">{user.email}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical></MoreVertical>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Label>edit</Label>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <DeleteUserLabel id={user.id} ></DeleteUserLabel>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
