import { useEffect, useState } from "react";
import { currentUser } from "../utils/user";
import { useRouter } from "next/router";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const u = currentUser();
    if (!u) router.push("/login");
    else setUser(u);
  }, [router]);

  return user;
}
