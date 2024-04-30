"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addUser, login } from "@/Repository/functionalities";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
export default function Login() {
  const [errors, action] = useFormState(login, {});
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  useEffect(() => {
    if (status) {
      setMessage(status);
    }
  },[status])
  
  return (
    <Card className=" w-[470px] px-[50px] py-[60px] min-h-max absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Link href="/" className="text-lg flex gap-2">
        <i className="bx bx-left-arrow-alt"></i> back home
      </Link>
      <h1 className=" text-2xl mb-5">Login</h1>
      <form action={action} className="flex flex-col gap-[35px]">
        <Label htmlFor="email" className="text-xl">
          Email
        </Label>
        <Input
          className="text-xl"
          required
          id="email"
          name="email"
          placeholder="Enter your email"
        ></Input>
        {errors?.email && (
          <div className="text-destructive">{errors.email}</div>
        )}
        <Label htmlFor="password" className="text-xl">
          Password
        </Label>
        <Input
          className="text-xl"
          required
          id="password"
          name="password"
          type="password"
          placeholder="................"
        ></Input>
        {errors?.password && (
          <div className="text-destructive">{errors.password}</div>
        )}
        <SubmitButton />
        <Link href="/signup" className="text-xl">
          you dont have an account yet ? login here
        </Link>
        {message && message === "error" ? (
          <div className="bg-destructive px-3 h-10 flex items-center justify-center ">
            Invalid credentials
          </div>
        ) : (
          ""
        )}
        {message && message === "done" ? (
          <div className="bg-green-700 px-3 py-3 h-13 flex items-center justify-center ">
            Account Created Successful login with your credentials
          </div>
        ) : (
          ""
        )}
      </form>
    </Card>
  );
}

export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="w-1/4 self-end" type="submit" disabled={pending}>
      {pending ? "loging...." : "login"}
    </Button>
  );
}
