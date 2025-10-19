"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardDescription } from "../../components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "@/lib/firebase";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !firstName || !lastName || !confirmPassword) {
      toast.error("Please fill in all fields!");
      return;
    }

    if (password !== confirmPassword) {
      toast("password not match");
      return;
    }
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("signUp successfully");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 dark:bg-gray-900">
      <Card className="w-full max-w-md p-6 bg-white shadow-lg rounded-2xl dark:bg-gray-800">
        <CardHeader>
          <h2 className="mb-2 text-2xl font-semibold text-center text-gray-800 dark:text-gray-100">
            Create an Account
          </h2>
          <CardDescription>
            <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2.5 bg-transparent text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="first name"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="last_name"
                    className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2.5 bg-transparent text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="last name"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

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
                  value={email}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="repeat_password"
                  className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  id="repeat_password"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2.5 bg-transparent text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="••••••••"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-900 hover:bg-blue-700 text-white font-medium py-2.5 rounded-md transition-all"
              >
                {loading ? "SigningUp..." : "Sign Up"}
              </button>
            </form>
          </CardDescription>
        </CardHeader>

        <div className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-blue-900 hover:text-blue-800"
          >
            Log In
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default SignUpPage;
