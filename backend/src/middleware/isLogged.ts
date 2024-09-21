import { NextFunction, Request, Response } from "express";
import { getAppCheck } from "firebase-admin/app-check";
import { getAuth } from "firebase-admin/auth";

export const isLogged = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const appCheckToken = req.header("X-Firebase-AppCheck");
  const bearerToken = req.header("Authorization");

  if (!appCheckToken || !bearerToken) {
    res.status(401);
    res.send({ message: "Unauthorized: no token" });
    return;
  }

  try {
    await getAppCheck().verifyToken(appCheckToken);
    await getAuth().verifyIdToken(bearerToken.split("Bearer ")[1]);
    return next();
  } catch (err) {
    res.status(401);
    res.send({ message: "Unauthorized: invalid token" });
    return;
  }
};
