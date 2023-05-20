
import Link from 'next/link'
import React, { useState } from "react";
function forgot() {
  const [email, setEmail] = useState("");
  const [emailError, setemailError] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
   

    // Check if email is already registered
    fetch(`/api/user/emailcheck?email=${email}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error occurred while checking email");
        }
        return response.json();
      })
      .then((data) => {
        if (data.exists) {
          setemailError("OTP Send On Email");
        } 
        else{
          setemailError("Email is not registered");
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
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
            Enter the email address associated with your account and we’ll send you a link to reset your password.
                
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
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                   </span>
                Continue
              </button>
            </div>
          </form>
        
        </div>
      </div>
    </div>
  )
}

export default forgot