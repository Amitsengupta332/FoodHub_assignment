var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/app.ts
import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// src/generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// src/generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.3.0",
  "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
  "activeProvider": "postgresql",
  "inlineSchema": '// generator client {\n//   provider = "prisma-client"\n//   output   = "../src/generated/prisma"\n// }\n\n// datasource db {\n//   provider = "postgresql"\n// }\n\n// // ENUMS\n\n// enum Role {\n//   CUSTOMER\n//   PROVIDER\n//   ADMIN\n// }\n\n// enum OrderStatus {\n//   PLACED\n//   PREPARING\n//   READY\n//   DELIVERED\n//   CANCELLED\n// }\n\n// //////////////////////////////////////////////////\n// // BETTER-AUTH MODELS\n// //////////////////////////////////////////////////\n\n// model User {\n//   id            String  @id\n//   name          String\n//   email         String  @unique\n//   emailVerified Boolean @default(false)\n//   image         String?\n//   role          Role    @default(CUSTOMER)\n//   isActive      Boolean @default(true)\n\n//   createdAt DateTime @default(now())\n//   updatedAt DateTime @updatedAt\n\n//   sessions Session[]\n//   accounts Account[]\n\n//   provider ProviderProfile?\n//   orders   Order[]\n//   reviews  Review[]\n\n//   status String? @default("ACTIVATE")\n\n//   @@map("user")\n// }\n\n// model Session {\n//   id        String   @id\n//   expiresAt DateTime\n//   token     String   @unique\n\n//   createdAt DateTime @default(now())\n//   updatedAt DateTime @updatedAt\n\n//   ipAddress String?\n//   userAgent String?\n\n//   userId String\n//   user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n//   @@index([userId])\n//   @@map("session")\n// }\n\n// model Account {\n//   id         String @id\n//   accountId  String\n//   providerId String\n\n//   userId String\n//   user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n//   accessToken  String?\n//   refreshToken String?\n//   idToken      String?\n\n//   accessTokenExpiresAt  DateTime?\n//   refreshTokenExpiresAt DateTime?\n\n//   scope    String?\n//   password String?\n\n//   createdAt DateTime @default(now())\n//   updatedAt DateTime @updatedAt\n\n//   @@index([userId])\n//   @@map("account")\n// }\n\n// model Verification {\n//   id         String   @id\n//   identifier String\n//   value      String\n//   expiresAt  DateTime\n\n//   createdAt DateTime @default(now())\n//   updatedAt DateTime @updatedAt\n\n//   @@index([identifier])\n//   @@map("verification")\n// }\n\n// // FOODHUB MODELS\n\n// model ProviderProfile {\n//   id String @id @default(uuid())\n\n//   userId   String @unique\n//   shopName String\n//   address  String\n//   phone    String\n\n//   user User @relation(fields: [userId], references: [id])\n\n//   meals Meal[]\n\n//   createdAt DateTime @default(now())\n// }\n\n// model Category {\n//   id   String @id @default(uuid())\n//   name String @unique\n\n//   meals Meal[]\n// }\n\n// model Meal {\n//   id String @id @default(uuid())\n\n//   name        String\n//   description String\n//   price       Float\n//   image       String\n\n//   isAvailable Boolean @default(true)\n\n//   providerId String\n//   categoryId String\n\n//   provider ProviderProfile @relation(fields: [providerId], references: [id])\n//   category Category        @relation(fields: [categoryId], references: [id])\n\n//   orderItems OrderItem[]\n//   reviews    Review[]\n\n//   createdAt DateTime @default(now())\n// }\n\n// model Order {\n//   id String @id @default(uuid())\n\n//   userId String\n//   status OrderStatus @default(PLACED)\n\n//   address String\n//   total   Float\n\n//   user User @relation(fields: [userId], references: [id])\n\n//   items OrderItem[]\n\n//   createdAt DateTime @default(now())\n// }\n\n// model OrderItem {\n//   id String @id @default(uuid())\n\n//   orderId String\n//   mealId  String\n\n//   qty   Int\n//   price Float\n\n//   order Order @relation(fields: [orderId], references: [id])\n//   meal  Meal  @relation(fields: [mealId], references: [id])\n// }\n\n// model Review {\n//   id String @id @default(uuid())\n\n//   userId String\n//   mealId String\n\n//   rating  Int\n//   comment String\n\n//   user User @relation(fields: [userId], references: [id])\n//   meal Meal @relation(fields: [mealId], references: [id])\n\n//   createdAt DateTime @default(now())\n// }\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../src/generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\n//////////////////////////////////////////////////\n// ENUMS\n//////////////////////////////////////////////////\n\nenum Role {\n  CUSTOMER\n  PROVIDER\n  ADMIN\n}\n\nenum OrderStatus {\n  PLACED\n  PREPARING\n  READY\n  DELIVERED\n  CANCELLED\n}\n\n//////////////////////////////////////////////////\n// AUTH MODELS (Better Auth Compatible)\n//////////////////////////////////////////////////\n\nmodel User {\n  id            String  @id\n  name          String\n  email         String  @unique\n  emailVerified Boolean @default(false)\n  image         String?\n  role          Role    @default(CUSTOMER)\n  isActive      Boolean @default(true)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  sessions Session[]\n  accounts Account[]\n\n  provider ProviderProfile?\n  orders   Order[]\n  reviews  Review[]\n\n  @@map("user")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String   @unique\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  ipAddress String?\n  userAgent String?\n\n  userId String\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id         String @id\n  accountId  String\n  providerId String\n\n  userId String\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  accessToken  String?\n  refreshToken String?\n  idToken      String?\n\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n\n  scope    String?\n  password String?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n\n//////////////////////////////////////////////////\n// FOODHUB MODELS\n//////////////////////////////////////////////////\n\nmodel ProviderProfile {\n  id String @id @default(uuid())\n\n  userId   String @unique\n  shopName String\n  address  String\n  phone    String\n\n  user User @relation(fields: [userId], references: [id])\n\n  meals  Meal[]\n  orders Order[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Category {\n  id   String @id @default(uuid())\n  name String @unique\n\n  meals Meal[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Meal {\n  id String @id @default(uuid())\n\n  name        String\n  description String\n  price       Float\n  image       String\n\n  isAvailable Boolean @default(true)\n\n  providerId String\n  categoryId String\n\n  provider ProviderProfile @relation(fields: [providerId], references: [id])\n  category Category        @relation(fields: [categoryId], references: [id])\n\n  orderItems OrderItem[]\n  reviews    Review[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Order {\n  id String @id @default(uuid())\n\n  userId     String\n  providerId String\n\n  status OrderStatus @default(PLACED)\n\n  address String\n  total   Float\n\n  user     User            @relation(fields: [userId], references: [id])\n  provider ProviderProfile @relation(fields: [providerId], references: [id])\n\n  items OrderItem[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel OrderItem {\n  id String @id @default(uuid())\n\n  orderId String\n  mealId  String\n\n  qty   Int\n  price Float\n\n  order Order @relation(fields: [orderId], references: [id])\n  meal  Meal  @relation(fields: [mealId], references: [id])\n}\n\nmodel Review {\n  id String @id @default(uuid())\n\n  userId String\n  mealId String\n\n  rating  Int\n  comment String\n\n  user User @relation(fields: [userId], references: [id])\n  meal Meal @relation(fields: [mealId], references: [id])\n\n  createdAt DateTime @default(now())\n\n  // One review per user per meal\n  @@unique([userId, mealId])\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"Role"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"provider","kind":"object","type":"ProviderProfile","relationName":"ProviderProfileToUser"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToUser"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToUser"}],"dbName":"user"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"},"ProviderProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"shopName","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"ProviderProfileToUser"},{"name":"meals","kind":"object","type":"Meal","relationName":"MealToProviderProfile"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToProviderProfile"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"meals","kind":"object","type":"Meal","relationName":"CategoryToMeal"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Meal":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Float"},{"name":"image","kind":"scalar","type":"String"},{"name":"isAvailable","kind":"scalar","type":"Boolean"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"provider","kind":"object","type":"ProviderProfile","relationName":"MealToProviderProfile"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToMeal"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"MealToOrderItem"},{"name":"reviews","kind":"object","type":"Review","relationName":"MealToReview"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"address","kind":"scalar","type":"String"},{"name":"total","kind":"scalar","type":"Float"},{"name":"user","kind":"object","type":"User","relationName":"OrderToUser"},{"name":"provider","kind":"object","type":"ProviderProfile","relationName":"OrderToProviderProfile"},{"name":"items","kind":"object","type":"OrderItem","relationName":"OrderToOrderItem"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"OrderItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"qty","kind":"scalar","type":"Int"},{"name":"price","kind":"scalar","type":"Float"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToOrderItem"},{"name":"meal","kind":"object","type":"Meal","relationName":"MealToOrderItem"}],"dbName":null},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"ReviewToUser"},{"name":"meal","kind":"object","type":"Meal","relationName":"MealToReview"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// src/generated/prisma/internal/prismaNamespace.ts
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AccountScalarFieldEnum: () => AccountScalarFieldEnum,
  AnyNull: () => AnyNull2,
  CategoryScalarFieldEnum: () => CategoryScalarFieldEnum,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  JsonNull: () => JsonNull2,
  MealScalarFieldEnum: () => MealScalarFieldEnum,
  ModelName: () => ModelName,
  NullTypes: () => NullTypes2,
  NullsOrder: () => NullsOrder,
  OrderItemScalarFieldEnum: () => OrderItemScalarFieldEnum,
  OrderScalarFieldEnum: () => OrderScalarFieldEnum,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  ProviderProfileScalarFieldEnum: () => ProviderProfileScalarFieldEnum,
  QueryMode: () => QueryMode,
  ReviewScalarFieldEnum: () => ReviewScalarFieldEnum,
  SessionScalarFieldEnum: () => SessionScalarFieldEnum,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  UserScalarFieldEnum: () => UserScalarFieldEnum,
  VerificationScalarFieldEnum: () => VerificationScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
