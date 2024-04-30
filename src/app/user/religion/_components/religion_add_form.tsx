"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { addReligion } from "@/Repository/functionalities";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

export default function ReligionFormAdd() {
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();

  const status = searchParams.get("status");
  useEffect(() => {
    if (status) {
      setMessage(status);
    }
  }, [status]);
  const dialog = useRef<HTMLDialogElement>(null);

  const [errors, action] = useFormState(addReligion, {});

  return (
    <>
      <div className=" px-[40px] py-[20px]">
        <section className="flex justify-between">
          <h1 className=" text-2xl">Registerd Religions</h1>
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
          <Card className=" w-[500px] px-[50px] py-[40px] min-h-max flex flex-col gap-3">
            {message && message === "error" ? (
              <h1 className="text-destructive">
                An error has occured please check your data and try again
              </h1>
            ) : (
              ""
            )}

            {message && message === "done" ? (
              <h1 className="text-green-500">Religion added successfully</h1>
            ) : (
              ""
            )}

            <h1 className=" text-2xl">New Religion</h1>
            <Label htmlFor="name" className="text-xl">
              Name
            </Label>
            <Input
              className="text-xl"
              required
              id="name"
              name="name"
              placeholder="Name of this religion"
            ></Input>
            {errors?.name && (
              <div className="text-destructive">{errors.name}</div>
            )}
            <Label htmlFor="role" className="text-xl">
              Category
            </Label>
            <RadioGroup required name="category" className="text-xl">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="CHRISTIANITY" id="r1" />
                <Label htmlFor="r1">CHRISTIANITY</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ISLAMIC" id="r2" />
                <Label htmlFor="r2">ISLAMIC</Label>
              </div>
            </RadioGroup>
            {errors?.category && (
              <div className="text-destructive">{errors.category}</div>
            )}
            <Label htmlFor="subCategory" className="text-xl">
              Sub Category
            </Label>
            <Input
              id="subCategory"
              name="subCategory"
              className="text-xl"
              placeholder="This field is optional"
            ></Input>
            {errors?.subCategory && (
              <div className="text-destructive">{errors.subCategory}</div>
            )}

            <Label htmlFor="location" className="text-xl">
              Location
            </Label>
            <Input
              className="text-xl"
              required
              id="location"
              name="location"
              placeholder="location for this religion"
            ></Input>
            {errors?.location && (
              <div className="text-destructive">{errors.location}</div>
            )}

            <Label htmlFor="contacts" className="text-xl">
              Contacts
            </Label>
            <Textarea
              required
              id="contacts"
              placeholder="Enter contacts"
              name="contacts"
              className="text-xl"
            ></Textarea>
            {errors?.contacts && (
              <div className="text-destructive">{errors.contacts}</div>
            )}

            <Label className="text-xl">Image</Label>
            <Input
              required
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
