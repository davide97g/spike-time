import { FieldValue, getFirestore } from "firebase-admin/firestore";
import { PaymentRecord } from "../../../../types/payment";

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
