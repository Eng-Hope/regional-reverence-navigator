import { religion } from "../user/religion/_components/religion";
import db from "@/Repository/db";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  id: string
}
 
export async function GET(request: Request, context: { params: Params }) {
  const team = context.params.id 
  const religions = await db.religion.findMany({
    where: {
      OR: [
        {
          name: {
            contains: team,
          },
        },
        {
          subCategory: {
            contains: team,
          },
        },
        {
          location: {
            contains: team,
          },
        },
      ],
    },
  });
  return NextResponse.json(religions);
}
