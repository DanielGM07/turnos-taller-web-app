const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export async function loginRequest(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    let error;
    try {
      error = await res.json();
    } catch {
      error = {};
    }
    throw new Error(error.message || "Error al iniciar sesión");
  }

  // Espera { id, role, first_name, last_name }
  return res.json();
}