import * as runtime2 from "@prisma/client/runtime/client";
var PrismaClientKnownRequestError2 = runtime2.PrismaClientKnownRequestError;
var PrismaClientUnknownRequestError2 = runtime2.PrismaClientUnknownRequestError;
var PrismaClientRustPanicError2 = runtime2.PrismaClientRustPanicError;
var PrismaClientInitializationError2 = runtime2.PrismaClientInitializationError;
var PrismaClientValidationError2 = runtime2.PrismaClientValidationError;
var sql = runtime2.sqltag;
var empty2 = runtime2.empty;
var join2 = runtime2.join;
var raw2 = runtime2.raw;
var Sql2 = runtime2.Sql;
var Decimal2 = runtime2.Decimal;
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var prismaVersion = {
  client: "7.3.0",
  engine: "9d6ad21cbbceab97458517b147a6a09ff43aa735"
};
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var DbNull2 = runtime2.DbNull;
var JsonNull2 = runtime2.JsonNull;
var AnyNull2 = runtime2.AnyNull;
var ModelName = {
  User: "User",
  Session: "Session",
  Account: "Account",
  Verification: "Verification",
  ProviderProfile: "ProviderProfile",
  Category: "Category",
  Meal: "Meal",
  Order: "Order",
  OrderItem: "OrderItem",
  Review: "Review"
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var UserScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  emailVerified: "emailVerified",
  image: "image",
  role: "role",
  isActive: "isActive",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SessionScalarFieldEnum = {
  id: "id",
  expiresAt: "expiresAt",
  token: "token",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  ipAddress: "ipAddress",
  userAgent: "userAgent",
  userId: "userId"
};
var AccountScalarFieldEnum = {
  id: "id",
  accountId: "accountId",
  providerId: "providerId",
  userId: "userId",
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  idToken: "idToken",
  accessTokenExpiresAt: "accessTokenExpiresAt",
  refreshTokenExpiresAt: "refreshTokenExpiresAt",
  scope: "scope",
  password: "password",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var VerificationScalarFieldEnum = {
  id: "id",
  identifier: "identifier",
  value: "value",
  expiresAt: "expiresAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var ProviderProfileScalarFieldEnum = {
  id: "id",
  userId: "userId",
  shopName: "shopName",
  address: "address",
  phone: "phone",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var CategoryScalarFieldEnum = {
  id: "id",
  name: "name",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var MealScalarFieldEnum = {
  id: "id",
  name: "name",
  description: "description",
  price: "price",
  image: "image",
  isAvailable: "isAvailable",
  providerId: "providerId",
  categoryId: "categoryId",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var OrderScalarFieldEnum = {
  id: "id",
  userId: "userId",
  providerId: "providerId",
  status: "status",
  address: "address",
  total: "total",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var OrderItemScalarFieldEnum = {
  id: "id",
  orderId: "orderId",
  mealId: "mealId",
  qty: "qty",
  price: "price"
};
var ReviewScalarFieldEnum = {
  id: "id",
  userId: "userId",
  mealId: "mealId",
  rating: "rating",
  comment: "comment",
  createdAt: "createdAt"
};
var SortOrder = {
  asc: "asc",
  desc: "desc"
};
var QueryMode = {
  default: "default",
  insensitive: "insensitive"
};
var NullsOrder = {
  first: "first",
  last: "last"
};
var defineExtension = runtime2.Extensions.defineExtension;

// src/generated/prisma/enums.ts
var Role = {
  CUSTOMER: "CUSTOMER",
  PROVIDER: "PROVIDER",
  ADMIN: "ADMIN"
};

// src/generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/lib/auth.ts
var auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
    // or "mysql", "postgresql", ...etc
  }),
  trustedOrigins: [process.env.APP_URL],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "CUSTOMER",
        required: true
      }
    }
  },
  emailAndPassword: {
    enabled: true
  }
});

