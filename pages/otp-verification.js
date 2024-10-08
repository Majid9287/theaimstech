import Link from 'next/link';
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Forgot() {
 const router = useRouter()
 const { email } = router.query
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    
    if (!email) {
      router.push('/forgot');
    }
  }, [email,router]);
 
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    fetch('/api/user/otp-verify' , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email,otp }), // Pass email and otp in the request body
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            toast.error(data.error, {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          
          });
        }
       
        toast.success("OTP Verification Done", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
         
          router.push({
            pathname: '/password-reset',
            query: { email,otp  },
          });
          return response.json();
       
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          // The server responded with an error message
          error.response.json().then((data) => {
            
            toast.error(data.message, {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          });
        } 
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <div className="h-screen bg-gray-100 relative flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              OTP Verification
            </h2>
            <div className="text-grey-dark text-center mb-4">
              Or/
              <Link
                href="/forgot"
                className="relative text-indigo-600 no-underline border-b border-blue text-blue"
              >
                Back
              </Link>
            </div>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
            <div className="text-grey-dark text-center mb-4">
            Enter the OTP which sent on your email address. <br></br>
           <span className='text-red-500'>Note:</span>  If you do not receive the OTP email, please check your "spam" folder in you email account.
          </div>
              <div>
                <label htmlFor="otp-address" className="sr-only">
                  OTP 
                </label>

                <input
                  type="text"
                  className="relative block border border-grey-light w-full p-3 rounded mb-4"
                  name="otp"
                  required
                  placeholder="OTP"
                  value={otp}
                  onClick={() => setOtpError("")}
                  onChange={(e) => {
                    setOtp(e.target.value);
                    const otpPattern = /^\d{6}$/; // Update the pattern to accept only four digits
                    if (!otpPattern.test(e.target.value)) {
                      setOtpError("Please enter a valid 6-digit OTP.");
                    } else {
                      setOtpError("");
                    }
                  }}
                />
                {otpError && <div className="text-red-500">{otpError}</div>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-blue-900 py-2 px-3 text-sm font-semibold text-white hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={loading || otpError} // Disable the button when loading state is true
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
