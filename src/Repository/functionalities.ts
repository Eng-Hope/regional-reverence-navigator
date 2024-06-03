import { User, Role } from './../../node_modules/.prisma/client/index.d';
"use server";
import { any, z } from "zod";
import db from "./db";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import fs from "fs/promises"

export async function addUser(prev: unknown, formData: FormData) {
  const schema = z.object({
    email: z.string().email(),
    name: z.string().min(1),
    role: z.enum(["ADMIN", "USER"]),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  });

  const results = schema.safeParse(Object.fromEntries(formData.entries()));
  if (results.success === false) {
    return results.error.formErrors.fieldErrors;
  }
  const data = results.data;

  let signedIn = false;

  try {
    const result = await db.user.create({
      data: {
        email: data.email,
        name: data.name,
        role: data.role,
        password: data.password,
      },
    });
    console.log(result);
    signedIn = true;
  } catch (e) {
    console.log(e);
  }
  if (signedIn) {
    return redirect("/admin/users?status=done");
  }
  return redirect("/admin/users?status=error");
}

export async function signUp(prev: unknown, formData: FormData) {
  const schema = z.object({
    email: z.string().email(),
    name: z.string().min(1),
    role: z.enum(["ADMIN", "USER"]),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  });

  const results = schema.safeParse(Object.fromEntries(formData.entries()));
  if (results.success === false) {
    return results.error.formErrors.fieldErrors;
  }
  const data = results.data;

  let signedIn = false;

  try {
    const result = await db.user.create({
      data: {
        email: data.email,
        name: data.name,
        role: data.role,
        password: data.password,
      },
    });
    console.log(result);
    signedIn = true;
  } catch (e) {
    console.log(e);
  }
  if (signedIn) {
    return redirect("/login?status=done");
  }
  return redirect("/signup?status=error");
}

export async function deleteUser(userId: String) {
  try {
    await db.user.delete({
      where: { id: userId.toString() },
    });
  } catch (e) {
    console.log(e);
  }

  return redirect("/admin/users");
}

export async function login(prev: unknown, formData: FormData) {
  const schema = z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: "password must contain 6 or more characters" }),
  });

  const result = schema.safeParse(Object.fromEntries(formData.entries()));

  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const user = await db.user.findUnique({
    where: { email: result.data.email, password: result.data.password }
  });

  console.log(user);

  if (!user) {
    redirect('/login?status=error');
  }
  cookies().set("user", JSON.stringify(user));
  if (user.role === "USER") {
      redirect("/user");
  }
  redirect("/admin");
}

export async function getUser(userId: String) {
  const user = await db.user.findUnique({
    select: {
      email: true,
      id: true,
      name: true,
      profilePicture:true,
      role:true
      
    },
    where:{id: userId.toString()}
  })
  return user;
}

export async function logout() {
  cookies().delete("user");
  redirect("/login");
}

export async function addReligion(prev: unknown, formData: FormData) {
    const fileSchema = z.instanceof(File, { message: "Required" });
    const imageSchema = fileSchema.refine(
      (file) => file.size === 0 || file.type.startsWith("image/")
    );
    const addSchema = z.object({
      name: z
        .string()
        .min(1, { message: "name must have one or more characters" }),
      category: z.enum(["ISLAMIC", "CHRISTIANITY"], {
        message: "Incorrect selection",
      }),
      subCategory: z.string().optional(),
      location: z.string().min(1, { message: "this field cannot be null" }),
      contacts: z
        .string()
        .max(13, { message: "contact cannot have more than 13 characters" })
        .min(10, { message: "contact cannot have less than 10 characters" }),
      image: imageSchema.refine((file) => file.size > 0, "Required"),
    });
  const results = addSchema.safeParse(Object.fromEntries(formData.entries()));

  if (results.success === false) {
    return results.error.formErrors.fieldErrors;
  }

  const user = await JSON.parse(cookies().get('user')!.value)
  const data = results.data;

  let isCreated = false;
  let imagePath;
  try {
    await fs.mkdir("public/religion/images", { recursive: true });
     imagePath = `/religion/images/${crypto.randomUUID()}-${data.image.name}`;
    await fs.writeFile(
      `public${imagePath}`,
      Buffer.from(await data.image.arrayBuffer())
    );
    await db.religion.create({
      data: {
        name: data.name,
        category: data.category,
        subCategory: data.subCategory,
        location: data.location,
        contact: data.contacts,
        imageUrl: imagePath,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    isCreated = true;
  }
  catch (e) {
    fs.unlink(`public${imagePath}`);
    console.log(e);
  }

  if (isCreated) {
    redirect("/user/religion?status=done");
  }
  redirect("/user/religion?status=error");
}

export async function addEventFuc(prev:unknown ,formData: FormData) {

   const addSchema = z.object({
     name: z
       .string()
       .min(1, { message: "name must have one or more characters" }),
     startTime: z.string().min(2, { message: "required" }),
     endTime: z.string().min(1, { message: "required" }),
     startDate: z.string().optional(),
     endDate: z.string().optional(),
     location: z.string().optional(),
     description: z.string().optional(),
     religionId: z.string(),
   });
   const results = addSchema.safeParse(Object.fromEntries(formData.entries()));

   if (results.success === false) {
     return results.error.formErrors.fieldErrors;
   }
  
  const data = results.data;
  let isCreated = false;
  try {
    const religionId = Number(data.religionId)
      await db.event.create({
      data: {
        name: data.name,
        startTime: data.startTime,
        endTime: data.endTime,
        startDate: data.startDate,
        endDate: data.endDate,
        location: data.location,
        description: data.description,
        religion: {
          connect: {
            id: religionId
          },
        },
      },
    });
    isCreated = true;
  } catch (e) {
    console.log(e);
  }

  if (isCreated) {
    redirect(`/user/religion/${data.religionId}?status=done`);
  }
  redirect(`/user/religion/${data.religionId}?status=done`);
}

export async function getReligion() {
  const religions = await db.religion.findMany();
  return religions;
}

export async function changeProfile(prev: unknown, formData:FormData) {
  const imageSchema = z.instanceof(File).optional();
  const addSchema = z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    image: imageSchema,
  });
  console.log(formData);
  
  const results = addSchema.safeParse(Object.fromEntries(formData.entries()));

  if (results.success === false) {
    return results.error.formErrors.fieldErrors;
  }

  const user = await JSON.parse(cookies().get("user")!.value);
  const data = results.data;

  let isCreated = false;
  let imagePath;
  try {

    if (data.image?.name != undefined) {
await fs.mkdir("public/profile/images", { recursive: true });
imagePath = `/profile/images/${crypto.randomUUID()}-${data.image.name}`;
await fs.writeFile(
  `public${imagePath}`,
  Buffer.from(await data.image.arrayBuffer())
);

await db.user.update({
  where: { id: user.id },
  data: {
    email: data.email,
    name: data.name,
    profilePicture: imagePath,
  },
});
    }
    else if (data.image?.name === undefined) {
      await db.user.update({
        where: { id: user.id },
        data: {
          email: data.email,
          name: data.name,
        },
      });
    }
    isCreated = true;

  } catch (e) {
    if (data.image?.name != undefined) {
      fs.unlink(`public${imagePath}`);
    }
    console.log(e);
  }

  if (user.role === "ADMIN") {
 if (isCreated) {
   redirect("/admin/profile?status=done");
 }
 redirect("/admin/profile?status=error"); 
  }
  else if (user.role === "USER") { 
 if (isCreated) {
   redirect("/user/profile?status=done");
 }
 redirect("/user/profile?status=error"); 
  }

 
}