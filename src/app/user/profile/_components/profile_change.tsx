"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import db from "@/Repository/db";
import { addReligion, changeProfile, getUser } from "@/Repository/functionalities";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

export default function ProfilePictureForm() {
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();

  const status = searchParams.get("status");
  useEffect(() => {
    if (status) {
      setMessage(status);
    }
  }, [status]);
  const dialog = useRef<HTMLDialogElement>(null);

  const [errors, action] = useFormState(changeProfile, {});

  return (
    <div className="absolute mt-10 ml-10">
      <div className=" px-[40px] py-[20px]">
        <section className="flex justify-between">
          <Button
            className="text-sm w-[20px] h-[20px]"
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
          <Card className=" w-[500px] px-[50px] py-[40px] min-h-max flex flex-col gap-3">
            {message && message === "error" ? (
              <h1 className="text-destructive">
                An error has occured please check your data and try again
              </h1>
            ) : (
              ""
            )}
            {message && message === "done" ? (
              <h1 className="text-green-500">Picture added successfully</h1>
            ) : (
              ""
            )}
            <h1 className=" text-2xl">New Picture</h1>
            <Label className="text-xl">Email</Label>
            <Input
              required
              className="text-xl"
              type="email"
              placeholder="new email"
              name="email"
            ></Input>
            {errors?.email && (
              <div className="text-destructive">{errors.email}</div>
            )}
            <Label className="text-xl">Name</Label>
            <Input
              required
              className="text-xl"
              type="text"
              placeholder="new name"
              name="name"
            ></Input>
            {errors?.name && (
              <div className="text-destructive">{errors.name}</div>
            )}
            <Label className="text-xl">Image</Label>
            <Input
              className="text-xl"
              type="file"
              placeholder="Upload image of your religion"
              name="image"
            ></Input>
            {errors?.image && (
              <div className="text-destructive">{errors.image}</div>
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
