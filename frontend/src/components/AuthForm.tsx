import { useState } from "react";

export function AuthForm({ title, onSubmit, fields }: any) {
  const [form, setForm] = useState({});

  function handleChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((f: any) => (
          <div key={f.name}>
            <label className="block text-sm mb-1">{f.label}</label>
            <input
              type={f.type}
              name={f.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {title}
        </button>
        
      </form>
    </div>
  );
}
