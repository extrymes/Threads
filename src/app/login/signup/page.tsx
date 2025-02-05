"use client";

import { createUser } from "@/actions/create-user";
import Button from "@/components/Button/Button";
import { checkEmail } from "@/utils/check-email";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Signup() {
  // Variables
  const router = useRouter();

  // Functions
  const prepareCreateUser = async (formData: FormData) => {
    const name = formData.get("name");
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    // Check required fields
    if (!name || !username || !email || !password) {
      toast.error("Please complete required fields!");
      return;
    }
    // Check if email is valid
    if (!checkEmail(email.toString())) {
      toast.error("Please enter a valid email!");
      return;
    }
    // Try to create user in database
    try {
      await createUser(name, username, email, password);
    } catch (e: any) {
      toast.error(e.message);
      return;
    }
    // Redirect user to sign in page
    toast.success("Your account has been created!");
    router.push("/login/signin");
  };

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
        Create account
      </h1>

      {/* Form */}
      <form action={prepareCreateUser}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="input"
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="input"
          required
        />
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
        <Button formButton>Create account</Button>
      </form>

      {/* Separator */}
      <div className="flex justify-center items-center mt-4">
        <div className="border-t border-threads-gray-light w-1/4"></div>
        <div className="text-threads-gray-light mx-4">or</div>
        <div className="border-t border-threads-gray-light w-1/4"></div>
      </div>

      {/* Sign in */}
      <div className="flex justify-center mt-3 gap-2 text-threads-gray-light">
        <p>Already an account?</p>
        <Link href="/login/signin" className="underline hover:opacity-80">
          Sign in
        </Link>
      </div>
    </div>
  );
}
