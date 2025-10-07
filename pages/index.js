import { useRouter } from "next/router";
import { currentUser } from "../utils/user";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const user = currentUser();
    if (!user) router.push("/login");
    else router.push(`/vault/${user.email}`);
  }, [router]);

  return <p>Redirecting...</p>;
}