// src/modules/meals/meals.route.ts
import { Router } from "express";

// src/modules/meals/meals.service.ts
var createMeal = async (providerUserId, data) => {
  const providerProfile = await prisma.providerProfile.findUnique({
    where: { userId: providerUserId }
  });
  if (!providerProfile) {
    throw new Error("Provider profile not found. Create profile first.");
  }
  return prisma.meal.create({
    data: {
      ...data,
      providerId: providerProfile.id
    }
  });
};
var getProviderMeals = async (providerUserId) => {
  const providerProfile = await prisma.providerProfile.findUnique({
    where: { userId: providerUserId }
  });
  if (!providerProfile) {
    throw new Error("Provider profile not found.");
  }
  return prisma.meal.findMany({
    where: { providerId: providerProfile.id },
    orderBy: { createdAt: "desc" }
  });
};
var getAllMeals = async ({
  search,
  categoriesId,
  maxPrice
}) => {
  const andCondition = [];
  andCondition.push({ isAvailable: true });
  if (search) {
    andCondition.push({
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } }
      ]
    });
  }
  if (categoriesId) {
    andCondition.push({ categoryId: categoriesId });
  }
  if (typeof maxPrice === "number" && !Number.isNaN(maxPrice)) {
    andCondition.push({ price: { lte: maxPrice } });
  }
  return prisma.meal.findMany({
    where: { AND: andCondition },
    include: { provider: true, category: true },
    orderBy: { createdAt: "desc" }
  });
};
var getMealDetails = async (mealId) => {
  return prisma.meal.findUnique({
    where: { id: mealId },
    include: {
      provider: true,
      category: true,
      reviews: {
        include: { user: { select: { id: true, name: true } } },
        orderBy: { createdAt: "desc" }
      }
    }
  });
};
var updateMeal = async (providerUserId, mealId, data) => {
  const providerProfile = await prisma.providerProfile.findUnique({
    where: { userId: providerUserId }
  });
  if (!providerProfile) throw new Error("Provider profile not found");
  const result = await prisma.meal.updateMany({
    where: { id: mealId, providerId: providerProfile.id },
    data
  });
  if (result.count === 0) {
    throw new Error("Meal not found or you are not allowed to update it");
  }
  return prisma.meal.findUnique({ where: { id: mealId } });
};
var deleteMeal = async (providerUserId, mealId) => {
  const providerProfile = await prisma.providerProfile.findUnique({
    where: { userId: providerUserId }
  });
  if (!providerProfile) throw new Error("Provider profile not found");
  const result = await prisma.meal.deleteMany({
    where: { id: mealId, providerId: providerProfile.id }
  });
  if (result.count === 0) {
    throw new Error("Meal not found or you are not allowed to delete it");
  }
  return { deleted: true };
};
var mealsService = {
  createMeal,
  getProviderMeals,
  getAllMeals,
  getMealDetails,
  updateMeal,
  deleteMeal
};

