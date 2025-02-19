import Link from "next/link";

export default function Login() {
  return (
    <div>
      {/* Title */}
      <h1 className="title pt-[19vw]">How do you want to use Threads?</h1>

      <div className="mt-5 w-[500px] mx-auto flex flex-col gap-4">
        {/* Sign up and sign in */}
        <Link href="/login/signin">
          <div className="auth-method">
            <h2 className="font-bold">
              Sign in with an email address or create an account
            </h2>
            <div className="text-threads-gray-light mt-4">
              Sign in or create your Threads profile with an email address. This
              will allow you to post and interact on Threads.
            </div>
          </div>
        </Link>

        {/* Invited */}
        <Link href="/login/pass">
          <div className="auth-method">
            <h2 className="font-bold">Continue as guest</h2>
            <div className="text-threads-gray-light mt-4">
              You can navigate on Threads without profile, but you cannot post
              and interact with content.
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
