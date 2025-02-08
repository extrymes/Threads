"use client";

import Button from "@/components/Button/Button";
import { checkEmail } from "@/utils/check-email";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Signin() {
  // Variables
  const router = useRouter();

  // Functions
  const prepareLogin = async (formData: FormData) => {
    const email = formData.get("email");
    const password = formData.get("password");
    // Check required fields
    if (!email || !password) {
      toast.error("Please complete required fields!");
      return;
    }
    // Check is email is valid
    if (!checkEmail(email.toString())) {
      toast.error("Please enter a valid email!");
      return;
    }
    // Try to sign in user
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.error) {
      toast.error(res.error);
      return;
    }
    toast.success("You are logged in!");
    router.replace("/");
  };

  // Render
  return (
    <div className="w-[440px] mx-auto pt-[19vw]">
      {/* Title */}
      <h1 className="title flex items-center gap-1">
        <button onClick={() => router.back()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 256 256"
          >
            <path
              fill="currentColor"
              d="M224 128a8 8 0 0 1-8 8H59.31l58.35 58.34a8 8 0 0 1-11.32 11.32l-72-72a8 8 0 0 1 0-11.32l72-72a8 8 0 0 1 11.32 11.32L59.31 120H216a8 8 0 0 1 8 8"
            ></path>
          </svg>
        </button>
        Sign in
      </h1>

      {/* Form */}
      <form action={prepareLogin}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input"
          required
        />
        <Button formButton>Sign in</Button>
      </form>

      {/* Separator */}
      <div className="flex justify-center items-center mt-4">
        <div className="border-t border-threads-gray-light w-1/4"></div>
        <div className="text-threads-gray-light mx-4">or</div>
        <div className="border-t border-threads-gray-light w-1/4"></div>
      </div>

      {/* Sign up */}
      <div className="flex justify-center mt-3 gap-2 text-threads-gray-light">
        <p>Don't have an account?</p>
        <Link href="/login/signup" className="underline hover:opacity-80">
          Create account
        </Link>
      </div>
    </div>
  );
}
