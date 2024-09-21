import { getFirestore } from "firebase-admin/firestore";

export const incrementCredits = async ({ userId }: { userId: string }) => {
  const db = getFirestore();

  try {
    if (!userId) return;

    const ref = db.collection("users").doc(userId);
    const userDoc = await ref.get();
    const userCredits = userDoc.data()?.credits || 0;
    await ref.set(
      {
        credits: userCredits + 1,
      },
      {
        merge: true,
      }
    );
  } catch (e) {
    console.error(e);
    // TODO: handle error
  }
};

export const decrementCredit = async ({ userId }: { userId: string }) => {
  const db = getFirestore();

  try {
    if (!userId) return;

    const ref = db.collection("users").doc(userId);
    const userDoc = await ref.get();
    const userCredits = userDoc.data()?.credits || 0;
    await ref.set(
      {
        credits: userCredits - 1,
      },
      {
        merge: true,
      }
    );
  } catch (e) {
    console.error(e);
  }
};
