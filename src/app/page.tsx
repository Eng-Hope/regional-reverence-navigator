"use client";
import { ModeToggle } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import db from "@/Repository/db";
import { getReligion } from "@/Repository/functionalities";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Religion, { religion } from "./user/religion/_components/religion";
import UserReligionList from "./_components/user_religion_list";

export default function Home() {   
  const [religions, setReligions] = useState<religion[] | null>(null);
  const [name, setName] = useState('');
  const input = useRef<HTMLInputElement>(null);

  function handleChange() {
      setName(`${input.current?.value}`);
  }
 
  useEffect(() => {
    async function getData() {
      const url = `http://localhost:3000/${name}/`;
      const response = await fetch(url);
      if (response.ok) {
         const data: religion[] = await response.json();
        setReligions(data);
        if (data.length < 1) {
          setReligions(null);
        }
      }
      else {
        setReligions(null)
      }

     
    }
    getData();
  },[name])

  return (
    <main>
      <nav className="flex px-3 pt-3 items-center gap-[70px]">
        <Label className=" text-3xl">Regional Reverance Navigator</Label>
        <div className="ml-auto">
          <ModeToggle></ModeToggle>
        </div>
        <Link href="/signup">
          <Button>sign up</Button>
        </Link>
        <Link href="login">
          <Button>Login</Button>
        </Link>
      </nav>
      <section className="flex items-center justify-center mt-[120px] text-7xl font-medium text-primary">
        Find Religions Near You
      </section>
      <section className="flex items-center justify-center mt-[120px] font-medium px-[300px] relative">
        <Input ref={input} value={name} onChange={handleChange} className="pl-[100px] text-2xl"></Input>
        <i className="bx bx-search absolute mr-[700px] text-[30px]"></i>
      </section>
      <section className="grid grid-cols-2 gap-[100px] p-[50px] mt-[80px]">
        {religions &&
          religions.map((religion) => (
            <UserReligionList religion={religion} />
          ))}
      </section>
    </main>
  );
}
