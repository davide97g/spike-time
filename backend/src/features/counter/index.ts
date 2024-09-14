import { getFirestore } from "firebase-admin/firestore";

export const incrementCredits = async ({
  user,
}: {
  user?: {
    uid: string;
    displayName: string;
    photoURL: string;
  };
}) => {
  const db = getFirestore();

  try {
    if (!user) return;

    const ref = db.collection("users").doc(user?.uid);
    const userDoc = await ref.get();
    const userCredits = userDoc.data()?.credits || 0;
    await ref.set({
      credits: userCredits + 1,
      displayName: user.displayName,
      photoURL: user.photoURL,
    });
  } catch (e) {
    console.error(e);
    // TODO: handle error
  }
};
