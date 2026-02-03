// // import { OrderStatus, Prisma } from "../../generated/prisma/client";
// // import { prisma } from "../../lib/prisma";
 

// // const createMeal = async (data: Prisma.MealCreateInput) => {
// //   return await prisma.meal.create({
// //     data,
// //   });
// // };

// // const getAllMeals = async ({
// //   search,
// //   categoriesId,
// //   maxPrice,
// // }: {
// //   search: string | undefined;
// //   categoriesId: string | undefined;
// //   maxPrice: number | undefined;
// // }) => {
// //   const andCondition: Prisma.MealWhereInput[] = [];

// //   // default only available meals
// //   andCondition.push({
// //     isAvailable: true,
// //   });

// //   if (search) {
// //     andCondition.push({
// //       OR: [
// //         {
// //           name: {
// //             contains: search,
// //             mode: "insensitive",
// //           },
// //         },
// //         {
// //           description: {
// //             contains: search,
// //             mode: "insensitive",
// //           },
// //         },
// //       ],
// //     });
// //   }

// //   if (categoriesId) {
// //     andCondition.push({
// //       categoryId: categoriesId,
// //     });
// //   }

// //   if (typeof maxPrice === "number") {
// //     andCondition.push({
// //       price: {
// //         lte: maxPrice,
// //       },
// //     });
// //   }

// //   const result = await prisma.meal.findMany({
// //     where: {
// //       AND: andCondition,
// //     },
// //     include: {
// //       provider: true, // ✅ FIXED
// //       category: true, // optional but useful
// //     },
// //     orderBy: {
// //       createdAt: "desc",
// //     },
// //   });

// //   return result;
// // };

// // const updatedMeal = async (
// //   data: Prisma.MealUpdateInput,
// //   mealId: string,
// // ) => {
// //   return await prisma.meal.update({
// //     where: {
// //       id: mealId,
// //     },
// //     data,
// //   });
// // };

// // // ❌ mealsService এ order status রাখো না
// // // এটা orderService/providerOrderService এ রাখবে
// // const updateMealOrderStatus = async (id: string, status: OrderStatus) => {
// //   return await prisma.order.update({
// //     where: {
// //       id,
// //     },
// //     data: {
// //       status,
// //     },
// //   });
// // };

// // const getMealDetails = async (mealId: string) => {
// //   return await prisma.meal.findUnique({
// //     where: {
// //       id: mealId,
// //     },
// //     include: {
// //       provider: true, // ✅ FIXED
// //       category: true,
// //       reviews: {
// //         include: {
// //           user: { select: { id: true, name: true } },
// //         },
// //       },
// //     },
// //   });
// // };

// // const deleteMeal = async (mealId: string) => {
// //   return await prisma.meal.delete({
// //     where: {
// //       id: mealId,
// //     },
// //   });
// // };

// // export const mealsService = {
// //   createMeal,
// //   updatedMeal,
// //   updateMealOrderStatus, // ❌ move to order service
// //   deleteMeal,
// //   getMealDetails,
// //   getAllMeals,
// // };




// import { Prisma } from "../../generated/prisma/client";
import { Prisma } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

// /**
//  * CREATE MEAL
//  */
// const createMeal = async (providerUserId: string, data: any) => {
//   const providerProfile = await prisma.providerProfile.findUnique({
//     where: { userId: providerUserId },
//   });

//   if (!providerProfile) {
//     throw new Error("Provider profile not found. Create profile first.");
//   }

//   return prisma.meal.create({
//     data: {
//       ...data,
//       providerId: providerProfile.id, // ✅ correct providerId
//     },
//   });
// };

// /**
//  * GET PROVIDER MEALS
//  */
// const getProviderMeals = async (providerId: string) => {
//   return await prisma.meal.findMany({
//     where: {
//       providerId,
//     },
//   });
// };

// const getAllMeals = async ({
//   search,
//   categoriesId,
//   maxPrice,
// }: {
//   search?: string;
//   categoriesId?: string;
//   maxPrice?: number;
// }) => {
//   const andCondition: Prisma.MealWhereInput[] = [];

//   // Only available meals for public browsing
//   andCondition.push({ isAvailable: true });

//   if (search) {
//     andCondition.push({
//       OR: [
//         {
//           name: {
//             contains: search,
//             mode: "insensitive",
//           },
//         },
//         {
//           description: {
//             contains: search,
//             mode: "insensitive",
//           },
//         },
//       ],
//     });
//   }

//   if (categoriesId) {
//     andCondition.push({
//       categoryId: categoriesId,
//     });
//   }

//   if (typeof maxPrice === "number") {
//     andCondition.push({
//       price: {
//         lte: maxPrice,
//       },
//     });
//   }

