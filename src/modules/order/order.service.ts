import { Order, OrderStatus } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

// // const createOrders = async (data: Order)  => {
// //   return await prisma.order.create({
// //     data,
// //   });
// // };

// const createOrders = async (userId: string, payload: any) => {
//   const mealIds = payload.items.map((i: any) => i.mealId);

//   const meals = await prisma.meal.findMany({
//     where: { id: { in: mealIds } },
//     select: { id: true, price: true, providerId: true },
//   });

//   const total = payload.items.reduce((sum: number, item: any) => {
//     const meal = meals.find(m => m.id === item.mealId);
//     return sum + (meal!.price * item.qty);
//   }, 0);

//   return prisma.order.create({
//     data: {
//       userId,
//       providerId: payload.providerId,
//       address: payload.address,
//       total,
//       items: {
//         create: payload.items.map((i: any) => {
//           const meal = meals.find(m => m.id === i.mealId)!;
//           return { mealId: i.mealId, qty: i.qty, price: meal.price };
//         }),
//       },
//     },
//     include: { items: true },
//   });
// };

// // (data: Order)
// const getUsersOrders = async (id: string) => {
//   return await prisma.order.findMany({
//     where: {
//       userId: id,
//     },
//   });
// };

// const getAllOrders = async () => {
//   return await prisma.order.findMany();
// };

// const getOrderDetails = async (id: string) => {
//   return await prisma.order.findUnique({
//     where: {
//       id,
//     },
//     include: {
//       provider: true,
//     },
//   });
// };

// const getOrderForProvider = async (id: string) => {
//   return await prisma.order.findMany({
//     where: {
//       providerId: id,
//     },
//   });
// };

// const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
//   return prisma.order.update({
//     where: { id: orderId },
//     data: { status },
//   });
// };


// export const orderService = {
//   createOrders,
//   getAllOrders,
//   getOrderForProvider,
//   getUsersOrders,
//   getOrderDetails,
//   updateOrderStatus
// };


type CreateOrderPayload = {
  address: string;
  items: { mealId: string; qty: number }[];
};

const createOrders = async (userId: string, payload: CreateOrderPayload) => {
  if (!payload.address) throw new Error("address is required");
  if (!Array.isArray(payload.items) || payload.items.length === 0) throw new Error("items are required");

  const mealIds = payload.items.map((i) => i.mealId);

  const meals = await prisma.meal.findMany({
    where: { id: { in: mealIds }, isAvailable: true },
    select: { id: true, price: true, providerId: true },
  });

  if (meals.length !== mealIds.length) {
    throw new Error("One or more meals are invalid/unavailable");
  }

  // ✅ One order must be from one provider
  const providerIdSet = new Set(meals.map((m) => m.providerId));
  if (providerIdSet.size !== 1) {
    throw new Error("You can order items from only one provider per order.");
  }
if (meals.length === 0) {
  throw new Error("No meals found");
}

const providerId = meals[0]!.providerId;

  // ✅ Calculate total from DB prices (no client trust)
  const total = payload.items.reduce((sum, item) => {
    const meal = meals.find((m) => m.id === item.mealId)!;
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
          const meal = meals.find((m) => m.id === i.mealId)!;
          return { mealId: i.mealId, qty: i.qty, price: meal.price };
        }),
      },
    },
    include: { items: true, provider: true },
  });
};

const getUsersOrders = async (userId: string) => {
  return prisma.order.findMany({
    where: { userId },
    include: { items: true, provider: true },
    orderBy: { createdAt: "desc" },
  });
};

const getAllOrders = async () => {
  return prisma.order.findMany({
    include: { items: true, provider: true, user: { select: { id: true, name: true, email: true } } },
    orderBy: { createdAt: "desc" },
  });
};

const getOrderDetails = async (orderId: string) => {
  return prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: { include: { meal: true } },
      provider: { include: { user: { select: { id: true, name: true } } } },
      user: { select: { id: true, name: true, email: true } },
    },
  });
};

const getProviderOrders = async (providerUserId: string) => {
  const profile = await prisma.providerProfile.findUnique({
    where: { userId: providerUserId },
  });
  if (!profile) throw new Error("Provider profile not found");

  return prisma.order.findMany({
    where: { providerId: profile.id },
    include: { items: true, user: { select: { id: true, name: true } } },
    orderBy: { createdAt: "desc" },
  });
};

const canTransition = (from: OrderStatus, to: OrderStatus) => {
  const allowed: Record<OrderStatus, OrderStatus[]> = {
    PLACED: ["PREPARING", "CANCELLED"],
    PREPARING: ["READY"],
    READY: ["DELIVERED"],
    DELIVERED: [],
    CANCELLED: [],
  };
  return allowed[from].includes(to);
};

const updateOrderStatusByProvider = async (
  providerUserId: string,
  orderId: string,
  nextStatus: OrderStatus,
) => {
  const profile = await prisma.providerProfile.findUnique({
    where: { userId: providerUserId },
  });
  if (!profile) throw new Error("Provider profile not found");

  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) throw new Error("Order not found");

  // ✅ ownership
  if (order.providerId !== profile.id) {
    throw new Error("You are not allowed to update this order");
  }

  // ✅ transition
  if (!canTransition(order.status, nextStatus)) {
    throw new Error(`Invalid status transition: ${order.status} -> ${nextStatus}`);
  }

  return prisma.order.update({
    where: { id: orderId },
    data: { status: nextStatus },
  });
};

const cancelOrderByCustomer = async (customerUserId: string, orderId: string) => {
  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) throw new Error("Order not found");

  if (order.userId !== customerUserId) throw new Error("Forbidden");
  if (order.status !== "PLACED") throw new Error("Only PLACED orders can be cancelled");

  return prisma.order.update({
    where: { id: orderId },
    data: { status: "CANCELLED" },
  });
};

export const orderService = {
  createOrders,
  getUsersOrders,
  getAllOrders,
  getOrderDetails,
  getProviderOrders,
  updateOrderStatusByProvider,
  cancelOrderByCustomer,
};