// src/modules/meals/meals.controller.ts
var createMeal2 = async (req, res) => {
  const providerUserId = req.user?.id;
  if (!providerUserId) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  try {
    const result = await mealsService.createMeal(providerUserId, req.body);
    res.status(201).json({
      success: true,
      message: "Meal created successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Meal creation failed",
      error: error.message
    });
  }
};
var getProviderMeals2 = async (req, res) => {
  const providerUserId = req.user?.id;
  if (!providerUserId) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  try {
    const result = await mealsService.getProviderMeals(providerUserId);
    res.status(200).json({
      success: true,
      message: "Provider meals fetched successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message || "Failed to fetch provider meals" });
  }
};
var getAllMeals2 = async (req, res) => {
  try {
    const { search, categoriesId, maxPrice } = req.query;
    const payload = {};
    if (typeof search === "string") payload.search = search;
    if (typeof categoriesId === "string") payload.categoriesId = categoriesId;
    if (typeof maxPrice === "string") payload.maxPrice = Number(maxPrice);
    const result = await mealsService.getAllMeals(payload);
    res.status(200).json({
      success: true,
      message: "Meals fetched successfully",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch meals",
      error: error.message || error
    });
  }
};
var getMealDetails2 = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await mealsService.getMealDetails(id);
    if (!result) {
      return res.status(404).json({ success: false, message: "Meal not found" });
    }
    res.status(200).json({
      success: true,
      message: "Meal details fetched successfully",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch meal details",
      error: error.message || error
    });
  }
};
var updateMeal2 = async (req, res) => {
  const providerUserId = req.user?.id;
  const { id } = req.params;
  if (!providerUserId || !id) {
    return res.status(400).json({ success: false, message: "Invalid request" });
  }
  try {
    const result = await mealsService.updateMeal(providerUserId, id, req.body);
    res.status(200).json({
      success: true,
      message: "Meal updated successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message || "Meal update failed" });
  }
};
var deleteMeal2 = async (req, res) => {
  const providerUserId = req.user?.id;
  const { id } = req.params;
  if (!providerUserId || !id) {
    return res.status(400).json({ success: false, message: "Invalid request" });
  }
  try {
    const result = await mealsService.deleteMeal(providerUserId, id);
    res.status(200).json({
      success: true,
      message: "Meal deleted successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message || "Meal delete failed" });
  }
};
var mealsController = {
  createMeal: createMeal2,
  getProviderMeals: getProviderMeals2,
  getAllMeals: getAllMeals2,
  getMealDetails: getMealDetails2,
  updateMeal: updateMeal2,
  deleteMeal: deleteMeal2
};

// src/middlewares/auth.ts
function auth2(...roles) {
  return async (req, res, next) => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers
      });
      if (!session) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized!"
        });
      }
      const dbUser = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          role: true,
          isActive: true
        }
      });
      if (!dbUser) {
        return res.status(401).json({ success: false, message: "Invalid session user!" });
      }
      if (!dbUser.isActive) {
        return res.status(403).json({
          success: false,
          message: "Account suspended. Please contact support."
        });
      }
      req.user = {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        image: dbUser.image || "",
        role: dbUser.role
      };
      if (roles.length && !roles.includes(dbUser.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden! You don't have permission to access this resource!"
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}
var auth_default = auth2;

// src/modules/meals/meals.route.ts
var router = Router();
router.get("/", mealsController.getAllMeals);
router.get("/:id", mealsController.getMealDetails);
router.post("/", auth_default(Role.PROVIDER), mealsController.createMeal);
router.get("/provider/my", auth_default(Role.PROVIDER), mealsController.getProviderMeals);
router.patch("/:id", auth_default(Role.PROVIDER), mealsController.updateMeal);
router.delete("/:id", auth_default(Role.PROVIDER), mealsController.deleteMeal);
var mealsRouter = router;

// src/modules/category/category.route.ts
import { Router as Router2 } from "express";

// src/modules/category/category.service.ts
var getAllCategory = async () => {
  return await prisma.category.findMany();
};
var createCategory = async (data) => {
  return await prisma.category.create({
    data
  });
};
var updateCategory = async (id, data) => {
  return await prisma.category.update({
    where: {
      id
    },
    data
  });
};
var deleteCategory = async (id) => {
  return await prisma.category.delete({
    where: {
      id
    }
  });
};
var categoryService = {
  getAllCategory,
  createCategory,
  updateCategory,
  deleteCategory
};

// src/modules/category/category.controller.ts
var getAllCategory2 = async (req, res) => {
  try {
    const result = await categoryService.getAllCategory();
    res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data: result
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: "Fetch failed. Please try again.",
      error: e.message || e
    });
  }
};
var createCategory2 = async (req, res) => {
  const data = req.body;
  try {
    const result = await categoryService.createCategory(data);
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: result
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: "Category creation failed. Please try again.",
      error: e.message || e
    });
  }
};
var updateCategory2 = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const result = await categoryService.updateCategory(id, data);
    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: result
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: "Category update failed. Please try again.",
      error: e.message || e
    });
  }
};
var deleteCategory2 = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await categoryService.deleteCategory(id);
    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: result
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: "Category delete failed. Please try again.",
      error: e.message || e
    });
  }
};
var categoryController = {
  getAllCategory: getAllCategory2,
  createCategory: createCategory2,
  updateCategory: updateCategory2,
  deleteCategory: deleteCategory2
};