//   const result = await prisma.meal.findMany({
//     where: {
//       AND: andCondition,
//     },
//     include: {
//       provider: true,
//       category: true,
//     },
//     orderBy: {
//       createdAt: "desc",
//     },
//   });

//   return result;
// };

// const getMealDetails = async (mealId: string) => {
//   return prisma.meal.findUnique({
//     where: { id: mealId },
//     include: {
//       provider: true,
//       category: true,
//       reviews: {
//         include: {
//           user: {
//             select: { id: true, name: true },
//           },
//         },
//         orderBy: { createdAt: "desc" },
//       },
//     },
//   });
// };

// /**
//  * UPDATE MEAL (only own)
//  */
// // const updateMeal = async (
// //   providerId: string,
// //   mealId: string,
// //   data: any
// // ) => {
// //   return await prisma.meal.updateMany({
// //     where: {
// //       id: mealId,
// //       providerId,
// //     },
// //     data,
// //   });
// // };


// const updateMeal = async (providerUserId: string, mealId: string, data: any) => {
//   const providerProfile = await prisma.providerProfile.findUnique({
//     where: { userId: providerUserId },
//   });

//   if (!providerProfile) throw new Error("Provider profile not found");

//   const result = await prisma.meal.updateMany({
//     where: {
//       id: mealId,
//       providerId: providerProfile.id, // ✅ correct
//     },
//     data,
//   });

//   if (result.count === 0) {
//     throw new Error("Meal not found or you are not allowed to update it");
//   }

//   return prisma.meal.findUnique({ where: { id: mealId } }); // return updated object
// };

// /**
//  * DELETE MEAL (only own)
//  */
// const deleteMeal = async (mealId: string) => {
//   return prisma.meal.delete({
//     where: { id: mealId },
//   });
// };

// export const mealsService = {
//   createMeal,
//   getProviderMeals,
//   getAllMeals,
//   getMealDetails,
//   updateMeal,
//   deleteMeal,
// };


/**
 * CREATE MEAL (provider only)
 */
const createMeal = async (providerUserId: string, data: any) => {
  const providerProfile = await prisma.providerProfile.findUnique({
    where: { userId: providerUserId },
  });

  if (!providerProfile) {
    throw new Error("Provider profile not found. Create profile first.");
  }

  return prisma.meal.create({
    data: {
      ...data,
      providerId: providerProfile.id,
    },
  });
};

/**
 * ✅ GET PROVIDER MEALS (fix: userId -> providerProfile.id)
 */
const getProviderMeals = async (providerUserId: string) => {
  const providerProfile = await prisma.providerProfile.findUnique({
    where: { userId: providerUserId },
  });

  if (!providerProfile) {
    throw new Error("Provider profile not found.");
  }

  return prisma.meal.findMany({
    where: { providerId: providerProfile.id },
    orderBy: { createdAt: "desc" },
  });
};

/**
 * Public meals (filters)
 */
const getAllMeals = async ({
  search,
  categoriesId,
  maxPrice,
}: {
  search?: string;
  categoriesId?: string;
  maxPrice?: number;
}) => {
  const andCondition: Prisma.MealWhereInput[] = [];
  andCondition.push({ isAvailable: true });

  if (search) {
    andCondition.push({
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ],
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
    orderBy: { createdAt: "desc" },
  });
};

const getMealDetails = async (mealId: string) => {
  return prisma.meal.findUnique({
    where: { id: mealId },
    include: {
      provider: true,
      category: true,
      reviews: {
        include: { user: { select: { id: true, name: true } } },
        orderBy: { createdAt: "desc" },
      },
    },
  });
};

/**
 * UPDATE MEAL (only own)
 */
const updateMeal = async (providerUserId: string, mealId: string, data: any) => {
  const providerProfile = await prisma.providerProfile.findUnique({
    where: { userId: providerUserId },
  });

  if (!providerProfile) throw new Error("Provider profile not found");

  const result = await prisma.meal.updateMany({
    where: { id: mealId, providerId: providerProfile.id },
    data,
  });

  if (result.count === 0) {
    throw new Error("Meal not found or you are not allowed to update it");
  }

  return prisma.meal.findUnique({ where: { id: mealId } });
};

/**
 * ✅ DELETE MEAL (only own) - FIXED
 */
const deleteMeal = async (providerUserId: string, mealId: string) => {
  const providerProfile = await prisma.providerProfile.findUnique({
    where: { userId: providerUserId },
  });

  if (!providerProfile) throw new Error("Provider profile not found");

  const result = await prisma.meal.deleteMany({
    where: { id: mealId, providerId: providerProfile.id },
  });

  if (result.count === 0) {
    throw new Error("Meal not found or you are not allowed to delete it");
  }

  return { deleted: true };
};

export const mealsService = {
  createMeal,
  getProviderMeals,
  getAllMeals,
  getMealDetails,
  updateMeal,
  deleteMeal,
};