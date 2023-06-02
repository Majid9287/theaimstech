import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function signup() {
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setemailError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    if (confirmPassword !== password) {
      toast.error("Passwords do not match!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false);
      return;
    }

    // Check if email is already registered
    fetch(`/api/user/emailcheck?email=${email}`)
      .then((response) => {
        if (!response.ok) {
          toast.error("Error occurred while checking email!", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setLoading(false);
        }

        return response.json();
      })
      .then((data) => {
        if (data.exists) {
          toast.error("Email is already registered!", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setLoading(false);
          setemailError("Email is already registered");
        } else {
          const formData = {
            name,
            email,
            phone,
            address,
            password,
          };
          fetch("/api/user/signup", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => {
              if (!response.ok) {
                toast.error("Error occurred while submitting the form!", {
                  position: "top-right",
                  autoClose: 1000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
                setLoading(false);
              }
              toast.success("Account created successfully", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              setLoading(false);
              router.push("/signin");
            })
            .catch((error) => {
              toast.error("Error occurred while submitting the form!", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              setLoading(false);
            });
        }
      })
      .catch((error) => {
        toast.error("Error occurred while submitting the form!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setLoading(false);
      });
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);

    if (event.target.value !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };
  return (
    <div>
      <div className="bg-gray-100 relative min-h-screen flex flex-col pt-20">
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
        {/* Same as */}
        <ToastContainer />
        <div className="container pb-4 max-w-sm mx-auto flex-1 flex flex-col items-center justify-center  px-2">
          <form onSubmit={handleSubmit}>
            <div className="bg-white relative px-6 py-8 rounded shadow-md text-black w-full">
              <h1 className=" text-3xl text-center font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                Sign up
              </h1>
              <div className="text-grey-dark text-center mb-4">
                Already have an account?
                <Link
                  href="/signin"
                  className="relative text-indigo-600 no-underline border-b border-blue text-blue"
                >
                  Log in
                </Link>
                .
              </div>
              <input
                type="text"
                className="relative block border border-grey-light w-full p-3 rounded mb-4"
                name="name"
                required
                placeholder="Full Name"
                value={name}
                onChange={(e) => setname(e.target.value)}
              />

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

              <input
                type="tel"
                className="relative block border border-grey-light w-full p-3 rounded mb-4"
                name="name"
                required
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => {
                  const re = /^[0-9\b]+$/; // regex pattern to match only numbers and backspace
                  if (e.target.value === "" || re.test(e.target.value)) {
                    setphone(e.target.value);
                  }
                }}
              />
              <input
                type="text"
                className="relative block border border-grey-light w-full p-3 rounded mb-4"
                name="name"
                required
                placeholder="Complete Address"
                value={address}
                onChange={(e) => setaddress(e.target.value)}
              />
              <input
                type="password"
                className="relative block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  const passwordPattern =
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
                  if (!passwordPattern.test(e.target.value)) {
                    setpasswordError(
                      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number."
                    );
                  } else {
                    setpasswordError("");
                  }
                }}
              />
              {passwordError && (
                <div className="text-red-500">{passwordError}</div>
              )}
              <input
                type="password"
                className="relative block border border-grey-light w-full p-3 rounded mb-4"
                name="confirm_password"
                required
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              {confirmPasswordError && (
                <div className="text-red-500">{confirmPasswordError}</div>
              )}

<button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-blue-900 py-2 px-3 text-sm font-semibold text-white hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
                {loading ? "Loading..." : "Create Account"}
              </button>
              <div className="text-center text-sm text-grey-dark mt-4">
                By signing up, you agree to the
                <a
                  className="no-underline border-b border-grey-dark text-grey-dark"
                  href="#"
                >
                  Terms of Service
                </a>{" "}
                and
                <a
                  className="no-underline border-b border-grey-dark text-grey-dark"
                  href="#"
                >
                  Privacy Policy
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default signup;
