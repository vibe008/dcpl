import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import LoginForm from "../components/login/LoginForm";

export default  async function LoginPage() {
  const token = await cookies().get("admin_token")?.value;

  if (token) {
    let payload;

    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      payload = null;
    }

    if (payload?.role === "admin") {
      redirect("/admin/dashboard"); // ✅ now it WORKS
    }
  }

  return <LoginForm />;
}
