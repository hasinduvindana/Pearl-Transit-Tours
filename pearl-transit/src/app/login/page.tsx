"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    // Simulate login process
    setTimeout(() => {
      // Store admin credentials in localStorage
      localStorage.setItem("adminToken", "admin_token_" + Date.now());
      localStorage.setItem("adminName", email.split("@")[0]);
      
      // Navigate to admin dashboard
      router.push("/admin-dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#000814] via-[#001d3d] to-black relative px-4">

      {/* Background blur lights */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-72 h-72 bg-blue-900/20 blur-3xl rounded-full top-10 left-10" />
        <div className="absolute w-72 h-72 bg-cyan-700/20 blur-3xl rounded-full bottom-10 right-10" />
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-xl shadow-2xl"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/logo.png"
            alt="Pearl Transit Tours Logo"
            width={80}
            height={80}
            className="drop-shadow-lg"
          />

          <h1 className="text-white text-2xl font-bold mt-3 text-center drop-shadow-lg">
            Pearl Transit Tours & Travels
          </h1>

          <p className="text-gray-300 text-sm mt-1 text-center">
            Login to continue your adventure
          </p>
        </div>

        {/* FORM */}
        <form className="flex flex-col gap-4 mt-4" onSubmit={handleLogin}>
          <div>
            <label className="text-gray-200 text-sm">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 rounded-lg bg-white/20 text-white
              placeholder-gray-300 outline-none focus:ring-2 focus:ring-cyan-400 transition"
            />
          </div>

          <div>
            <label className="text-gray-200 text-sm">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 rounded-lg bg-white/20 text-white
              placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600
            text-white font-semibold shadow-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Forgot Section */}
          <div className="flex justify-between text-sm mt-2">
            <Link href="#" className="text-cyan-300 hover:underline">
              Forgot Password?
            </Link>
            <Link href="/register" className="text-cyan-300 hover:underline">
              Create Account
            </Link>
          </div>
        </form>

      </motion.div>
    </div>
  );
}