// src/modules/category/category.route.ts
var router2 = Router2();
router2.get("/", categoryController.getAllCategory);
router2.post("/", auth_default(Role.ADMIN), categoryController.createCategory);
router2.patch("/:id", auth_default(Role.ADMIN), categoryController.updateCategory);
router2.delete("/:id", auth_default(Role.ADMIN), categoryController.deleteCategory);
var categoryRouter = router2;

// src/modules/providerProfile/providerProfile.routes.ts
import { Router as Router3 } from "express";

// src/modules/providerProfile/providerProfile.service.ts
var getAllProvider = async () => {
  return prisma.providerProfile.findMany({
    where: { user: { isActive: true } },
    include: {
      user: { select: { id: true, name: true, email: true } }
    },
    orderBy: { createdAt: "desc" }
  });
};
var getProviderWithMenu = async (id) => {
  return prisma.providerProfile.findUnique({
    where: { id },
    include: {
      meals: { where: { isAvailable: true }, orderBy: { createdAt: "desc" } },
      user: { select: { id: true, name: true } }
    }
  });
};
var createProviderProfile = async (userId, payload) => {
  const existing = await prisma.providerProfile.findUnique({
    where: { userId }
  });
  if (existing) {
    throw new Error("Provider profile already exists");
  }
  return prisma.providerProfile.create({
    data: {
      ...payload,
      user: { connect: { id: userId } }
    }
  });
};
var providerProfileService = {
  createProviderProfile,
  getProviderWithMenu,
  getAllProvider
};

