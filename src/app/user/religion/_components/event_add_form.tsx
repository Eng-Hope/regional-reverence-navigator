"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addEventFuc } from "@/Repository/functionalities";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

export default function AddEvent({ religionId }:{religionId: String}) {
    const dialog = useRef<HTMLDialogElement>(null);
    const [errors, action] = useFormState(addEventFuc, {});
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
      <Button
        className="mt-5 mr-10"
        onClick={() => {
          dialog.current?.showModal();
        }}
      >
        new
      </Button>
      <dialog ref={dialog}>
        <form action={action}>
          <Card className=" w-[600px] px-[50px] py-[40px] min-h-max flex flex-col gap-4">
            {message && message === "error" ? (
              <h1 className="text-destructive">
                An error has occured please check your data and try again
              </h1>
            ) : (
              ""
            )}
            {message && message === "done" ? (
              <h1 className="text-green-500">Event added successfully</h1>
            ) : (
              ""
            )}
            <h1 className=" text-2xl">New Event</h1>
            <Label htmlFor="name" className="text-xl">
              Name
            </Label>
            <Input
              className="text-xl"
              required
              id="name"
              name="name"
              placeholder="Name of this event"
            ></Input>
            {errors?.name && (
              <div className="text-destructive">{errors.name}</div>
            )}
            <div className="flex justify-between">
              <Label htmlFor="startTime" className="text-xl">
                Start Time
              </Label>
              <Input
                required
                id="startTime"
                name="startTime"
                className="text-xl"
                type="time"
              ></Input>
              {errors?.startTime && (
                <div className="text-destructive">{errors.startTime}</div>
              )}
              <Label htmlFor="endTime" className="text-xl">
                End Time
              </Label>
              <Input
                id="endTime"
                name="endTime"
                className="text-xl"
                type="time"
                required
              ></Input>
              {/*    */}
            </div>
            <Label htmlFor="startDate" className="text-xl">
              Start Date
            </Label>
            <Input
              id="startDate"
              name="startDate"
              className="text-xl"
              type="date"
            ></Input>{" "}
            <Label htmlFor="endDate" className="text-xl">
              End Date
            </Label>
            <Input
              id="endDate"
              name="endDate"
              className="text-xl"
              type="date"
            ></Input>
            <Label htmlFor="location" className="text-xl">
              Location
            </Label>
            <Input
              className="text-xl"
              id="location"
              name="location"
              placeholder="location for this event"
            ></Input>
            {errors?.location && (
              <div className="text-destructive">{errors.location}</div>
            )}
            <Label htmlFor="description" className="text-xl">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Enter Description"
              name="description"
              className="text-xl"
            ></Textarea>
            <Input
              type="hidden"
              name="religionId"
              value={`${religionId}`}
            ></Input>
            {errors?.religionId && (
              <div className="text-destructive">{errors.religionId}</div>
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
