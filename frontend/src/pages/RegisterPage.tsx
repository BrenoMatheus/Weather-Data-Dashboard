import { AuthForm } from "../components/AuthForm";
import { registerUser } from "../api/authApi";
import { Link, useNavigate } from "react-router-dom";

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
    <div>
      <AuthForm
        title="Criar Conta"
        onSubmit={handleRegister}
        fields={[
          { name: "name", label: "Nome", type: "text" },
          { name: "email", label: "Email", type: "email" },
          { name: "password", label: "Senha", type: "password" },
        ]}
      />
      <span className="flex justify-center p-2">Já tem conta?
        <Link className="pl-2 font-bold text-slate-700" to="/login">
          Entrar conta
        </Link>
      </span>
    </div>
  );
}
