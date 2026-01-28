import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
  },
});

// export const auth = betterAuth({
//   database: prismaAdapter(prisma, {
//     provider: "postgresql",
//   }),
//   trustedOrigins: [process.env.APP_URL!],
//   user: {
//     additionalFields: {
//       role: {
//         type: "string",
//         defaultValue: "CUSTOMER",
//         required: true,
//       },
//       status: {
//         type: "string",
//         defaultValue: "ACTIVATE",
//         required: false,
//       },
//     },
//   },

//   emailAndPassword: {
//     enabled: true,
//     minPasswordLength: 6,
//     requireEmailVerification: true,
//   },
// });
