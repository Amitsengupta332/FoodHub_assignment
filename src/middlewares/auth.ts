import type { NextFunction, Request, Response } from "express";
import { auth as better_auth } from "../lib/auth";
import { Role } from "../generated/prisma/enums";

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

      req.user = {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image as string,
        role: session.user.role,
      };

      if (roles.length && !roles.includes(session.user.role as Role)) {
        return res.status(403).json({
          success: false,
          message:
            "Forbidden! You don't have permission to access this resources!",
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}

export default auth;
