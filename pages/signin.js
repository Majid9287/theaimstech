import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function Signin({ LoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      email,
      password,
    };

    try {
      const response = await fetch("/api/user/signin", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error("Please enter valide crdientials");
      }

      const { token } = await response.json();
      localStorage.setItem("token", token);
      LoggedIn(true);
      alert("Signed in successfully");
      router.push("/");
    } catch (error) {
      console.error(error);
      setError("Please enter valide crdientials");
    }
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError(null);
  };
  const handlechange = (e) => {
    setPassword(e.target.value);
    setError(null);
  };
  return (
    <div>
      <div className="h-screen relative   bg-gray-100 flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
           
            <h2 className="font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in
            </h2>
            <div className="text-grey-dark text-center mb-4">
              New User?
              <Link
                href="/signup"
                className="relative text-indigo-600 no-underline border-b border-blue text-blue"
              >
                SignUp
              </Link>
            </div>
          </div>
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
              <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => handleEmailChange(event)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Email address"
                />
              </div>
              <div>
              <label htmlFor="confirm-password" className="block mb-1 mt-4 text-sm font-medium text-gray-900 dark:text-white">
                Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) =>  handlechange(event)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Password"
                />
              </div>
            </div>
            {error && (
              <div className="text-red-500 text-center mt-2">
                <p>{error}</p>
              </div>
            )}

            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  href="/forgot"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className=" relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
