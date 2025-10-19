"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardDescription } from "../../components/ui/card";
import Link from "next/link";
import auth from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
    toast.error("Please fill in all fields!");
    return;
  }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully!");
      router.push("/dashboard");
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        toast.error("This email is not registered. Please sign up first.");
      } else if (error.code === "auth/wrong-password") {
        toast.error("Incorrect password. Try again.");
      } else {
        toast.error(error.message);
      }
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 dark:bg-gray-900">
      <Card className="w-full max-w-md p-6 bg-white shadow-lg rounded-2xl dark:bg-gray-800">
        <CardHeader>
          <h2 className="mb-2 text-2xl font-semibold text-center text-gray-800 dark:text-gray-100">
            LogIn
          </h2>
          <CardDescription>
            <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2.5 bg-transparent text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="your mail@example.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2.5 bg-transparent text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="••••••••"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-900 hover:bg-blue-700 text-white font-medium py-2.5 rounded-md transition-all"
              >
                LogIn
              </button>
            </form>
            
          </CardDescription>
        </CardHeader>

        <div className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
          Dont have account?{" "}
          <Link
            href="/signup"
            className="font-medium text-blue-600 hover:text-blue-800"
          >
            SignUp
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
