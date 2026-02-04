import type { NextFunction, Request, Response } from "express";
import { auth as better_auth } from "../lib/auth";
// import { Role } from "../generated/prisma/enums";

import { Role } from "../generated/prisma/enums";
import { prisma } from "../lib/prisma";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        name: string;
        email: string;
        image: string;
        role: string;
      };
    }
  }
}

function auth(...roles: Role[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = await better_auth.api.getSession({
        headers: req.headers as any,
      });

      if (!session) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized!",
        });
      }

      // ✅ Enforce isActive (suspended users blocked)
      const dbUser = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          role: true,
          isActive: true,
        },
      });

      if (!dbUser) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid session user!" });
      }

      if (!dbUser.isActive) {
        return res.status(403).json({
          success: false,
          message: "Account suspended. Please contact support.",
        });
      }

      req.user = {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        image: (dbUser.image || "") as string,
        role: dbUser.role,
      };

      if (roles.length && !roles.includes(dbUser.role as Role)) {
        return res.status(403).json({
          success: false,
          message:
            "Forbidden! You don't have permission to access this resource!",
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}

export default auth;
