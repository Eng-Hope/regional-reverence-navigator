import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReligionList } from "./religion/page";

export default function User() {
  return (
    <main>
      <section className="flex justify-between px-[2%] pt-10">
        <Card className="w-[45%]">
          <CardHeader>
            <CardTitle>Religions</CardTitle>
            <CardDescription>3 Religions</CardDescription>
          </CardHeader>
        </Card>
        <Card className="w-[45%]">
          <CardHeader>
            <CardTitle>Views</CardTitle>
            <CardDescription>0 views</CardDescription>
          </CardHeader>
        </Card>
          </section>
          
          <section>
              <ReligionList />
          </section>
    </main>
  );
}
