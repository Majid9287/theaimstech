import Link from 'next/link';
import React, { useState } from "react";

function Forgot() {
  const [email, setEmail] = useState("");
  const [emailError, setemailError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true); // Set loading state to true when the button is clicked

    fetch(`/api/user/emailcheck?email=${email}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error occurred while checking email");
        }
        return response.json();
      })
      .then((data) => {
        if (data.exists) {
          // Email exists, call OTP generation API
          fetch(`/api/user/otp-generate?email=${email}`, {
            method: "GET",
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Error occurred while generating OTP");
              }
              return response.json();
            })
            .then((data) => {
              // OTP generation successful
              console.log("OTP generated:", data);
              setemailError("OTP Send On Email");
            })
            .catch((error) => {
              console.log(error);
              alert(error.message);
            })
            .finally(() => {
              setLoading(false); // Set loading state to false when the API call is complete
            });
        } else {
          setemailError("Email is not registered");
          setLoading(false); // Set loading state to false when the API call is complete
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
        setLoading(false); // Set loading state to false when the API call is complete
      });
  };

  return (
    <div>
      <div className="h-screen bg-gray-100 relative flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Forgot your password?
            </h2>
            <div className="text-grey-dark text-center mb-4">
              Or/
              <Link
                href="/signin"
                className="relative text-indigo-600 no-underline border-b border-blue text-blue"
              >
                Login
              </Link>
            </div>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div className="text-grey-dark text-center mb-4">
                Enter the email address associated with your account and we’ll send you a OTP to reset your password.
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>

                <input
                  type="text"
                  className="relative block border border-grey-light w-full p-3 rounded mb-4"
                  name="email"
                  required
                  placeholder="Email"
                  value={email}
                  onClick={(e) => setemailError("")}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(e.target.value)) {
                      setemailError("Please enter a valid email address.");
      
                    } else {
                      setemailError("");
                    }
                  }}
                />
                {emailError && <div className="text-red-500">{emailError}</div>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-green-900 py-2 px-3 text-sm font-semibold text-white hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={loading} // Disable the button when loading state is true
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  {loading && (
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zm7-2.647l3 2.647C19.865 17.824 21 15.042 21 12h-4a7.96 7.96 0 01-2 5.291zM14 4.515V0h-4v4.515A8.003 8.003 0 0112 4c1.657 0 3 1.343 3 3h-2c0-.552-.448-1-1-1s-1 .448-1 1h-2c0-1.657 1.343-3 3-3a3.96 3.96 0 012.586 1H14z"
                      ></path>
                    </svg>
                  )}
                </span>
                {loading ? "Loading..." : "Continue"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Forgot;
