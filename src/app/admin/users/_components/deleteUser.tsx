"use client"
import { Label } from "@/components/ui/label";
import { deleteUser } from "@/Repository/functionalities";


export default function DeleteUserLabel({ id }: { id: String }) {

    return (
        <Label className=" text-destructive" onClick={async () => { console.log("starting"); await deleteUser(id);  console.log("finished")}}>delete</Label>
    );
}