// src/modules/providerProfile/providerProfile.controller.ts
var getAllProviders = async (req, res) => {
  try {
    const result = await providerProfileService.getAllProvider();
    res.status(200).json({
      success: true,
      message: "Providers fetched successfully",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch providers.",
      error: error.message
    });
  }
};
var getProviderWithMenu2 = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await providerProfileService.getProviderWithMenu(
      id
    );
    if (!result) {
      return res.status(404).json({ success: false, message: "Provider not found" });
    }
    res.status(200).json({
      success: true,
      message: "Provider details fetched successfully",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch provider.",
      error: error.message
    });
  }
};
var createProviderProfile2 = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId)
      return res.status(401).json({ success: false, message: "Unauthorized" });
    const { shopName, address, phone } = req.body;
    if (!shopName || !address || !phone) {
      return res.status(400).json({
        success: false,
        message: "shopName, address, phone are required"
      });
    }
    const result = await providerProfileService.createProviderProfile(userId, {
      shopName,
      address,
      phone
    });
    res.status(201).json({
      success: true,
      message: "Provider profile created successfully",
      data: result
    });
  } catch (error) {
    const msg = String(error.message || "");
    const status = msg.includes("already exists") ? 409 : 400;
    res.status(status).json({
      success: false,
      message: "Provider profile creation failed",
      error: msg
    });
  }
};
var providerProfileController = {
  createProviderProfile: createProviderProfile2,
  getProviderWithMenu: getProviderWithMenu2,
  getAllProviders
};

// src/modules/providerProfile/providerProfile.routes.ts
var router3 = Router3();
router3.get("/", providerProfileController.getAllProviders);
router3.get("/:id", providerProfileController.getProviderWithMenu);
router3.post(
  "/",
  auth_default(Role.PROVIDER),
  providerProfileController.createProviderProfile
);
var providerProfileRouter = router3;

// src/middlewares/globalErrorHandler.ts
function errorHandler(err, req, res, next) {
  let statusCode = 500;
  let errorMessage = "Internal Server Error";
  let errorDetails = err;
  if (err instanceof prismaNamespace_exports.PrismaClientValidationError) {
    statusCode = 400;
    errorMessage = "You provide incorrect field type or missing fields!";
  } else if (err instanceof prismaNamespace_exports.PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      statusCode = 400;
      errorMessage = "An operation failed because it depends on one or more records that were required but not found.";
    } else if (err.code === "P2002") {
      statusCode = 400;
      errorMessage = "Duplicate key error";
    } else if (err.code === "P2003") {
      statusCode = 400;
      errorMessage = "Foreign key constraint failed";
    }
  } else if (err instanceof prismaNamespace_exports.PrismaClientUnknownRequestError) {
    statusCode = 500;
    errorMessage = "Error occurred during query execution";
  } else if (err instanceof prismaNamespace_exports.PrismaClientInitializationError) {
    if (err.errorCode === "P1000") {
      statusCode = 401;
      errorMessage = "Authentication failed. Please check your creditials!";
    } else if (err.errorCode === "P1001") {
      statusCode = 400;
      errorMessage = "Can't reach database server";
    }
  }
  res.status(statusCode);
  res.json({
    message: errorMessage,
    error: errorDetails
  });
}
var globalErrorHandler_default = errorHandler;

// src/modules/user/user.route.ts
import { Router as Router4 } from "express";

// src/modules/user/user.service.ts
var getAllUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true
    }
  });
};
var updateUserStatus = async (id, isActive) => {
  return await prisma.user.update({
    where: { id },
    data: { isActive }
  });
};
var userService = {
  getAllUsers,
  updateUserStatus
};

// src/modules/user/user.controller.ts
var getAllUsers2 = async (req, res) => {
  try {
    const result = await userService.getAllUsers();
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: result
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users. Please try again later.",
      error: e.message || e
    });
  }
};
var updateUserStatus2 = async (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body;
  if (!id || typeof id !== "string") {
    return res.status(400).json({ success: false, message: "Invalid user id" });
  }
  if (typeof isActive !== "boolean") {
    return res.status(400).json({
      success: false,
      message: "isActive must be boolean"
    });
  }
  const result = await userService.updateUserStatus(id, isActive);
  res.status(200).json({
    success: true,
    message: "User status updated successfully",
    data: result
  });
};
var userController = {
  getAllUsers: getAllUsers2,
  updateUserStatus: updateUserStatus2
};

// src/modules/user/user.route.ts
var router4 = Router4();
router4.get("/", auth_default(Role.ADMIN), userController.getAllUsers);
router4.patch("/:id", auth_default(Role.ADMIN), userController.updateUserStatus);
var userRouter = router4;

// src/modules/order/order.route.ts
import { Router as Router5 } from "express";

