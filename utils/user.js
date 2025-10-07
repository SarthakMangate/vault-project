export async function signup(email, password) {
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Signup failed");
  return true;
}

export async function login(email, password) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Login failed");
  const data = await res.json();
  localStorage.setItem("sv_session", JSON.stringify({ email: data.email }));
  return data;
}

export function logout() {
  localStorage.removeItem("sv_session");
}

export function currentUser() {
  if (typeof window === "undefined") return null;
  const s = localStorage.getItem("sv_session");
  return s ? JSON.parse(s) : null;
}
