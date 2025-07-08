import { auth } from "@/firebaseConfig";
import { Stack, router } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      // console.log(user?.email);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace("/screens/home");
      } else {
        router.replace("/");
      }
    }
  }, [loading, user]);

  if (loading) return null; // Or show a loading spinner

  return <Stack screenOptions={{ headerShown: false }} />;
}
