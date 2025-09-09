"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";

type FormData = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function graphqlRequest(query: string, variables: any) {
    const res = await fetch("/api/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
  });

  return res.json();
}

  const REGISTER_MUTATION = `
  mutation Register($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      message
    }
  }
`;

const onSubmit = async (data: FormData) => {
  setLoading(true);
  setMessage("");

  try {
    const result = await graphqlRequest(REGISTER_MUTATION, data);

    if (result.data?.register?.message) {
      setMessage("✅ " + result.data.register.message);
    } else {
      setMessage("❌ Error: " + (result.errors?.[0]?.message || "Something went wrong"));
    }
  } catch (error) {
    setMessage("❌ Failed to connect to server");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-xl rounded-xl p-6 w-96 space-y-4"
      >
        <h1 className="text-2xl font-bold text-gray-800">Register</h1>

        {/* Full Name */}
        <input
          type="text"
          placeholder="Full Name"
          {...register("name", { required: "Name is required" })}
          className="w-full p-2 border rounded-md"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
          })}
          className="w-full p-2 border rounded-md"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Password must be at least 6 characters" },
          })}
          className="w-full p-2 border rounded-md"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {message && (
          <p className="text-sm text-center mt-2">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
