import { AuthForm } from "../components/AuthForm";
import { registerUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();

  async function handleRegister({ name, email, password }: any) {
    try {
      await registerUser(name, email, password);
      navigate("/login");
    } catch (err: any) {
      alert(err.message);
    }
  }

  return (
    <AuthForm
      title="Criar Conta"
      onSubmit={handleRegister}
      fields={[
        { name: "name", label: "Nome", type: "text" },
        { name: "email", label: "Email", type: "email" },
        { name: "password", label: "Senha", type: "password" },
      ]}
    />
  );
}
