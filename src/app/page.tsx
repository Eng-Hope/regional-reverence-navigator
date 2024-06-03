"use client";
import { ModeToggle } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import db from "@/Repository/db";
import { getReligion } from "@/Repository/functionalities";
import Image from "next/image";
import Link from "next/link";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import Religion, { religion } from "./user/religion/_components/religion";
import UserReligionList from "./_components/user_religion_list";
import { useParams, usePathname } from "next/navigation";

type WidgetIndex = 0 | 1 | 2;

export default function Home() {
  const [count, setCount] = useState<WidgetIndex>(0);
  const widgets = [
    <Main count={count} setCount={setCount} />,
    <Christianity count={count} setCount={setCount} />,
    <Islamic count={count} setCount={setCount} />,
  ];
  return widgets[count];
}

interface ToggleScreenProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<WidgetIndex>>;
}

export function ToggleScreen({ count, setCount }: ToggleScreenProps) {
  return (
    <div className="flex justify-center items-center mt-20 gap-8">
      <ToggleScreenButton
        handleClick={() => setCount(0)}
        className={count === 0 ? "rounded-[50%] bg-primary w-6 h-6" : ""}
      />
      <ToggleScreenButton
        handleClick={() => setCount(1)}
        className={count === 1 ? "rounded-[50%] bg-primary w-6 h-6" : ""}
      />
      <ToggleScreenButton
        handleClick={() => setCount(2)}
        className={count === 2 ? "rounded-[50%] bg-primary w-6 h-6" : ""}
      />
    </div>
  );
}

interface ToggleScreenButtonProps {
  className: string | undefined;
  handleClick: MouseEventHandler<HTMLButtonElement>;
}

function ToggleScreenButton({
  className,
  handleClick,
}: ToggleScreenButtonProps) {
  return (
    <button
      onClick={handleClick}
      className="rounded-[50%] border-gray-900 border-[2px] w-8 h-8 flex items-center justify-center"
    >
      <div className={className}></div>
    </button>
  );
}

interface WidgetProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<WidgetIndex>>;
}

function Main({ count, setCount }: WidgetProps) {
  return (
    <main className="blur-background">
      <HomeNav />
      <section className="flex items-center justify-center mt-[120px] text-7xl font-medium text-white">
        Find Religions Near You
      </section>
      <ReligionSearch count={count} setCount={setCount} />
    </main>
  );
}

function Christianity({ count, setCount }: WidgetProps) {
  return (
    <main className="christianity-background">
      <HomeNav />
      <section className="flex items-center justify-center mt-[120px] text-7xl font-medium text-primary">
        Christianity Community
      </section>
      <ReligionSearch count={count} setCount={setCount} />
    </main>
  );
}

function Islamic({ count, setCount }: WidgetProps) {
  return (
    <main className="islamic-background">
      <HomeNav />
      <section className="flex items-center justify-center mt-[120px] text-7xl font-medium text-primary">
        Islamic Community
      </section>
      <ReligionSearch count={count} setCount={setCount} />
    </main>
  );
}

export function HomeNav() {
  return (
    <nav className="flex px-3 pt-3 items-center gap-[70px]">
      <div className="ml-auto">
        <ModeToggle />
      </div>
      <Link href="/signup">
        <Button>Sign up</Button>
      </Link>
      <Link href="login">
        <Button>Login</Button>
      </Link>
    </nav>
  );
}

function ReligionSearch({ count, setCount }: WidgetProps) {
  const [religions, setReligions] = useState<religion[] | null>(null);
  const [name, setName] = useState("");
  const [allReligions, setAllReligions] = useState<religion[] | null>(null);

  function handleClick(religionId: { religionId: number}) { 
    alert('hey');
  }


  useEffect(() => {
    async function fecthReligion() {
          const religion = await getReligion();
       setAllReligions(religion);
    }
    fecthReligion();
  }, []);



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
      } else {
        setReligions(null);
      }
    }
    getData();
  }, [name]);

  const input = useRef<HTMLInputElement>(null);
  function handleChange() {
    setName(`${input.current?.value}`);
  }

  return (
    <>
      <section className="flex items-center justify-center mt-[120px] font-medium px-[300px] relative">
        <Input
          ref={input}
          value={name}
          onChange={handleChange}
          className="pl-[100px] text-2xl h-[50px]"
          placeholder="Search"
        />
        <i className="bx bx-search absolute mr-[750px] text-[30px]"></i>
      </section>
      <ToggleScreen count={count} setCount={setCount} />
      <marquee>
        <div className="flex gap-[200px] mt-10">
          {allReligions &&
            allReligions.map((religion) => (
              <Image
                height={100}
                width={250}
                alt="religion"
                src={religion.imageUrl}
              ></Image>
            ))}
        </div>
      </marquee>
      <section className="grid grid-cols-2 gap-[100px] p-[50px] mt-[80px]">
        {religions &&
          religions.map((religion) => (
            <UserReligionList key={religion.id} religion={religion} />
          ))}
      </section>
    </>
  );
}
