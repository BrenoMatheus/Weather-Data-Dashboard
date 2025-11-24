import { AuthForm } from "../components/AuthForm";
import { login } from "../api/authApi";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  async function handleLogin({ email, password }: any) {
    try {
      const res = await login(email, password);
      localStorage.setItem("token", res.access_token); // salva token
      navigate("/"); // redireciona
    } catch (err: any) {
      alert(err.message);
    }
  }

  return (
    <AuthForm
      title="Login"
      onSubmit={handleLogin}
      fields={[
        { name: "email", label: "Email", type: "email" },
        { name: "password", label: "Senha", type: "password" },
      ]}
    />
  );
}