// src/modules/order/order.service.ts
var createOrders = async (userId, payload) => {
  if (!payload.address) throw new Error("address is required");
  if (!Array.isArray(payload.items) || payload.items.length === 0)
    throw new Error("items are required");
  const mealIds = payload.items.map((i) => i.mealId);
  const meals = await prisma.meal.findMany({
    where: { id: { in: mealIds }, isAvailable: true },
    select: { id: true, price: true, providerId: true }
  });
  if (meals.length !== mealIds.length) {
    throw new Error("One or more meals are invalid/unavailable");
  }
  const providerIdSet = new Set(meals.map((m) => m.providerId));
  if (providerIdSet.size !== 1) {
    throw new Error("You can order items from only one provider per order.");
  }
  if (meals.length === 0) {
    throw new Error("No meals found");
  }
  const providerId = meals[0].providerId;
  const total = payload.items.reduce((sum, item) => {
    const meal = meals.find((m) => m.id === item.mealId);
    const qty = Number(item.qty);
    if (!Number.isFinite(qty) || qty <= 0) throw new Error("Invalid qty");
    return sum + meal.price * qty;
  }, 0);
  return prisma.order.create({
    data: {
      userId,
      providerId,
      address: payload.address,
      total,
      items: {
        create: payload.items.map((i) => {
          const meal = meals.find((m) => m.id === i.mealId);
          return { mealId: i.mealId, qty: i.qty, price: meal.price };
        })
      }
    },
    include: { items: true, provider: true }
  });
};
var getUsersOrders = async (userId) => {
  return prisma.order.findMany({
    where: { userId },
    include: { items: true, provider: true },
    orderBy: { createdAt: "desc" }
  });
};
var getAllOrders = async () => {
  return prisma.order.findMany({
    include: {
      items: true,
      provider: true,
      user: { select: { id: true, name: true, email: true } }
    },
    orderBy: { createdAt: "desc" }
  });
};
var getOrderDetails = async (orderId) => {
  return prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: { include: { meal: true } },
      provider: { include: { user: { select: { id: true, name: true } } } },
      user: { select: { id: true, name: true, email: true } }
    }
  });
};
var getProviderOrders = async (providerUserId) => {
  const profile = await prisma.providerProfile.findUnique({
    where: { userId: providerUserId }
  });
  if (!profile) throw new Error("Provider profile not found");
  return prisma.order.findMany({
    where: { providerId: profile.id },
    include: { items: true, user: { select: { id: true, name: true } } },
    orderBy: { createdAt: "desc" }
  });
};
var canTransition = (from, to) => {
  const allowed = {
    PLACED: ["PREPARING", "CANCELLED"],
    PREPARING: ["READY"],
    READY: ["DELIVERED"],
    DELIVERED: [],
    CANCELLED: []
  };
  return allowed[from].includes(to);
};
var updateOrderStatusByProvider = async (providerUserId, orderId, nextStatus) => {
  const profile = await prisma.providerProfile.findUnique({
    where: { userId: providerUserId }
  });
  if (!profile) throw new Error("Provider profile not found");
  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) throw new Error("Order not found");
  if (order.providerId !== profile.id) {
    throw new Error("You are not allowed to update this order");
  }
  if (!canTransition(order.status, nextStatus)) {
    throw new Error(
      `Invalid status transition: ${order.status} -> ${nextStatus}`
    );
  }
  return prisma.order.update({
    where: { id: orderId },
    data: { status: nextStatus }
  });
};
var cancelOrderByCustomer = async (customerUserId, orderId) => {
  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) throw new Error("Order not found");
  if (order.userId !== customerUserId) throw new Error("Forbidden");
  if (order.status !== "PLACED")
    throw new Error("Only PLACED orders can be cancelled");
  return prisma.order.update({
    where: { id: orderId },
    data: { status: "CANCELLED" }
  });
};
var orderService = {
  createOrders,
  getUsersOrders,
  getAllOrders,
  getOrderDetails,
  getProviderOrders,
  updateOrderStatusByProvider,
  cancelOrderByCustomer
};

