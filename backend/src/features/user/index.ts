import { FieldValue, getFirestore } from "firebase-admin/firestore";
import { PaymentRecord } from "../../../../types/payment";
import { STUser } from "../../../../types/user.types";

export const addRecordToUserPaymentHistory = async ({
  userId,
  record,
}: {
  userId: string;
  record: PaymentRecord;
}) => {
  const db = getFirestore();
  const userRef = db.collection("users").doc(userId);

  return userRef.update({
    paymentHistory: FieldValue.arrayUnion(record),
  });
};

export const decrementUserCredits = async ({ userId }: { userId: string }) => {
  if (!userId) throw new Error("User not found");

  const db = getFirestore();
  const userRef = db.collection("users").doc(userId);

  return userRef.update({
    credits: FieldValue.increment(-1),
  });
};

export const incrementUserCredits = async ({
  userId,
  quantity,
}: {
  userId: string;
  quantity: number;
}) => {
  if (!userId) throw new Error("User not found");

  const db = getFirestore();
  const userRef = db.collection("users").doc(userId);

  return userRef.update({
    credits: FieldValue.increment(quantity),
  });
};

export const getUserById = async ({
  userId,
  tokenUserId,
}: {
  userId: string;
  tokenUserId: string;
}) => {
  if (!userId) throw new Error("Missing userId");
  if (!tokenUserId) throw new Error("Missing tokenUserId");
  if (userId !== tokenUserId) throw new Error("Unauthorized");

  const db = getFirestore();
  const userRef = db.collection("users").doc(userId);

  const user = await userRef.get();

  return user.data() as STUser;
};

export const createUser = async ({ user }: { user: STUser }) => {
  if (!user.id) throw new Error("Missing user uid");
  if (!user.email) throw new Error("Missing user email");

  const db = getFirestore();
  const userRef = db.collection("users").doc(user.id);

  return userRef.set(user);
};
