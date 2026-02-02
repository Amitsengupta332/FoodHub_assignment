import { Order } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

// const createOrders = async (data: Order)  => {
//   return await prisma.order.create({
//     data,
//   });
// };

const createOrders = async (userId: string, payload: any) => {
  const mealIds = payload.items.map((i: any) => i.mealId);

  const meals = await prisma.meal.findMany({
    where: { id: { in: mealIds } },
    select: { id: true, price: true, providerId: true },
  });

  const total = payload.items.reduce((sum: number, item: any) => {
    const meal = meals.find(m => m.id === item.mealId);
    return sum + (meal!.price * item.qty);
  }, 0);

  return prisma.order.create({
    data: {
      userId,
      providerId: payload.providerId,
      address: payload.address,
      total,
      items: {
        create: payload.items.map((i: any) => {
          const meal = meals.find(m => m.id === i.mealId)!;
          return { mealId: i.mealId, qty: i.qty, price: meal.price };
        }),
      },
    },
    include: { items: true },
  });
};

// (data: Order)
const getUsersOrders = async (id: string) => {
  return await prisma.order.findMany({
    where: {
      userId: id,
    },
  });
};

const getAllOrders = async () => {
  return await prisma.order.findMany();
};

const getOrderDetails = async (id: string) => {
  return await prisma.order.findUnique({
    where: {
      id,
    },
    include: {
      provider: true,
    },
  });
};

const getOrderForProvider = async (id: string) => {
  return await prisma.order.findMany({
    where: {
      providerId: id,
    },
  });
};



export const orderService = {
  createOrders,
  getAllOrders,
  getOrderForProvider,
  getUsersOrders,
  getOrderDetails,
};