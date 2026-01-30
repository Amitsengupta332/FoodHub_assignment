import { Role } from "../generated/prisma/enums";
import { prisma } from "../lib/prisma";

async function seedAdmin() {
  try {
    const adminData = {
      name: "Amit Sen Gupta",
      email: "amitAdmin@gmail.com",
      password: "password1234",
 
      role: Role.ADMIN,
    };

    const existingUser = await prisma.user.findUnique({
      where: {
        email: adminData.email,
      },
    });

    if (existingUser) {
      throw new Error("User already exists!!");
    }

    const signUnAdmin = await fetch(
      "http://localhost:5000/api/auth/sign-up/email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          origin: "http://localhost:3000",
        },
        body: JSON.stringify(adminData),
      },
    );

    if (signUnAdmin.ok) {
      await prisma.user.update({
        where: {
          email: adminData.email,
        },
        data: {
          emailVerified: true,
        },
      });
      console.log("successfully admin creation");
    }
  } catch (error) {
    console.log(error);
  }
}

seedAdmin();
