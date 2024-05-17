"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { addUser } from "@/Repository/functionalities";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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
      <div className="blur-background">
        <form
          action={action}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <Card className=" w-[500px] px-[50px] py-[40px] min-h-max flex flex-col gap-5">
            <Link href="/" className="text-lg flex gap-2">
              <i className="bx bx-left-arrow-alt"></i> back home
            </Link>
            {message && message === "error" ? (
              <h1 className="text-destructive">
                An error has occured during registration please check your data
                and try again
              </h1>
            ) : (
              ""
            )}

            <h1 className=" text-2xl">Sign up here</h1>
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
            <RadioGroup required defaultValue="USER" name="role" hidden>
              <div className="flex items-center space-x-2" hidden={true}>
                <RadioGroupItem value="USER" id="r1" />
                <Label htmlFor="r1">USER</Label>
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
      </div>
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