// src/modules/order/order.controller.ts
var orderCreate = async (req, res) => {
  const userId = req.user?.id;
  if (!userId)
    return res.status(401).json({ success: false, message: "Unauthorized" });
  try {
    const result = await orderService.createOrders(userId, req.body);
    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Order creation failed",
      error: error.message || error
    });
  }
};
var getUsersOrders2 = async (req, res) => {
  const userId = req.user?.id;
  if (!userId)
    return res.status(401).json({ success: false, message: "Unauthorized" });
  try {
    const result = await orderService.getUsersOrders(userId);
    res.status(200).json({
      success: true,
      message: "User orders fetched successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to fetch user orders",
      error: error.message || error
    });
  }
};
var getProviderOrders2 = async (req, res) => {
  const providerUserId = req.user?.id;
  if (!providerUserId)
    return res.status(401).json({ success: false, message: "Unauthorized" });
  try {
    const result = await orderService.getProviderOrders(providerUserId);
    res.status(200).json({
      success: true,
      message: "Provider orders fetched successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to fetch provider orders"
    });
  }
};
var getAllOrders2 = async (req, res) => {
  try {
    const result = await orderService.getAllOrders();
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message || error
    });
  }
};
var getOrderDetails2 = async (req, res) => {
  const userId = req.user?.id;
  const role = req.user?.role;
  const { id } = req.params;
  if (!userId)
    return res.status(401).json({ success: false, message: "Unauthorized" });
  try {
    const order = await orderService.getOrderDetails(id);
    if (!order)
      return res.status(404).json({ success: false, message: "Order not found" });
    if (role === "CUSTOMER" && order.userId !== userId) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }
    if (role === "PROVIDER" && order.provider?.userId !== userId) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }
    res.status(200).json({
      success: true,
      message: "Order details fetched successfully",
      data: order
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to fetch order details",
      error: error.message || error
    });
  }
};
var updateOrderStatus = async (req, res) => {
  const providerUserId = req.user?.id;
  const { id } = req.params;
  const { status } = req.body;
  if (!providerUserId)
    return res.status(401).json({ success: false, message: "Unauthorized" });
  if (!status)
    return res.status(400).json({ success: false, message: "status is required" });
  try {
    const result = await orderService.updateOrderStatusByProvider(
      providerUserId,
      id,
      status
    );
    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to update order status"
    });
  }
};
var cancelOrder = async (req, res) => {
  const customerUserId = req.user?.id;
  const { id } = req.params;
  if (!customerUserId)
    return res.status(401).json({ success: false, message: "Unauthorized" });
  try {
    const result = await orderService.cancelOrderByCustomer(
      customerUserId,
      id
    );
    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to cancel order"
    });
  }
};
var orderController = {
  orderCreate,
  getUsersOrders: getUsersOrders2,
  getProviderOrders: getProviderOrders2,
  getAllOrders: getAllOrders2,
  getOrderDetails: getOrderDetails2,
  updateOrderStatus,
  cancelOrder
};

// src/modules/order/order.route.ts
var router5 = Router5();
router5.get("/", auth_default(Role.CUSTOMER), orderController.getUsersOrders);
router5.post("/", auth_default(Role.CUSTOMER), orderController.orderCreate);
router5.patch("/:id/cancel", auth_default(Role.CUSTOMER), orderController.cancelOrder);
router5.get("/provider", auth_default(Role.PROVIDER), orderController.getProviderOrders);
router5.patch("/:id", auth_default(Role.PROVIDER), orderController.updateOrderStatus);
router5.get("/all", auth_default(Role.ADMIN), orderController.getAllOrders);
router5.get("/:id", auth_default(Role.CUSTOMER, Role.PROVIDER, Role.ADMIN), orderController.getOrderDetails);
var orderRoute = router5;

// src/modules/review/review.routes.ts
import { Router as Router6 } from "express";

// src/modules/review/review.service.ts
var createReview = async (payload) => {
  const ordered = await prisma.orderItem.findFirst({
    where: {
      mealId: payload.mealId,
      order: {
        userId: payload.userId,
        status: "DELIVERED"
      }
    }
  });
  if (!ordered) {
    throw new Error("You can review only after the meal is delivered.");
  }
  const exists = await prisma.review.findUnique({
    where: {
      userId_mealId: {
        userId: payload.userId,
        mealId: payload.mealId
      }
    }
  });
  if (exists) {
    throw new Error("You already reviewed this meal.");
  }
  return prisma.review.create({
    data: {
      rating: payload.rating,
      comment: payload.comment,
      mealId: payload.mealId,
      userId: payload.userId
    }
  });
};
var ReviewService = { createReview };

// src/modules/review/review.controller.ts
var createReview2 = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId)
      return res.status(401).json({ success: false, message: "Unauthorized" });
    const { mealId, rating, comment } = req.body;
    if (!mealId || rating === void 0 || !comment) {
      return res.status(400).json({
        success: false,
        message: "mealId, rating, comment are required"
      });
    }
    const r = Number(rating);
    if (!Number.isFinite(r) || r < 1 || r > 5) {
      return res.status(400).json({ success: false, message: "rating must be between 1 and 5" });
    }
    const result = await ReviewService.createReview({
      mealId,
      rating: r,
      comment,
      userId
    });
    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Review creation failed"
    });
  }
};
var ReviewController = { createReview: createReview2 };

// src/modules/review/review.routes.ts
var router6 = Router6();
router6.post("/", auth_default(Role.CUSTOMER), ReviewController.createReview);
var ReviewRoutes = router6;

// src/app.ts
var app = express();
app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:5000",
    credentials: true
  })
);
app.use(express.json());
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use("/api/admin/users", userRouter);
app.use("/api/meals", mealsRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/orders", orderRoute);
app.use("/api/review", ReviewRoutes);
app.use("/api/providers", providerProfileRouter);
app.get("/", (req, res) => {
  res.send("FoodHub API Running!");
});
app.use(globalErrorHandler_default);
var app_default = app;

// src/index.ts
var index_default = app_default;
export {
  index_default as default
};
