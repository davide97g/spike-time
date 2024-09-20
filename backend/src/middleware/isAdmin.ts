import { NextFunction, Request, Response } from "express";
import { getAppCheck } from "firebase-admin/app-check";
import { getAuth } from "firebase-admin/auth";

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const appCheckToken = req.header("X-Firebase-AppCheck");
  const bearerToken = req.header("Authorization");

  if (!appCheckToken || !bearerToken) {
    res.status(401);
    return res.send({ message: "Unauthorized: no token" });
  }

  try {
    await getAppCheck().verifyToken(appCheckToken);
    const claims = await getAuth().verifyIdToken(
      bearerToken?.split("Bearer ")[1]
    );

    if (!claims.admin) {
      res.status(403);
      return res.send({ message: "Forbidden: user not admin" });
    }
    return next();
  } catch (err) {
    res.status(401);
    return res.send({ message: "Unauthorized: user not authorized" });
  }
};
