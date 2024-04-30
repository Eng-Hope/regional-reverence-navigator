"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { addUser } from "@/Repository/functionalities";
import { stat } from "fs";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

export default function UsersInteraction() {
  const [errors, action] = useFormState(addUser, {});
  const passwordLength: number = 6;
  const dialog = useRef<HTMLDialogElement>(null);
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();

  const status = searchParams.get("status");
  useEffect(() => {
    if (status) {
      setMessage(status);
    }
  }, [status]);

  return (
    <>
      <div className=" px-[40px] py-[20px]">
        <section className="flex justify-between">
          <h1 className=" text-2xl">Registerd Users</h1>
          <Button
            className="text-lg"
            onClick={() => {
              dialog.current?.showModal();
            }}
          >
            new
          </Button>
        </section>
          </div>
      <dialog ref={dialog}>
        <form action={action}>
          <Card className=" w-[500px] px-[50px] py-[40px] min-h-max flex flex-col gap-5">
            {message && message === "error" ? (
              <h1 className="text-destructive">
                An error has occured during registration please check your data
                and try again
              </h1>
            ) : (
              ""
            )}

            {message && message === "done" ? (
              <h1 className="text-green-500">User added successfully</h1>
            ) : (
              ""
            )}

            <h1 className=" text-2xl">New User</h1>
            <Label htmlFor="email">Email</Label>
            <Input required id="email" name="email"></Input>
            {errors?.email && (
              <div className="text-destructive">{errors.email}</div>
            )}
            <Label htmlFor="name">Name</Label>
            <Input required id="name" name="name"></Input>
            {errors?.name && (
              <div className="text-destructive">{errors.name}</div>
            )}
            <Label htmlFor="role">Role</Label>
            <RadioGroup required defaultValue="USER" name="role">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="USER" id="r1" />
                <Label htmlFor="r1">USER</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ADMIN" id="r2" />
                <Label htmlFor="r2">ADMIN</Label>
              </div>
            </RadioGroup>
            {errors?.role && (
              <div className="text-destructive">{errors.role}</div>
            )}
            <Label htmlFor="password">Enter Password</Label>
            <Input
              minLength={passwordLength}
              required
              id="password"
              name="password"
              type="password"
            ></Input>
            {errors?.password && (
              <div className="text-destructive">{errors.password}</div>
            )}
            <Label htmlFor="email">Confirm Password</Label>
            <Input
              required
              id="password"
              name="confirmPassword"
              type="password"
              minLength={passwordLength}
            ></Input>
            {errors?.email && (
              <div className="text-destructive">{errors.confirmPassword}</div>
            )}
            <div className="flex justify-between">
              <Button
                type="button"
                className=" w-1/4"
                onClick={() => {
                  dialog.current?.close();
                }}
              >
                close
              </Button>
              <SubmitButton />
            </div>
          </Card>
        </form>
      </dialog>
    </>
  );
}

export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="w-1/4" type="submit" disabled={pending}>
      {pending ? "savingi...." : "submit"}
    </Button>
  );
}

export function UserListSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[100%] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-10 w-scren" />
        <Skeleton className="h-10 w-[100%]" />
      </div>
      <Skeleton className="h-[125px] w-[100%] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-10 w-scren" />
        <Skeleton className="h-10 w-[100%]" />
      </div>
      <Skeleton className="h-[125px] w-[100%] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-10 w-scren" />
        <Skeleton className="h-10 w-[100%]" />
      </div>
      <Skeleton className="h-[125px] w-[100%] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-10 w-scren" />
        <Skeleton className="h-10 w-[100%]" />
      </div>
      <Skeleton className="h-[125px] w-[100%] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-10 w-scren" />
        <Skeleton className="h-10 w-[100%]" />
      </div>
      <Skeleton className="h-[125px] w-[100%] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-10 w-scren" />
        <Skeleton className="h-10 w-[100%]" />
      </div>
      <Skeleton className="h-[125px] w-[100%] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-10 w-scren" />
        <Skeleton className="h-10 w-[100%]" />
      </div>
      <Skeleton className="h-[125px] w-[100%] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-10 w-scren" />
        <Skeleton className="h-10 w-[100%]" />
      </div>
    </div>
  );
}
