import { prisma } from "../../lib/prisma";

type CreateReviewPayload = {
  mealId: string;
  rating: number;
  comment: string;
  userId: string;
};

const createReview = async (payload: CreateReviewPayload) => {
  // 1) ensure user has a DELIVERED order containing this meal
  const ordered = await prisma.orderItem.findFirst({
    where: {
      mealId: payload.mealId,
      order: {
        userId: payload.userId,
        status: "DELIVERED",
      },
    },
  });

  if (!ordered) {
    throw new Error("You can review only after the meal is delivered.");
  }

  // 2) prevent duplicate review (if you have @@unique([userId, mealId]))
  // prisma will throw error automatically, but we can check:
  const exists = await prisma.review.findUnique({
    where: {
      userId_mealId: {
        userId: payload.userId,
        mealId: payload.mealId,
      },
    },
  });

  if (exists) {
    throw new Error("You already reviewed this meal.");
  }

  return prisma.review.create({
    data: {
      rating: payload.rating,
      comment: payload.comment,
      mealId: payload.mealId,
      userId: payload.userId,
    },
  });
};

export const ReviewService = { createReview };
